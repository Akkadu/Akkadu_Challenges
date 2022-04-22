const express = require('express');
const route = express.Router();
const upload = require("../helpers/multer");
const productController = require("../controllers/productController");
route.post('/create',upload.single("imagePath"),productController.create)
route.get('/getpro',productController.getProduct)
route.get('/getOnepro/:id',productController.getOneProduct)
route.patch('/getupdate/:id',productController.updateProduct)
route.delete('/delete/:id',productController.deleteProduct)
module.exports=route