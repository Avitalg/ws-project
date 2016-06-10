var mongoose = require('mongoose');
var Product = require('./product');
var Look=require('./look');
var Category=require('./category');
var User=require('./user');
var db = require('./database');

exports.getProducts = function(req,res){
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


exports.addProduct = function(req,res){
	var _id = req.params.id,
		_name = req.params.name,
		_price = req.params.price,
		_short_desc = req.params.sdesc,
		_desc = req.params.desc,
		_category = req.params.category;

	if(!_id){
		res.status(500);
		res.json({"error":"No product Id found"});
	} else {
		var prod = new Product({
		  id: _id,
		  name: _name,
		  price: _price,
		  short_desc: _short_desc,
		  description: _desc,
		  category: _category
		});

		//if Id exist, won't save the product.
		Product.findOneAndUpdate({'id': _id}, prod, {upsert:true}, 
			function(err, doc){
   				if (err){
   					res.status(500);
   					res.json({ error: err });
   				}else{
   					console.log(prod);
   					res.status(200);
   					res.json({"success":"Product was saved"});
   				}
		});		
	}
	return;

}

exports.updateProduct = function(req,res){
	var _id = req.params.id,
		_name = req.params.name,
		_price = req.params.price,
		_short_desc = req.params.sdesc,
		_desc = req.params.desc,
		_category = req.params.category;

	if(!_id){
		res.status(500);
		res.json({"error":"No product Id found"});
	} else {
		Product.findOne({ id: _id }, function (err, prod){
			if(!prod){
				res.status(404);
				res.json({error: "Product with the Id "+_id+" isn't exist"});
			}else if(err){
				res.status(404);
				res.json({error:err});
			} else {
				prod.name = _name;
			  	prod.price = _price;
			  	prod.short_desc = _short_desc;
			  	prod.desc = _desc;
			  	prod.category = _category;
			  	prod.save();
			  	res.status(200);
			  	res.json({"success":"succeed update the product."});
			}
		});
	}
	return;

}

exports.getProduct = function(req, res){
	var id = req.params.id;
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
				res.json([{"error":"Product doesn't exist"}]);
			}else{
				res.status(200);
				res.json(data);
			}
		});
	}
		return;
}

exports.removeProduct = function(req,res){
	var id= req.params.id;
	if(!id){
		res.status(404);
		res.json({"error":"Product id wasn't supplied"});
	}else{	
		Product.remove({"id":id}, function(err,prod){
			if(err){
				res.status(500);
				res.json({"error":err});
			}else{	
				res.status(200);
				res.json({"success":"Product was deleted successfully"});
			}
		});
	}
	return;
}

exports.getCategoryProducts = function(req, res){
	var category = req.params.category;
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

exports.getLook = function(req, res){
	var look = req.params.look;
	if(!look){
		res.status(404);
		res.json({"error":"Look name wasn't entered"});
	}else{
		Look.findOne({'look':look}, function(err, look){
			if(err){
				res.status(500);
				res.json({"error":err});
			}else if(!look){
				res.status(404);
				res.json([{"error":"Look doesn't exist"}]);
			}else{
				res.status(200);
				res.json(look);
			}
		});
	}
	return;
}

exports.updateLook= function(req,res){
	var _look = req.params.look,
		_image = req.params.image;

	if(!_look){
		res.status(500);
		res.json({"error":"No look name was entered"});
	} else {
		Look.findOne({ "look": _look }, function (err, look){
			if(!look){
				res.status(404);
				res.json({error: "The look "+_look+" doesn't exist"});
			}else if(err){
				res.status(500);
				res.json({error:err});
			} else {
				look.look = _look;
			  	look.image = _image;
			  	look.save();
			  	res.status(200);
			  	res.json({"success":"succeed update look."});
			}
		});
	}
	return;
}

exports.removeLook = function(req,res){
	var look= req.params.look;
	if(!look){
		res.status(404);
		res.json({"error":"Look name wasn't supplied"});
	}else{	
		Look.remove({"look":look}, function(err,user){
			if(err){
				res.status(500);
				res.json({"error":err});
			}else{	
				res.status(200);
				res.json({"success":"Look was deleted successfully"});
			}
		});
	}
	return;
}
/*
 step: {
            "face_image": String,
            "description": String,
            "product_id": Number
        }
*/
exports.addLook = function(req,res){
	var _look = req.params.look,
		_image = req.params.image;

	if(!_look){
		res.status(500);
		res.json({"error":"No look name was entered"});
	} else {
		var look = new Look({
		  look: _look,
		  image: _image,
		  steps: []
		});

		//if look exist, won't save him.
		Look.findOneAndUpdate({'look': _look}, look, {upsert:true}, 
			function(err, doc){
   				if (err){
   					res.status(500);
   					res.json({ error: err });
   				}else{
   					res.status(200);
   					res.json({"success":"Look was saved"});
   				}
		});		
	}
	return;
}


exports.addStepToLook = function(req,res){
	var _look = req.params.look,
		_image = req.params.image,
		_desc = req.params.desc,
		_prod = req.params.prodId;

	if(!_look){
		res.status(500);
		res.json({"error":"No look name was entered"});
	} else {
		Look.findOne({ "look": _look }, function (err, look){
			if(!look){
				res.status(404);
				res.json({error: "The look "+_look+" doesn't exist"});
			}else if(err){
				res.status(500);
				res.json({error:err});
			} else {
				var newStep = {
							"face_image" : _image,
							"description" : _desc,
							"product_id" : _prod
				    	};
				look.steps.push(newStep);
			  	look.save();
			  	res.status(200);
			  	res.json({"success":"succeed add step to look."});
			}
		});
	}
	return;
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
			res.status(200);
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

/**
TODO check why cant find category
*/
exports.getCategory = function(req,res){
	var category= req.params.category;
	if(!category){
		res.status(404);
		res.json({"error":"category wasn't supplied"});
	}else{	
		Category.findOne({"category":category}, function(err,result){
			if(err){
				res.status(500);
				res.json({"error":err});
			}else if(!result){
				res.status(404);
				res.json({"error":"category doesn't exist"});
			}else{	
				res.status(200);
				res.json(result);
			}
		});
	}
	return;
}
/*
id: {type:Number, index:1, required:true, unique:true},
    name: String,
    image:String,
    image_hover:String,
*/

exports.removeCategory = function(req,res){
	id= req.params.id;
	if(!id){
		res.status(404);
		res.json({"error":"category wasn't supplied"});
	}else{	
		Category.remove({"id":id}, function(err,category){
			if(err){
				res.status(500);
				res.json({"error":err});
			}else{	
				res.status(200);
				res.json({"success":"Category was deleted successfully"});
			}
		});
	}
	return;
}

exports.addCategory = function(req,res){
	var _id = req.params.id,
		_name = req.params.name,
		_image = req.params.image,
		_himage = req.params.himage;

	if(!_id){
		res.status(500);
		res.json({"error":"No category id was entered"});
	} else {
		var category = new Category({
		  id: _id,
		  name: _name,
		  image: _image,
		  image_hover: _himage
		});

		//if User exist, won't save him.
		Category.findOneAndUpdate({'id': _id}, category, {upsert:true}, 
			function(err, doc){
   				if (err){
   					res.status(500);
   					res.json({ error: err });
   				}else{
   					res.status(200);
   					res.json({"success":"Category was saved"});
   				}
		});		
	}
	return;

}

exports.updateCategory = function(req,res){
	var _id = req.params.id,
		_name = req.params.name,
		_image = req.params.image,
		_himage = req.params.himage;

	if(!_id){
		res.status(500);
		res.json({"error":"No category id was entered"});
	} else {
		User.findOne({ "id": _id }, function (err, category){
			if(!category){
				res.status(404);
				res.json({error: "Category with the id "+_id+" does't exist"});
			}else if(err){
				res.status(500);
				res.json({error:err});
			} else {
				category.id = _id;
			  	category.name = _name;
			  	category.image = _image;
			  	category.image_hover = _himage;
			  	category.save();
			  	res.status(200);
			  	res.json({"success":"succeed update category."});
			}
		});
	}
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

exports.getUser = function(req,res){
	username= req.params.username;
	if(!username){
		res.status(404);
		res.json({"error":"Username wasn't supplied"});
	}else{	
		User.findOne({"username":username}, function(err,user){
			if(err){
				res.status(500);
				res.json({"error":err});
			}else if(!user){
				res.status(404);
				res.json({"error":"User doesn't exist"});
			}else{	
				res.status(200);
				res.json(user);
			}
		});
	}
	return;
}

exports.removeUser = function(req,res){
	username= req.params.username;
	if(!username){
		res.status(404);
		res.json({"error":"Username wasn't supplied"});
	}else{	
		User.remove({"username":username}, function(err,user){
			if(err){
				res.status(500);
				res.json({"error":err});
			}else{	
				res.status(200);
				res.json({"success":"User was deleted successfully"});
			}
		});
	}
	return;
}

exports.addUser = function(req,res){
	var _username = req.params.username,
		_picture = req.params.picture,
		_admin = req.params.admin;

	if(!_id){
		res.status(500);
		res.json({"error":"No username was entered"});
	} else {
		var user = new User({
		  username: _username,
		  picture: _picture,
		  admin: _admin,
		  wish_list: "[]"
		});

		//if User exist, won't save him.
		User.findOneAndUpdate({'username': _username}, user, {upsert:true}, 
			function(err, doc){
   				if (err){
   					res.status(500);
   					res.json({ error: err });
   				}else{
   					console.log(prod);
   					res.status(200);
   					res.json({"success":"User was saved"});
   				}
		});		
	}
	return;

}

exports.updateUser = function(req,res){
	var _username = req.params.username,
		_picture = req.params.picture,
		_admin = rew.params.admin;

	if(!_username){
		res.status(500);
		res.json({"error":"No username was entered"});
	} else {
		User.findOne({ "username": _username }, function (err, user){
			if(!user){
				res.status(404);
				res.json({error: "User with the username "+_username+" isn't exist"});
			}else if(err){
				res.status(500);
				res.json({error:err});
			} else {
				user.username = _username;
			  	user.picture = _picture;
			  	user.admin = _admin;
			  	user.save();
			  	res.status(200);
			  	res.json({"success":"succeed update user's details."});
			}
		});
	}
	return;

}

exports.getWishList = function(req,res){
	username= req.params.username;
	if(!username){
		res.status(404);
		res.json({"error":"Username wasn't supplied"});
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

exports.addToWishList= function(req, res){
	var _username = req.params.username;
	var _prodId = req.params.prodId;
	if(!_username){
		res.status(500);
		res.json({"error":"No usernme was entered"});
	} else {
		User.findOne({ "username": _username }, function (err, user){
			if(!user){
				res.status(404);
				res.json({error: "User with the username "+_username+" doesn't exist"});
			}else if(err){
				res.status(500);
				res.json({error:err});
			} else {
				//will save only if number doesn't exist already in the wish list
				if(user.wish_list.indexOf(_prodId)==-1){
					user.wish_list.push(_prodId);
				  	user.save();
				  	res.status(200);
			  	res.json({"success":"succeed add to wish list."});
				} else {
					res.status(404);
					res.json({"error":"Product doesn't exist in user's wish list"});
				}  
			}
		});
	}
	return;
}

exports.removeFromWishList= function(req, res){
	var _username = req.params.username;
	var _prodId = req.params.prodId;
	if(!_username){
		res.status(500);
		res.json({"error":"No usernme was entered"});
	} else {
		User.findOne({ "username": _username }, function (err, user){
			if(!user){
				res.status(404);
				res.json({error: "User with the username "+_username+" doesn't exist"});
			}else if(err){
				res.status(500);
				res.json({error:err});
			} else {
				//check if product exist in the list and then delete it.
				if(user.wish_list.indexOf(_prodId)!=-1){
					user.wish_list.splice(_prodId, 1);
			  		user.save();
			  		res.status(200);
			  		res.json({"success":"succeed update user's details."});
				} else {
					res.status(404);
					res.json({"error":"Product doesn't exist in user's wish list"});
				}  
			}
		});
	}
	return;
}

exports.allRest = function(req,res){
	res.status(404);
		res.json({"error":"Wrong URL. Please check the API."});
}