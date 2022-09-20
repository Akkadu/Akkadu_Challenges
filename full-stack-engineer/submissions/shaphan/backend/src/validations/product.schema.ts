import { checkSchema } from 'express-validator';

export default checkSchema({
  name: {
    isEmpty: {
      errorMessage: 'Name is required',
      negated: true,
    },
    escape: true,
  },
  price: {
    isEmpty: {
      errorMessage: 'Price is required',
      negated: true,
    },
    escape: true,
  },
  vendor: {
    isEmpty: {
      errorMessage: 'Vendor is required',
      negated: true,
    },
    escape: true,
  },
});
