import * as MoveModel from "../model/move";
import { ConflictError } from "../error/ConflictError";
import loggerWithNameSpace from "../utils/logger";
import { NotFoundError } from "../error/NotFoundError";

const logger = loggerWithNameSpace("TeamService");

/**
 * Fetches a move by its ID.
 *
 * @param {number} moveId - The ID of the move to fetch.
 * @returns {Promise<Object>} The move object if found.
 * @throws {ConflictError} If the moveId is not a valid number or is less than or equal to 0.
 * @throws {NotFoundError} If no move is found with the provided ID.
 */
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
