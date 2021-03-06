var mongoose = require('mongoose');
var schema = mongoose.Schema;

var CategorySchema = new schema({
    id: {type:Number, index:1, required:true, unique:true},
    name: {type:String, required:true, unique:true},
    image: String,
},  {collection: 'categories'});

var categories = mongoose.model('categories', CategorySchema);

module.exports = categories;

