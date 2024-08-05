import { ConflictError } from "../error/ConflictError";
import loggerWithNameSpace from "../utils/logger";
import * as BattleModel from "../model/battle";
import { damageCalc } from "../utils/utils";
import { getMoveById } from "./move";

const logger = loggerWithNameSpace("BattleService");

/**
 * Creates a new battle for a user.
 *
 * @param {number} userId - The ID of the user creating the battle.
 * @param {string} teamId - The teamId of the battle.
 * @returns {Promise<Object>} A promise that resolves to an object containing a success message and the ID of the created battle.
 * @throws {ConflictError} If the userId is not a valid number or is less than or equal to 0.
 */
export async function createBattle(userId: number, teamId: number) {
  if (typeof userId !== "number" || userId <= 0) {
    throw new ConflictError("Invalid userId");
  }

  const battleId = await BattleModel.BattleModel.createBattle(userId, teamId);
  logger.info("Called BattleModel.createBattle");
  return { message: "Battle Created", battleId: battleId.id };
}

export async function getAllBattleData(teamPokemonId: number) {
  const data = await BattleModel.BattleModel.getAllBattleData(teamPokemonId);
  logger.info("Called BattleModel.getAllBattleData");
  return data;
}

export async function calculateDamage(attackerId, defenderId, moveId) {
  const attacker = getAllBattleData(attackerId);
  const defender = getAllBattleData(defenderId);
  const move = getMoveById(moveId);
  damageCalc(attacker, defender, move);
}
