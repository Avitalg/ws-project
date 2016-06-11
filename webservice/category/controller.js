var Category=require('./schema');

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


exports.getCategory = function(req,res){
	var category= req.params.category;
	if(!category){
		res.status(404);
		res.json({"error":"category wasn't supplied"});
	}else{	
		Category.findOne({"name":category}, function(err,result){
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

exports.removeCategory = function(req,res){
	var category= req.params.category;
	if(!category){
		res.status(404);
		res.json({"error":"category wasn't supplied"});
	}else{	
		Category.remove({"name":category}, function(err,category){
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
		Category.findOne({ "name": _name }, function (err, category){
			if(!category){
				res.status(404);
				res.json({error: "Category with the name "+_name+" does't exist"});
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