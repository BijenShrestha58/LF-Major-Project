import * as UserModel from "../model/user";
import bcrypt from "bcrypt";
import config from "../config";
import loggerWithNameSpace from "../utils/logger";
import { IUser } from "../interface/user";
import { ConflictError } from "../error/ConflictError";
import { NotFoundError } from "../error/NotFoundError";

const logger = loggerWithNameSpace("UserService");

/**
 * Fetches a list of users.
 *
 * @returns {Promise<Object[]>} A promise that resolves to an array of user objects.
 */
export async function getUsers() {
  const data = await UserModel.UserModel.getUsers();
  return data;
}

/**
 * Creates a new user.
 *
 * @param {IUser} user - The user object containing user details.
 * @param {string} user.username - The username of the user.
 * @param {string} user.password - The password of the user (will be hashed before storing).
 * @param {string} [user.email] - The email of the user (optional).
 * @param {string} [user.firstName] - The first name of the user (optional).
 * @param {string} [user.lastName] - The last name of the user (optional).
 * @returns {Promise<Object>} A promise that resolves to an object containing a success message.
 * @throws {ConflictError} If a user with the same username already exists.
 */
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

/**
 * Retrieves a user by their username.
 *
 * @param {string} name - The username of the user to retrieve.
 * @returns {Promise<IUser | undefined>} A promise that resolves to the user object without the password, or `undefined` if not found.
 */
export async function getUserByUsername(name: string): Promise<IUser> {
  const data = await UserModel.UserModel.getUserByUsername(name);

  if (!data) {
    return;
  }

  const { password, ...userWithoutPassword } = data;

  return userWithoutPassword;
}

/**
 * Updates a user by their ID.
 *
 * @param {string} id - The user ID.
 * @param {IUser} body - The updated user data.
 * @returns {Promise<Object>} A promise that resolves to a success message.
 * @throws {ConflictError} If the username already exists.
 * @throws {NotFoundError} If the user is not found.
 */
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

/**
 * Deletes a user by their ID.
 *
 * @param {string} id - The user ID.
 * @returns {Promise<Object>} A promise that resolves to a success message.
 * @throws {NotFoundError} If the user is not found.
 */
export async function deleteUser(id: string) {
  const numOfRowsAffected = await UserModel.UserModel.deleteUser(id);
  if (numOfRowsAffected === 0) {
    throw new NotFoundError(`User with id ${id} does not exist`);
  }
  return { message: "User Deleted" };
}

/**
 * Retrieves a user by their ID.
 *
 * @param {string} id - The user ID.
 * @returns {Promise<IUser>} A promise that resolves to the user object.
 * @throws {NotFoundError} If the user is not found.
 */
export async function getUserById(id: string): Promise<IUser> {
  const data = await UserModel.UserModel.getUserById(id);
  if (!data) {
    throw new NotFoundError(`User with id ${id} does not exist`);
  }
  return data;
}
