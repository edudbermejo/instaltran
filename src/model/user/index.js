var Users = require('./mongo');

var pageSize = 5;

var users = {

    get: function (req, res) {
        // si viene con id se busca una y en caso contrario devolvemos varias paginadas
        if (req.query.id) {
            //  GET/users/{id}
            Users
                .where({ _id: req.param.id })
                .findOne()
                .select('username followers followed password profile_photo')
                .exec(querySuccess);
        } else {
            //  GET/users?username=asdf  devuelve cinco usuarios que empiezen por la cadena pasada
            if (req.query.username) {
                var page = 1;
                Users
                    .find({ _id: { $regex: "^" + req.query.username } })
                    .paginate(page, pageSize)
                    .select('username followers followed password profile_photo')
                    .exec(querySuccess);
            } else {
                res.sendStatus(400);
            }
        }
    },

    post: function (req, res) {
        // POST /users + body:{ user }

        var photoUpload = new Users(req.body);
        photoUpload._id = req.body.username;
        photoUpload.followers = [];
        photoUpload.followed = [];
        

        photoUpload.save(upSuccess);

        console.log(req.body);
    },

    patch: function (req, res) {
        // Pueden actualizarse la foto de perfil, los followers o los followed. En los
        // tres casos lo que se hace es una sustitucion entrando por body los campos necesarios.
        var selection = req.query.update;
        var id = req.param.id;

        if (selection && id) {

            var photoUpdate = new Users();

            if (selection === "photo") {
                // PATCH /users/{id}?update=photo + body:{ photo }
                photoUpdate
                    .update({ _id: id }, { set: { profile_photo: req.body } }, { multi: false }, upSuccess);
            } else if (selection === "followers") {
                // PATCH /users/{id}?update=followers + body:{ followers }
                photoUpdate
                    .update({ _id: id }, { $set: { followers: req.body } }, { multi: false }, upSuccess);
            } else if (selection === "followed") {
                // PATCH /users/{id}?update=followed + body:{ followed }
                photoUpdate
                    .update({ _id: id }, { $set: { followed: req.body } }, { multi: false }, upSuccess);
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

module.exports = users;