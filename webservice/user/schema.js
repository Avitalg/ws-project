var mongoose = require('mongoose');
var schema = mongoose.Schema;

var userSchema = new schema({
    username: {type:String, index:1, required:true, unique:true},
    admin: Boolean,
    wish_list: [Number]
},  {collection: 'users'});

var User = mongoose.model('User', userSchema);

module.exports = User;

