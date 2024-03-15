import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// hashing a given string
export const stringHash = async (data: string): Promise<string> => {
  const hashedStr = await bcrypt
    .hash(data, 8)
    .then((res) => res)
    .catch((err) => err);

  return hashedStr;
};

export const createToken = async (payload: string): Promise<string> => {
  const key = process.env.JWT_KEY;
  const token = jwt.sign({ payload }, key, {
    expiresIn: "1h",
  });

  return token;
};
