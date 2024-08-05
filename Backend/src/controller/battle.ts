import { NextFunction, Response, Request } from "express";
import * as BattleService from "../service/battle";
import loggerWithNameSpace from "../utils/logger";

const logger = loggerWithNameSpace("BattleController");

export async function createBattle(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { userId, teamId } = req.body;

    const data = await BattleService.createBattle(
      parseInt(userId),
      parseInt(teamId)
    );
    logger.info("Called createBattle");
    res.json(data);
  } catch (e) {
    next(e);
  }
}

export async function getAllBattleData(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = req.params.id;

    const data = await BattleService.getAllBattleData(parseInt(id));
    logger.info("Called getAllBattleData");
    res.json(data);
  } catch (e) {
    next(e);
  }
}
