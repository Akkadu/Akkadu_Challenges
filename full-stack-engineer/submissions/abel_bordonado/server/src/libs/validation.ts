import { ValidationError } from "express-validator";

export const errorFormatter = (error: {
  location?: undefined;
  param: "_error";
  msg: any;
  nestedErrors: ValidationError[];
}) => {
  // Build your resulting errors however you want! String, object, whatever - it works!
  return `${error.location}[${error.param}]: ${error.msg}`;
};
