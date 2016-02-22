var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var photos = require('./src/model/photo');
var users = require('./src/model/user');

var app = express();

app.use(bodyParser.json());

app.route('/photos/:id')
    .get(photos.get)
    .post(photos.post)
    .patch(photos.patch);
    
app.route('/users/:id')
    .get(users.get)
    .post(users.post)    
    .patch(users.patch);

mongoose.connect('mongodb://localhost/instalgram', function () {
    app.listen(2222, function () {
        console.log('Se ha levantado correctamente el servidor');
    })
});