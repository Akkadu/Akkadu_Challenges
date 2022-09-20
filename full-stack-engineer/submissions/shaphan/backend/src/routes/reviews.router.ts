import express from 'express';
import { addReview, editReview, removeReview } from '../controllers/reviews.controller';
import authenticate from '../utils/authenticate';
import reviewSchema from '../validations/review.schema';

const reviewsRouter = express.Router();

reviewsRouter
  .route('/reviews')
  .all(reviewSchema, authenticate)
  .post(addReview);

reviewsRouter
  .route('/reviews/:id')
  .all(authenticate)
  .put(editReview)
  .delete(removeReview);

export default reviewsRouter;
