var Photos = require('./mongo');

var pageSize = 9;

var photos = {

    get: function (req, res) {
        // si viene con id se busca una y en caso contrario devolvemos varias paginadas
        if (req.query.id) {
            //  GET/photos/{id}
            Photos
                .where({ _id: req.param.id })
                .findOne()
                .select('image likes comments title publisher_id')
                .exec(querySuccess);
        } else {
            //  GET/photos?page=1 se ha de ir incrementando la página en cliente de API
            var page = req.query.page || 1;
            Photos
                .find()
                .paginate(page, pageSize)
                .select('image likes comments title publisher_id')
                .exec(querySuccess);
        }
    },

    post: function (req, res) {
        // POST /photos + body:{ photo }

        var photoUpload = new Photos(req.body);

        photoUpload.save(upSuccess);

        console.log(req.body);
    },

    patch: function (req, res) {
        // Puede seleccionarse actualizar like o comentario. En el primer caso se han
        // de mandar todos puesto que la lógica de quitarlo o incluirlo lo dejamos en
        // el front. En el segundo caso basta con añadirlo. 
        var selection = req.query.update;
        var id = req.param.id;

        if (selection && id) {

            var photoUpdate = new Photos();

            if (selection === "comment") {
                // PATCH /photos/{id}?update=comment + body:{ comment }
                photoUpdate
                    .update({ _id: id }, { $add: { comments: req.body } }, { multi: false }, upSuccess);
            } else if (selection === "likes") {
                // PATCH /photos/{id}?update=likes + body:{ likes }
                photoUpdate
                    .update({ _id: id }, { $set: { likes: req.body } }, { multi: false }, upSuccess);
            } else {
                res.sendStatus(400);
            }
        } else {
            res.sendStatus(400);
        }

    }
};

function querySuccess(err, results) {
    if (!err) {
        this.res.json(results);
    } else {
        console.log(err);
        this.res.sendStatus(204);
    }
};

function upSuccess(err) {
    if (!err) {
        this.res.sendStatus(201);
    } else {
        console.log(err);
        this.res.sendStatus(500);
    }
};

module.exports = photos;