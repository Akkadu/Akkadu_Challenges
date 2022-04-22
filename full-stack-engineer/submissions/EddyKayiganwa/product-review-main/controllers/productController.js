const dotenv = require('dotenv');
const Product = require('../models/productModel')
const uploader = require('../helpers/storage')
const cloudinary = require("../helpers/storage");
const upload = require("../helpers/multer")

const create = async (req, res) => {
    try {
        // Upload image to cloudinary
        const result = await cloudinary.uploader.upload(req.file.path);
        // Create new product
        let product = new Product({
            product_name: req.body.product_name,
            product_type: req.body.product_type,
            imagePath:result,
            product_price: req.body.product_price,
        });
        // save user details in mongodb
        await product.save();
        res.status(200)
          .send({
            product
          });
      } catch (err) {
        console.log(err);
      }
    }
const getProduct= async (req, res) => {
    await Product.find().then((pro) => {
        res.send(pro)

    })
}
const calculateProduct=async(req,res)=>{
    
}
const getOneProduct = async (req, res, next) => {
    try {
        const cust = await Product.findOne({ _id: req.params.id})
        if (!cust) {
            res.status(404).send('no Products found ')
        }
        res.send(cust)
    } catch (error) {
        res.status(500).send(error.message);
    }
}
const deleteProduct = async (req, res) => {
    try {
        const cust = await Product.findOne({ _id: req.params.id})
        if (!cust) {
            res.send('Product not found')
        }

        await Product.deleteOne({ _id: req.params.id, supplier_id: req.Supplier._id })
        res.send({
            message: " Product deleted successful",
            cust:cust
        })
    } catch (error) {
        res.status(404).send(error.message)
    }
}

const updateProduct = async (req, res) => {
    const product = new Product({
        product_name: req.body.product_name,
        product_type: req.body.product_type,
        imagePath:response.secure_url,
        product_price: req.body.price
    })

    Product.updateOne({ _id: req.params.id }, product).then(() => {
        res.status(201).send({
            message: 'Product updated successfully',
            cus,
        });
    }).catch((error) => {
        res.status(400).json({
            error: error,

        });
    })
}
module.exports = {
    create,
    getProduct,
    getOneProduct,
    deleteProduct,
    updateProduct
}