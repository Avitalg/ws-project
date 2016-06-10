var mongoose = require('mongoose');
var Product = require('./product');
var Look=require('./look');
var Category=require('./category');
var User=require('./user');
var db = require('./database');

exports.getData = function(req,res){
	Product.find({},
	function(err,docs){
		if(err){
			res.status(500);
			res.json({"error":err});
		}else{
			res.status(200);
			res.json(docs);
		}
		return;
	});
}

exports.getProduct = function(req, res){
	id = req.params.id;
	if(!id){
		res.status(404);
		res.json({"error":"Category name wasn't entered"});
	}else{
		Product.findOne({'id':id}, function(err, data){
			if(err){
				res.status(500);
				res.json({"error":err});
			}else if(!data){
				res.status(404);
				res.json([{"error":"Category doesn't exist"}]);
			}else{
				res.status(200);
				res.json(data);
			}
		});
	}
		return;
}

exports.getCategoryProducts = function(req, res){
	category = req.params.category;
	if(!category){
		res.status(404);
		res.json({"error":"Category name wasn't entered"});
	}else{
		Product.findOne({'category':category}, function(err, data){
			if(err){
				res.status(500);
				res.json({"error":err});
			}else if(!data){
				res.status(404);
				res.json([{"error":"Category doesn't exist"}]);
			}else{
				res.status(200);
				res.json(data);
			}
		});
	}
		return;
};

exports.getLooks = function(req,res){
	Look.find({},
	function(err,lookRes){
		if(err){
			res.status(500);
			res.json({"error":err});
		}else{
			res.status(200);
			res.json(lookRes);
		}
		return;
	});
}

exports.getLookByCategory = function(req,res){
	category = req.params.category;
	Look.findOne({'look': category},
	function(err,lookSteps){
		if(err){
			res.status(500);
			res.json({"error":err});
		}else if(!lookSteps){
			res.status(404);
			res.json({"error":"Look doesn't exist."});
		}else{
			res.tatus(200);
			res.json(lookSteps);
		}
		return;
	});
}


exports.getAllCategories = function(req,res){
	Category.find({},
	function(err,categoryRes){
		if(err){
			res.status(500);
			res.json({"error":err});
		}else{	
			res.status(200);
			res.json(categoryRes);
		}
	});
	return;
}

exports.getUsers = function(req,res){
	User.find({},
	function(err,userRes){
		if(err){
			res.status(500);
			res.json({"error": "No result found."});
		}else{
			res.status(200);
			res.json(userRes);
		}
		return;
	});
}

exports.getWishList = function(req,res){
	username= req.params.username;
	if(!username){
		res.status(404);
		res.json({"error":"Username wasn't sopplyed"});
	}else{	
		User.findOne({"username":username},"wish_list", function(err,wishList){
			if(err){
				res.status(500);
				res.json({"error":err});
			}else if(!wishList){
				res.status(404);
				res.json({"error":"User doesn't exist"});
			}else{	
				Product.find({"id":{$in:wishList.wish_list}},function(err,data){
					if(err){
						res.status(500);
						res.json({"error": err});
					}else{
						res.status(200);
						res.json(data);
					}
					
				})
			}
		});
	}
	return;
}

exports.allRest = function(req,res){
	res.status(404);
		res.json({"error":"Entered wrong URL"});
}