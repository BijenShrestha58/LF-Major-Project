import { NextFunction, Response, Request } from "express";
import * as MoveService from "../service/move";
import loggerWithNameSpace from "../utils/logger";

const logger = loggerWithNameSpace("MoveController");

export async function getMoveById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const data = await MoveService.getMoveById(parseInt(id));
    logger.info("Called getMoveById");
    res.json(data);
  } catch (e) {
    next(e);
  }
}
