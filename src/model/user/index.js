var Users = require('./mongo');

var pageSize = 5;

var users = {

    get: function (req, res) {
        // si viene con id se busca una y en caso contrario o buscamos usuario por username o 
        // hasta un maximo de cinco que coincidan
        if (req.params.id) {
            //  GET/users/{id}
            Users
                .findById(req.params.id)
                .select('username followers followed password profile_photo')
                .exec(querySuccess(req, res));
                
        } else if (req.query.username) {
            
            var _username = req.query.username;
            
            if (req.query.strict) {

                var _strict = req.query.strict;

                if (_strict === "s") {
                    //  GET/users?username=usuariofijo&strict=s  devuelve el usuario con ese nombre de usuario, que ha de ser unico
                    Users
                        .findOne({ username: _username })
                        .select('username followers followed password profile_photo')
                        .exec(querySuccess(req, res));
                        
                } else if (_strict === "n") {
                    //  GET/users?username=usuariovoluble&strict=n  devuelve cinco usuarios que empiezen por la cadena pasada
                    var page = 1;
                    Users
                        .paginate({ username: { $regex: "^" + _username } }, { select: 'username followers followed password profile_photo' }, { page: page, limit: pageSize }, querySuccess(req, res));
                } else {
                    res.sendStatus(400);
                }
            }
        } else {
            res.sendStatus(400);
        }
    },

    post: function (req, res) {
        // POST /users + body:{ user }

        var photoUpload = new Users(req.body);
        photoUpload.followers = [];
        photoUpload.followed = [];
        photoUpload.profile_photo = "";

        photoUpload.save(upSuccess(req, res));

        console.log(req.body);
    },

    patch: function (req, res) {
        // Pueden actualizarse la foto de perfil, los followers o los followed. En los
        // tres casos lo que se hace es una sustitucion entrando por body los campos necesarios.
        var selection = req.query.update;
        var id = req.params.id;

        if (selection && id) {

            if (selection === "photo") {
                // PATCH /users/{id}?update=photo + body:{ photo }
                Users
                    .update({ _id: id }, { $set: { profile_photo: req.body.photo } }, { multi: false }, upSuccess(req, res));
            } else if (selection === "followers") {
                // PATCH /users/{id}?update=followers + body:{ followers }
                Users
                    .update({ _id: id }, { $set: { followers: req.body.followers } }, { multi: false }, upSuccess(req, res));
            } else if (selection === "followed") {
                // PATCH /users/{id}?update=followed + body:{ followed }
                Users
                    .update({ _id: id }, { $set: { followed: req.body.followed } }, { multi: false }, upSuccess(req, res));
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
    }
};

function upSuccess(req, res) {
    return function (err) {
        if (!err) {
            res.sendStatus(201);
        } else {
            console.log(err);
            res.sendStatus(500);
        }
    }
};

module.exports = users;