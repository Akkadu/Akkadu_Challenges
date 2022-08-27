import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import {
  createProduct, findAllProducts, findProductById, ProductInput,
} from '../services/products.service';

const getProducts = async (
  req: Request<Record<string, never>>,
  res: Response,
): Promise<Response> => {
  const products = await findAllProducts();

  return res.status(200).json({
    success: true,
    message: 'Products retrieved successfully',
    products,
  });
};

const addProduct = async (
  req: Request<Record<string, never>, Record<string, never>, ProductInput>,
  res: Response,
): Promise<Response> => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array(), success: false });
  }

  const product = await createProduct(req.body);

  return res.status(200).json({
    success: true,
    message: 'Product added successfully',
    data: {
      ...product,
    },
  });
};

const getProductReviews = async (
  req: Request<{id: number}>,
  res: Response,
): Promise<Response> => {
  const { params } = req;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array(), success: false });
  }
  const product = await findProductById(params.id);
  return res.status(200).json({
    success: true,
    message: 'Reviews retrieved successfully',
    product,
  });
};

export { getProducts, addProduct, getProductReviews };
