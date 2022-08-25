import {
  User,
} from "@prisma/client";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import {
  createUser,
  findUserByUsername,
  LoginInput,
  UserInput,
} from "../services/accounts.service";

interface UserResponse {
  success: boolean;
  message: string;
  data?: {
    user?: {
      id?: number;
      fullName?: string;
      username?: string;
    };
  };
}

const signUp = async (
  req: Request<Record<string, never>, Record<string, never>, UserInput>,
  res: Response
): Promise<Response> => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const user = await createUser(req.body);

  return res.status(201).json({
    success: true,
    message: "Profile created successfully",
    data: {
      id: user.id,
    },
  });
};

const login = async (
  req: Request<Record<string, never>, Record<string, never>, LoginInput>,
  res: Response
): Promise<Response> => {
  const input = req.body;
  let user = await findUserByUsername(input.username);
  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Incorrect credentials",
    });
  }

  if (!bcrypt.compareSync(input.password, user.password)) {
    return res.status(401).json({
      success: false,
      message: "Incorrect credentials",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Logged in successfully",
    data: {
      user: {
        id: user.id,
        firstName: user.fullName,
      }
    },
  });
};

const getUser = (
  req: Request<
    Record<string, never>,
    Record<string, never>,
    Record<string, never>
  >,
  res: Response<UserResponse, { user: User }>
) => {
  const { user } = res.locals;

  return res.status(200).json({
    success: true,
    message: "Profile retrieved successfully",
    data: {
      user: {
        id: user.id,
        fullName: user.fullName,
        username: user.username,
      },
    },
  });
};

export {
  signUp,
  login,
  getUser,
};
