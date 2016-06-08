var mongoose = require('mongoose');
var schema = mongoose.Schema;

var CategorySchema = new schema({
    id: {type:Number, index:1, required:true, unique:true},
    name: String,
    image:String,
    image_hover:String,
},  {collection: 'categories'});

var categories = mongoose.model('categories', CategorySchema);

module.exports = categories;

