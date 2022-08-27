import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import {
  createReview, deleteReview, ReviewInput, updateReview,
} from '../services/reviews.service';

const addReview = async (
  req: Request<Record<string, never>, Record<string, never>, ReviewInput>,
  res: Response,
): Promise<Response> => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { user } = res.locals;
  const review = await createReview(req.body, user.id);

  return res.status(201).json({
    success: true,
    message: 'Review created successfully',
    data: {
      ...review,
    },
  });
};

const editReview = async (
  req: Request<{id: number}, Record<string, never>, ReviewInput>,
  res: Response,
): Promise<Response> => {
  const { params } = req;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array(), success: false });
  }

  const review = await updateReview(params.id, req.body);
  return res.status(200).json({
    success: true,
    message: 'Review updated successfully',
    data: {
      ...review,
    },
  });
};

const removeReview = async (
  req: Request<{id: number}, Record<string, never>>,
  res: Response,
): Promise<Response> => {
  const { params } = req;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array(), success: false });
  }

  const review = await deleteReview(params.id);
  return res.status(200).json({
    success: true,
    message: 'Review deleted successfully',
    data: {
      id: review.id,
    },
  });
};

export { addReview, editReview, removeReview };
