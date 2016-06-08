var mongoose = require('mongoose');
var Product = require('./product');
var db = require('./database');

exports.getData = function(req,res){
	Product.find({},
	function(err,docs){
		console.log("docs: "+docs);
		res.json(docs);
		return;
	});
}

exports.getCategory = function(req, res){
	category = req.params.id;
	Product.find({'category':category}, function(err, data){
		res.json(data);
	});
};
