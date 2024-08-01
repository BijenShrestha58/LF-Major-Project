import { sign, verify } from "jsonwebtoken";
import { IUser } from "../interface/user";
import bcrypt from "bcrypt";
import config from "../config";
import { UnauthenticatedError } from "../error/UnauthenticatedError";
import loggerWithNameSpace from "../utils/logger";
import * as UserModel from "../model/user";
const logger = loggerWithNameSpace("AuthService");

/**
 * Authenticates a user based on username and password, and generates access and refresh tokens.
 * @param {Pick<IUser, "username" | "password">} body - The object containing user username and password.
 * @returns {Promise<{ accessToken: string, refreshToken: string }>} An object containing access and refresh tokens.
 * @throws {UnauthenticatedError} If authentication fails due to invalid username or password.
 */
export async function login(body: Pick<IUser, "username" | "password">) {
  const existingUser = await UserModel.UserModel.getUserByUsername(
    body.username
  );
  logger.info("Called getUserByUsername");

  if (!existingUser) {
    throw new UnauthenticatedError("Invalid username or password");
  }

  const isValidPassword = await bcrypt.compare(
    body.password,
    existingUser.password
  );

  if (!isValidPassword) {
    throw new UnauthenticatedError("Invalid username or password");
  }

  const payload = {
    id: existingUser.id,
    username: existingUser.username,
    role: existingUser.role,
  };

  const accessToken = sign(payload, config.jwt.secret!, {
    expiresIn: config.jwt.accessTokenExpiryMS,
  });

  const refreshToken = sign(payload, config.jwt.secret!, {
    expiresIn: config.jwt.refreshTokenExpiryMS,
  });

  return {
    accessToken,
    refreshToken,
  };
}

/**
 * Generates a new access token using a refresh token.
 * @param {string} refreshToken - The refresh token used to generate a new access token.
 * @returns {Promise<{ accessToken: string }>} An object containing the new access token.
 * @throws {UnauthenticatedError} If the refresh token verification fails.
 */
export async function refresh(refreshToken: string) {
  let decoded;
  try {
    decoded = await verify(refreshToken, config.jwt.secret!);
  } catch (e) {
    throw new UnauthenticatedError("Invalid refresh token");
  }

  const { id, username, role } = decoded as IUser;

  const payload = { id, username, role };

  const newAccessToken = await sign(payload, config.jwt.secret!, {
    expiresIn: config.jwt.accessTokenExpiryMS,
  });
  return {
    accessToken: newAccessToken,
  };
}
