import * as MoveModel from "../model/move";
import { ConflictError } from "../error/ConflictError";
import loggerWithNameSpace from "../utils/logger";
import { NotFoundError } from "../error/NotFoundError";

const logger = loggerWithNameSpace("TeamService");

export async function getMoveById(moveId: number) {
  if (typeof moveId !== "number" || moveId <= 0) {
    throw new ConflictError("Invalid moveId");
  }

  const move = await MoveModel.MoveModel.getMoveById(moveId);
  logger.info("Called MoveModel.getMoveById");

  if (!move) {
    throw new NotFoundError(`Move with id ${moveId} not found`);
  }

  return move;
}
