var Look=require('./schema');

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
	var _look = req.body.look,
		_image = path.normalize(req.body.url);

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
 
exports.addLook = function(req,res){
	var _look = req.body.look,
		_image = path.normalize(req.body.url);

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
	var _number = req.body.number,
		_look = req.body.look,
		_image = path.normalize(req.body.url),
		_desc = req.body.desc,
		_prod = req.body.prodId;

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
							"number" : _number,
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
 
exports.removeStepFromLook = function(req,res){
	var _number = req.params.number,
		_look = req.params.look;

	if(!_look){
		res.status(500);
		res.json({"error":"No look name was entered"});
	} else {
		Look.findOne({ "look": _look },"steps", function (err, lookRes){
			if(!lookRes){
				res.status(404);
				res.json({error: "The look "+_look+" doesn't exist"});
			}else if(err){
				res.status(500);
				res.json({error:err});
			} else {
				console.log("look::"+lookRes.steps[0]);
				for(var i=0; i<lookRes.steps.length;i++){
					if(lookRes.steps[i].number == _number){
						console.log("here");
						lookRes.steps.pull(lookRes.steps[i]);
					}
				}
			  	lookRes.save();
			  	res.status(200);
			  	res.json({"success":"succeed remove step from look."});
			}
		});
	}
	return;
}
