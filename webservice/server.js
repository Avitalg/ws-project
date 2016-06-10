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

app.get('/api/getAllProducts', products.getData);
app.get('/api/getProduct/:id', products.getProduct);
app.get('/api/getCategoryProducts/:category', products.getCategoryProducts);
app.get('/api/getAllLooks', products.getLooks);
app.get('/api/getLookByCategory/:category', products.getLookByCategory);
app.get('/api/getAllCategories', products.getAllCategories);
app.get('/api/getUsers', products.getUsers);
app.get('/api/getWishList/:username', products.getWishList);
app.get('*',products.allRest);


app.listen(port);

console.log('The server is running on port '+ port);