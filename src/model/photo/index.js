var Photos = require('./mongo');

var pageSize = 9;

var photo = {   
    get: function (req, res) {
        if (req.query.id) {
            Photos
                .where({ _id: req.query.id })
                .findOne()
                .select('image likes comments title publisher_id')
                .exec(querySuccess);
        } else {
             var page = req.query.page || 1;
             Photos
                .where({ _id: req.query.id })
                .find()
                .paginate(page, pageSize)
                .select('image likes comments title publisher_id')
                .exec(querySuccess);
        }

        function querySuccess(err, results) {
            if (!err) {
                res.json(results);
            } else {
                console.log(err);
                res.sendStatus(204);
            }
        }
    },

    post: function (req, res) {

        var photoUpload = new Photos(req.body);

        photoUpload.save(function (err) {
            if (err) {
                console.log(err);
                res.sendStatus(500);
            }
        });

        console.log(req.body);
        res.sendStatus(201);
    },

    patch: function (req, res) {

    }
}