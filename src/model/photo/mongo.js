var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var Schema = mongoose.Schema;
Schema.pligin(mongoosePaginate);

var photoSchema = new Schema({
    image : String,
    likes : Array [Schema.Types.ObjectId],
    comments : [{
        user : Schema.Types.ObjectId,
        comment : String
    }],
    title : String,
    publisher_id : Schema.Types.ObjectId
});

var Photos = mongoose.model('Photos', photoSchema);

module.exports = Photos;