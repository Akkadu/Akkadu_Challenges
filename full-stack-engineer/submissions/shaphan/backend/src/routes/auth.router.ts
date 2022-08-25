import express, { Request, Response, Router } from "express";
import {
  getUser,
  login,
  signUp,
} from "../controllers/accounts.controller";
import signupSchema from "../validations/signup.schema";
import loginSchema from "../validations/login.schema";
import authenticate from "../utils/authenticate";

const authRouter: Router = express.Router();

authRouter.get("/", (req: Request, res: Response) => {
  res.send("Akkadu Products Review API");
});

authRouter
  .post("/signup", signupSchema, signUp)
  .post("/login", loginSchema, login)
  .get("/user", authenticate, getUser);

export default authRouter;
