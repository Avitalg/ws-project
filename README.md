# ws-project

##LOOK
https://webserviceproj.herokuapp.com/api/getAllLooks', looks.getLooks);
https://webserviceproj.herokuapp.com/api/getLookByCategory/:category', looks.getLookByCategory);
https://webserviceproj.herokuapp.com/api/getLook/:look', looks.getLook);
https://webserviceproj.herokuapp.com/api/addLook/:look/:image', looks.addLook);
https://webserviceproj.herokuapp.com/api/updateLook/:look/:image', looks.updateLook);
https://webserviceproj.herokuapp.com/api/removeLook/:look', looks.removeLook);
https://webserviceproj.herokuapp.com/api/addStepToLook/:look/:number/:image/:desc/:prodId', looks.addStepToLook);
https://webserviceproj.herokuapp.com/api/removeStepFromLook/:look/:number', looks.removeStepFromLook);


##CATEGORY
https://webserviceproj.herokuapp.com/api/getAllCategories', categories.getAllCategories);
https://webserviceproj.herokuapp.com/api/getCategory/:category', categories.getCategory);
https://webserviceproj.herokuapp.com/api/removeCategory/:category', categories.removeCategory);
https://webserviceproj.herokuapp.com/api/addCategory/:id/:name/:image/:himage', categories.addCategory);
https://webserviceproj.herokuapp.com/api/updateCategory/:id/:name/:image/:himage', categories.updateCategory);

##USER

https://webserviceproj.herokuapp.com/api/getUsers', users.getUsers);
https://webserviceproj.herokuapp.com/api/getUser/:username', users.getUser);
https://webserviceproj.herokuapp.com/api/removeUser/:username', users.removeUser);
https://webserviceproj.herokuapp.com/api/addUser/:username/:picture/:admin', users.addUser);
https://webserviceproj.herokuapp.com/api/updateUser/:username/:picture/:admin', users.updateUser);

##PRODUCT

https://webserviceproj.herokuapp.com/api/getAllProducts', products.getProducts);
https://webserviceproj.herokuapp.com/api/getProduct/:id', products.getProduct);
https://webserviceproj.herokuapp.com/api/addProduct/:id/:name/:price/:sdesc/:desc/:category/:image/:bimage', products.addProduct);
https://webserviceproj.herokuapp.com/api/updateProduct/:id/:name/:price/:sdesc/:desc/:category/:image/:bimage', products.updateProduct);
https://webserviceproj.herokuapp.com/api/removeProduct/:id', products.removeProduct);
https://webserviceproj.herokuapp.com/api/getCategoryProducts/:category', products.getCategoryProducts);
https://webserviceproj.herokuapp.com/api/getWishList/:username', products.getWishList);
https://webserviceproj.herokuapp.com/api/addToWishList/:username/:prodId', products.addToWishList);
https://webserviceproj.herokuapp.com/api/removeFromWishList/:username/:prodId', products.removeFromWishList);