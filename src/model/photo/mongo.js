var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var Schema = mongoose.Schema;

var photoSchema = new Schema({
    image : String,
    likes : [Schema.Types.ObjectId],
    comments : [{
        user_id : Schema.Types.ObjectId,
        comment : String
    }],
    title : String,
    user_id : Schema.Types.ObjectId
}, {collection: 'photos'});

photoSchema.plugin(mongoosePaginate);

photoSchema.plugin(mongoosePaginate);

var Photos = mongoose.model('Photos', photoSchema);

module.exports = Photos;