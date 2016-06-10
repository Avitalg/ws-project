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

app.get('/api/getAllProducts', products.getProducts);
app.get('/api/getProduct/:id', products.getProduct);
app.get('/api/addProduct/:id/:name/:price/:sdesc/:desc/:category', products.addProduct);
app.get('/api/updateProduct/:id/:name/:price/:sdesc/:desc/:category', products.updateProduct);
app.get('/api/removeProduct/:id', products.removeProduct);

app.get('/api/getCategoryProducts/:category', products.getCategoryProducts);
app.get('/api/getAllLooks', products.getLooks);
app.get('/api/getLookByCategory/:category', products.getLookByCategory);
app.get('/api/getLook/:look', products.getLook);
app.get('/api/addLook/:look/:image', products.addLook);
app.get('/api/updateLook/:look/:image', products.updateLook);
app.get('/api/removeLook/:look', products.removeLook);
app.get('/api/addStepToLook/:look/:image/:desc/:prodId', products.addStepToLook);


app.get('/api/getAllCategories', products.getAllCategories);
app.get('/api/getCategory/:category', products.getCategory);
app.get('/api/removeCategory/:id', products.removeCategory);
app.get('/api/addCategory/:id/:name/:image/:himage', products.addCategory);

//check bellow
app.get('/api/updateCategory/:id/:name/:image/:himage', products.updateCategory);

app.get('/api/removeCategory/:id', products.removeCategory);
app.get('/api/getUsers', products.getUsers);
app.get('/api/getUser/:username', products.getUser);
app.get('/api/removeUser/:username', products.removeUser);

app.get('/api/addUser/:username/:picture/:admin', products.addUser);
app.get('/api/updateUser/:username/:picture/:admin', products.updateUser);
app.get('/api/getWishList/:username', products.getWishList);
app.get('/api/addToWishList/:username/:prodId', products.addToWishList);
app.get('/api/removeFromWishList/:username/:prodId', products.removeFromWishList);
app.get('*',products.allRest);


app.listen(port);

console.log('The server is running on port '+ port);