var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var Schema = mongoose.Schema;

var photoSchema = new Schema({
    image : String,
    likes : [Schema.Types.ObjectId],
    comments : [{
        user : Schema.Types.ObjectId,
        comment : String
    }],
    title : String,
    publisher_id : Schema.Types.ObjectId
});

photoSchema.plugin(mongoosePaginate);

var Photos = mongoose.model('Photos', photoSchema);

module.exports = Photos;