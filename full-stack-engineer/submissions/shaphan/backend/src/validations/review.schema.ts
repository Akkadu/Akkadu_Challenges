import { checkSchema } from 'express-validator';

export default checkSchema({
  comment: {
    isEmpty: {
      errorMessage: 'Review is required',
      negated: true,
    },
    escape: true,
  },
  productId: {
    isEmpty: {
      errorMessage: 'Price is required',
      negated: true,
    },
    escape: true,
  },
  stars: {
    isEmpty: {
      errorMessage: 'Choose your rating',
      negated: true,
    },
    isInt: { options: { min: 1, max: 5 }, errorMessage: 'Rating must be between 1 and 5' },
    escape: true,
  },
});
