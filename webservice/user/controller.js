var User=require('./schema');

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
		_admin = req.params.admin;

	if(!_username){
		res.status(500);
		res.json({"error":"No username was entered"});
	} else {
		var user = new User({
		  username: _username,
		  admin: _admin,
		  wish_list: []
		});

		user.save(function(err){
			if(err){
				res.status(500);
				res.json({error:err});
			} else{
				res.status(200);
   					res.json({"success":"User was saved"});
   				}
		});
	}
	return;

}

exports.updateUser = function(req,res){
	var _username = req.params.username,
		_admin = req.params.admin;

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
			  	user.admin = _admin;
			  	user.save();
			  	res.status(200);
			  	res.json({"success":"succeed update user's details."});
			}
		});
	}
	return;

}