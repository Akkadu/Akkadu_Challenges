import { checkSchema } from 'express-validator';

export default checkSchema({
  username: {
    trim: true,
    escape: true,
  },
});
