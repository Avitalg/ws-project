var mongoose = require('mongoose');
var Product = require('./product');
var Look=require('./look');
var Category=require('./category');
var User=require('./user');
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

exports.getLook = function(req,res){
	Look.find({},
	function(err,lookRes){
		console.log("docs: "+lookRes);
		res.json(lookRes);
		return;
	});
}

exports.getLookByCategory = function(req,res){
	category = req.params.category;
	Look.find({'look': category},
	function(err,lookSteps){
		console.log("docs: "+lookSteps);
		res.json(lookSteps);
		return;
	});
}


exports.getAllCategories = function(req,res){
	Category.find({},
	function(err,categoryRes){
		console.log("docs: "+categoryRes);
		res.json(categoryRes);
		return;
	});
}

exports.getUsers = function(req,res){
	User.find({},
	function(err,userRes){
		console.log("docs: "+userRes);
		res.json(userRes);
		return;
	});
}

exports.getWishList = function(req,res){
	username= req.params.username;
	User.findOne({"username":username},"wish_list", function(err,wishList){
		Product.find({"id":{$in:wishList.wish_list}},function(err,data){
			console.log("data:"+data);
			res.json(data);
			return;
		})
	});
}