import { NextFunction, Response } from "express";
import { Request } from "../interface/auth";
import * as UserService from "../service/user";
import loggerWithNameSpace from "../utils/logger";

const logger = loggerWithNameSpace("UserController");

export async function getUsers(req: Request, res: Response) {
  const data = await UserService.getUsers();
  logger.info("Called getUsers");
  res.json(data);
}

export async function createUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { body } = req;
    const data = await UserService.createUser(body);
    logger.info("Called createUser");
    res.json(data);
  } catch (e) {
    next(e);
  }
}

export async function getUserByUsername(
  req: Request<{ username: string }>,
  res: Response
) {
  const { username } = req.params;
  const data = await UserService.getUserByUsername(username);
  logger.info("Called getUserByUsername");
  res.json(data);
}
