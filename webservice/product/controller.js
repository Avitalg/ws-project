var Product = require('./schema');
var User=require('../user/schema');
var cloudinary = require('cloudinary');
var path = require("path");

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
		  image:"image_url",
		  big_image: "image_url",
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
			  	prod.image = "image_url";
			  	prod.big_image = "image_url";
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
					user.wish_list.pull(_prodId);
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

exports.uploadImage = function(req,res, next){
	var prodId = req.body.id;
	var imgType = req.body.type;
	var url = path.normalize(req.body.url);
    Product.findOne({'id':prodId}, function(err, data){
       if(err){
      	 	res.status(500);
        	res.json({"error":err});
        }else if(!data){
        	res.status(404);
        	res.json([{"error":"Product doesn't exist"}]);
        }else{
          switch(imgType){
        	case 'image':
        		data.image = result.url;
        		break;
        	default:
        		data.big_image = result.url;
               	break;
        }
        data.save();
        res.status(200);
        res.json({"success":"Product was updated"});
        }
   });

 };



exports.allRest = function(req,res){
	res.status(404);
		res.json({"error":"Wrong URL. Please check the API."});
}
