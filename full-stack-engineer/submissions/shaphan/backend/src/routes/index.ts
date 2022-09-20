import express, { Router } from 'express';
import authRouter from './auth.router';
import productRouter from './product.router';
import reviewsRouter from './reviews.router';

const router: Router = express.Router();

router.use(authRouter);
router.use(productRouter);
router.use(reviewsRouter);

export default router;
