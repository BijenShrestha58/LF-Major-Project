import { NextFunction, Response } from "express";
import config from "../config";
import { sign, verify } from "jsonwebtoken";
import { IUser } from "../interface/user";
import { Request } from "../interface/auth";
import { UnauthenticatedError } from "../error/UnauthenticatedError";
import { ForbiddenError } from "../error/ForbiddenError";

/**
 * Middleware to authenticate requests using JWT bearer tokens.
 * @param {Request} req - The request object containing headers with authorization token.
 * @param {Response} res - The response object to handle authentication errors.
 * @param {NextFunction} next - The next function to pass control to the next middleware.
 * @throws {UnauthenticatedError} If token is missing, malformed, or verification fails.
 */
export function authenticate(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;

  if (!authorization) {
    next(new UnauthenticatedError("Token not found"));
    return;
  }

  const token = authorization.split(" ");

  if (token.length !== 2 || token[0] !== "Bearer") {
    next(new UnauthenticatedError("Unauthenticated"));
    return;
  }
  if (!config.jwt.secret) {
    next(new Error("Error"));
    return;
  }

  try {
    const user = verify(token[1], config.jwt.secret) as IUser;
    req.user = user;
  } catch (e) {
    throw new UnauthenticatedError("Unauthenticated");
  }

  next();
}

/**
 * Middleware to authorize users based on role.
 * @param {string} role - The role string to check against user's roles.
 * @returns {Function} Express middleware function to handle authorization.
 */
export function authorize(role: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user!;
    if (!user.role.includes(role)) {
      next(new ForbiddenError("Forbidden"));
    }

    next();
  };
}
