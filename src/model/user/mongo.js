var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    user_id : Schema.Types.ObjectId,
    username : String,
    followers : [Schema.Types.ObjectId], 
    followed : [Schema.Types.ObjectId],
    password : String,
    profile_photo : String
}, {collection: 'users'});

userSchema.plugin(mongoosePaginate);

userSchema.plugin(mongoosePaginate);

var Users = mongoose.model('Users', userSchema);

module.exports = Users;