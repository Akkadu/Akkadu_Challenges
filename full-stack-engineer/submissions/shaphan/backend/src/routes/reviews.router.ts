import express from 'express';
import { addReview, editReview, removeReview } from '../controllers/reviews.controller';
import authenticate from '../utils/authenticate';

const reviewsRouter = express.Router();

reviewsRouter
  .post('/reviews', authenticate, addReview)
  .put('/reviews/:id', editReview)
  .delete('/reviews/:id', removeReview);

export default reviewsRouter;
