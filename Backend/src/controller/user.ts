import { NextFunction, Response } from "express";
import { Request } from "../interface/auth";
import * as UserService from "../service/user";
import loggerWithNameSpace from "../utils/logger";

const logger = loggerWithNameSpace("UserController");

export async function getUsers(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = await UserService.getUsers();
    logger.info("Called getUsers");
    res.json(data);
  } catch (e) {
    next(e);
  }
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
  res: Response,
  next: NextFunction
) {
  try {
    const { username } = req.params;
    const data = await UserService.getUserByUsername(username);
    logger.info("Called getUserByUsername");
    res.json(data);
  } catch (e) {
    next(e);
  }
}

export async function updateUser(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const { body } = req;
    const data = await UserService.updateUser(id, body);
    logger.info("Called updateUser");
    res.json(data);
  } catch (e) {
    next(e);
  }
}

export async function deleteUser(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const data = await UserService.deleteUser(id);
    logger.info("Called deleteUser");
    res.json(data);
  } catch (e) {
    next(e);
  }
}

export async function getUserById(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const data = await UserService.getUserById(id);
    logger.info("Called getUserByUsername");
    res.json(data);
  } catch (e) {
    next(e);
  }
}

export async function getMyDetails(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) {
  const user = req.user;
  const data = await UserService.getUserById(user.id);
  res.json(data);
}
