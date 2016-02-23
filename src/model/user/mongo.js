var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    _id : Schema.Types.ObjectId,
    username : String,
    followers : [Schema.Types.ObjectId], 
    followed : [Schema.Types.ObjectId],
    password : String,
    profile_photo : String
})

userSchema.plugin(mongoosePaginate);

var Users = mongoose.model('Users', userSchema);

module.exports = Users;