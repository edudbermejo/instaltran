var Photos = require('./mongo');

var pageSize = 9;

var photos = {

    get: function (req, res) {
        // si viene con id se busca una y en caso contrario devolvemos varias paginadas
        if (req.params.id) {
            //  GET/photos/{id}
            Photos
                .findById(req.params.id)
                .select('image likes comments title user_id user')
                .exec(querySuccess(req, res));
        } else {
            //  GET/photos?page=1 se ha de ir incrementando la página en cliente de API            
            if (req.body.followed) {
                var page = req.query.page || 1;
                Photos
                    .paginate({ user_id :{ $in : req.body.followed}}, { select: 'image likes comments title user_id  user', page: page, limit: pageSize }, querySuccess(req, res));
            } else {
                res.sendStatus(400);
            }
        }
    },

    post: function (req, res) {
        // POST /photos + body:{ photo }

        var photoUpload = new Photos(req.body);
        photoUpload.likes = [];
        photoUpload.comments = [];

        photoUpload.save(upSuccess(req, res));

        console.log(req.body);
    },

    patch: function (req, res) {
        // Puede seleccionarse actualizar like o comentario. En el primer caso se han
        // de mandar todos puesto que la lógica de quitarlo o incluirlo lo dejamos en
        // el front. En el segundo caso basta con añadirlo. 
        var selection = req.query.update;
        var id = req.params.id;

        if (selection && id) {

            if (selection === "comment") {
                // PATCH /photos/{id}?update=comment + body:{ comment }
                Photos
                    .update({ _id: id }, { $addToSet: { comments: req.body } }, { multi: false }, upSuccess(req, res));
            } else if (selection === "likes") {
                // PATCH /photos/{id}?update=likes + body:{ likes }
                Photos
                    .update({ _id: id }, { $set: { likes: req.body.likes } }, { multi: false }, upSuccess(req, res));
            } else {
                res.sendStatus(400);
            }
        } else {
            res.sendStatus(400);
        }

    }
};

function querySuccess(req, res) {

    return function (err, results) {
        if (!err) {
            console.log(results);
            res.json(results);
        } else {
            console.log(err);
            res.sendStatus(204);
        }
    };
};

function upSuccess(req, res) {

    return function (err, raw) {
        if (!err) {
            res.sendStatus(201);
        } else {
            console.log(err);
            res.sendStatus(500);
        }
    };
};

module.exports = photos;