var express = require('express');
var app = express();
var products = require('./productsController');
var port = process.env.PORT || 3000;

app.set('port', port);
app.use('/', express.static('./public'));
app.use(function(req, res, next){
	res.header('Access-Control-Allow-Origin', "*");
	res.header('Access-Control-Allow-Header', "Origin, X-Requested-With, Content-Type, Accept");
	app.set('json spaces', 4);
	res.set('Content-Type', "application/json");
	next();
});

app.get('/project/getAllProducts', products.getData);
app.get('/project/getCategory/:id', products.getCategory);
app.get('/project/getAllLooks', products.getLook);
app.get('/project/getLookByCategory/:category', products.getLookByCategory);
app.get('/project/getAllCategories', products.getAllCategories);
app.get('/project/getUsers', products.getUsers);
app.get('/project/getWishList/:username', products.getWishList);
app.get('*',products.allRest);


app.listen(port);

console.log('The server is running on port '+ port);