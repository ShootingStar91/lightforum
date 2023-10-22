import { User } from "../models/index.js";

export const createUser = async (username: string, password: string) => {
  const result = await User.create({ username, password_hash: password });
  return result;
};

export const tryLogin = async (username: string, password: string) => {
  const foundUser = await User.findOne({ where: { username, password_hash: password } });
  return foundUser;
};
