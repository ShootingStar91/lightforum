import { User } from "../models";

export const createUser = async (username: string, password: string) => {
  console.log({username, password})
  const result = await User.create({ username, password_hash: password });
  return result;
};

export const tryLogin = async (username: string, password: string) => {
  const foundUser = await User.findOne({ where: { username, password } });
  return foundUser;
};
