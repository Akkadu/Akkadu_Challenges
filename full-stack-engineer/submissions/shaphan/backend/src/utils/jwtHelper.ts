import { User } from "@prisma/client";
import JWT from "jsonwebtoken";
import config from "../config";

interface TokenPayload {
  id?: number;
  email?: string;
  error?: string;
}

const signToken = (user: User | null, expiresIn: string | number | null) =>
  JWT.sign(
    {
      id: user?.id,
      username: user?.username || "",
    },
    config.JWT_SECRET,
    { expiresIn: expiresIn || "24h" }
  );

const verifyToken = async (token: string): Promise<TokenPayload> => {
  let data: TokenPayload;
  try {
    data = <TokenPayload>JWT.verify(token, config.JWT_SECRET);
  } catch (e) {
    return {
      error: "Invalid Token",
    };
  }

  return {
    id: data.id,
    email: data.email,
  };
};

export { signToken, verifyToken };
