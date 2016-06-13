var mongoose = require('mongoose');
var schema = mongoose.Schema;

var productSchema = new schema({
	id: {type:Number, index:1, required:true, unique:true},
	name: String,
	price: String,
    image:String,
	short_desc: String,
	description: String,
	category: String
},	{collection: 'products'});

var Product = mongoose.model('Product', productSchema);

module.exports = Product;
