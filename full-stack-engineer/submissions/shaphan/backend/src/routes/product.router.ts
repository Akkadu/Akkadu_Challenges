import express, { Router } from 'express';
import { addProduct, getProductReviews, getProducts } from '../controllers/products.controller';
import productSchema from '../validations/product.schema';

const productRouter: Router = express.Router();

productRouter
  .post('/products', productSchema, addProduct)
  .get('/products', getProducts)
  .get('/products/:id/reviews', getProductReviews);

export default productRouter;
