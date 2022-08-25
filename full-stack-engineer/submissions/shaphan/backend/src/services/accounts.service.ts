import { PrismaClient, User } from "@prisma/client";
import bcrypt from "bcrypt";

interface UserInput {
  id?: number;
  fullName: string;
  username: string;
  password: string;
}

interface LoginInput {
  username: string;
  password: string;
}

const prisma = new PrismaClient();

const createUser = async (input: UserInput) => {
  const passwordHash = bcrypt.hashSync(input.password, 10);
  const user = await prisma.user.create({
    data: {
      fullName: input.fullName,
      username: input.username,
      password: passwordHash,
    },
  });

  return user;
};

const findUserByUsername = async (username: string): Promise<User | null> => {
  const user = await prisma.user.findFirst({
    where: {
      username,
    },
  });
  return user;
};

const findUserById = async (id: number) => {
  const user = await prisma.user.findFirst({
    where: {
      id: Number(id),
    },
  });
  return user;
};



const setPassword = async (id: number, password: string) => {
  const passwordHash = bcrypt.hashSync(password, 10);
  await prisma.user.update({
    where: { id },
    data: {
      password: passwordHash,
    },
  });
};

const checkUsernameExists = async (username: string): Promise<boolean> => {
  const user = await prisma.user.findFirst({
    where: {
      username,
    },
  });
  if (user) {
    return true;
  }
  return false;
};


export {
  UserInput,
  LoginInput,
  createUser,
  findUserById,
  findUserByUsername,
  setPassword,
  checkUsernameExists
};
