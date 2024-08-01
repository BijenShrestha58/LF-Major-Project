import { NextFunction, Response, Request } from "express";
import * as TeamService from "../service/team";
import loggerWithNameSpace from "../utils/logger";

const logger = loggerWithNameSpace("TeamController");

export async function createTeam(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { userId, name } = req.body;

    const data = await TeamService.createTeam(parseInt(userId), name);
    logger.info("Called createTeam");
    res.json(data);
  } catch (e) {
    next(e);
  }
}

export async function addPokemonToTeam(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { teamId, pokemonId } = req.body;
    const data = await TeamService.addPokemonToTeam(
      parseInt(teamId),
      parseInt(pokemonId)
    );
    logger.info("Called addPokemonToTeam");
    res.json(data);
  } catch (e) {
    next(e);
  }
}

export async function getTeamById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const data = await TeamService.getTeamById(parseInt(id));
    logger.info("Called getTeamById");
    res.json(data);
  } catch (e) {
    next(e);
  }
}

export async function getTeamsByUserId(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = parseInt(req.params.userId, 10);
    if (isNaN(userId)) {
      res.status(400).json({ message: "Invalid user ID" });
      return;
    }

    const data = await TeamService.getTeamsByUserId(userId);
    logger.info("Called getTeamsByUserId");

    res.json(data);
  } catch (e) {
    next(e);
  }
}
