var express = require('express');
var app = express();

var bodyParser = require('body-parser');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


var db = require('./database');
var products = require('./product/controller');
var categories = require('./category/controller');
var users = require('./user/controller');
var looks = require('./look/controller');

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

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~LOOK~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

app.get('/api/getAllLooks', looks.getLooks);
app.get('/api/getLookByCategory/:category', looks.getLookByCategory);
app.get('/api/getLook/:look', looks.getLook);
app.get('/api/addLook/:look/:image', looks.addLook);
app.get('/api/updateLook/:look/:image', looks.updateLook);
app.get('/api/removeLook/:look', looks.removeLook);
app.get('/api/addStepToLook/:look/:number/:image/:desc/:prodId', looks.addStepToLook);
app.get('/api/removeStepFromLook/:look/:number', looks.removeStepFromLook);


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~CATEGORY~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


app.get('/api/getAllCategories', categories.getAllCategories);
app.get('/api/getCategory/:category', categories.getCategory);
app.get('/api/removeCategory/:category', categories.removeCategory);
app.get('/api/addCategory/:id/:name/:image/:himage', categories.addCategory);
app.get('/api/updateCategory/:id/:name/:image/:himage', categories.updateCategory);

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~USER~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

app.get('/api/getUsers', users.getUsers);
app.get('/api/getUser/:username', users.getUser);
app.get('/api/removeUser/:username', users.removeUser);
app.get('/api/addUser/:username/:admin', users.addUser);
app.get('/api/updateUser/:username/:admin', users.updateUser);

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~PRODUCT~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

app.get('/api/getAllProducts', products.getProducts);
app.get('/api/getProduct/:id', products.getProduct);
app.get('/api/addProduct/:id/:name/:price/:sdesc/:desc/:category', products.addProduct);
app.get('/api/updateProduct/:id/:name/:price/:sdesc/:desc/:category', products.updateProduct);
app.get('/api/removeProduct/:id', products.removeProduct);
app.get('/api/getCategoryProducts/:category', products.getCategoryProducts);
app.get('/api/getWishList/:username', products.getWishList);
app.get('/api/addToWishList/:username/:prodId', products.addToWishList);
app.get('/api/removeFromWishList/:username/:prodId', products.removeFromWishList);
app.post('/api/uploadImage', products.uploadImage);
app.get('*',products.allRest);


app.listen(port);

console.log('The server is running on port '+ port);