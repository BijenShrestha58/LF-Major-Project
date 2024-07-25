import * as UserModel from "../model/user";
import bcrypt from "bcrypt";
import config from "../config";
import loggerWithNameSpace from "../utils/logger";
import { IUser } from "../interface/user";
import { ConflictError } from "../error/ConflictError";

const logger = loggerWithNameSpace("UserService");

export async function getUsers() {
  const data = await UserModel.UserModel.getUsers();
  return data;
}

export async function createUser(user: IUser) {
  if (await getUserByUsername(user.username)) {
    throw new ConflictError("User with this username already exists");
  }
  const SALT_ROUNDS = parseInt(config.bcrypt.saltRounds);
  const password = await bcrypt.hash(user.password, SALT_ROUNDS);
  UserModel.UserModel.createUser({
    ...user,
    password,
  });
  logger.info("Called UserModel.createUser");
  return { message: "User Created" };
}

export async function getUserByUsername(name: string): Promise<IUser> {
  const data = await UserModel.UserModel.getUserByUsername(name);
  return data;
}
