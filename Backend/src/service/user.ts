import * as UserModel from "../model/user";
import bcrypt from "bcrypt";
import config from "../config";
import loggerWithNameSpace from "../utils/logger";
import { IUser } from "../interface/user";
import { ConflictError } from "../error/ConflictError";
import { NotFoundError } from "../error/NotFoundError";

const logger = loggerWithNameSpace("UserService");

export async function getUsers() {
  const data = await UserModel.UserModel.getUsers();
  return data;
}

export async function createUser(user: IUser) {
  if (await getUserByUsername(user.username)) {
    throw new ConflictError("User with this username already exists");
  }
  const SALT_ROUNDS = config.bcrypt.saltRounds;
  const password = await bcrypt.hash(user.password, SALT_ROUNDS);
  await UserModel.UserModel.createUser({
    ...user,
    password,
  });
  logger.info("Called UserModel.createUser");
  return { message: "User Created" };
}

export async function getUserByUsername(name: string): Promise<IUser> {
  const data = await UserModel.UserModel.getUserByUsername(name);

  if (!data) {
    return;
  }

  const { password, ...userWithoutPassword } = data;

  return userWithoutPassword;
}

export async function updateUser(id: string, body: IUser) {
  let data;
  if (body.username) {
    data = await UserModel.UserModel.getUserByUsername(body.username);
  }
  if (data && data.username !== body.username) {
    throw new ConflictError("User with this username already exists");
  }
  const SALT_ROUNDS = config.bcrypt.saltRounds;
  const password = await bcrypt.hash(body.password, SALT_ROUNDS);
  const numOfRowsAffected = await UserModel.UserModel.updateUser(id, {
    ...body,
    password,
  });
  if (numOfRowsAffected === 0) {
    throw new NotFoundError(`User with id ${id} does not exist`);
  }

  return { message: "User Updated" };
}

export async function deleteUser(id: string) {
  const numOfRowsAffected = await UserModel.UserModel.deleteUser(id);
  if (numOfRowsAffected === 0) {
    throw new NotFoundError(`User with id ${id} does not exist`);
  }
  return { message: "User Deleted" };
}

export async function getUserById(id: string): Promise<IUser> {
  const data = await UserModel.UserModel.getUserById(id);
  if (!data) {
    throw new NotFoundError(`User with id ${id} does not exist`);
  }
  return data;
}
