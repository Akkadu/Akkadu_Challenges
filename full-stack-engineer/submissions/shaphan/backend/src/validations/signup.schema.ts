import { checkSchema } from 'express-validator';
import { checkUsernameExists } from '../services/accounts.service';

export default checkSchema({
  fullName: {
    isEmpty: {
      errorMessage: 'Name is required',
      negated: true,
    },
    escape: true,
  },
  username: {
    trim: true,
    custom: {
      options: async (value) => checkUsernameExists(value).then((isExists) => {
        if (isExists) {
          throw new Error('User with this email already exists');
        }
      }),
    },
  },
  password: {
    trim: true,
    isLength: {
      options: {
        min: 8,
      },
      errorMessage: 'Password must have at least 8 characters',
    },
  },
  confirmPassword: {
    errorMessage: 'Must have the same value as the password field',
    custom: {
      options: (value, { req }) => value === req.body.password,
    },
  },
});
