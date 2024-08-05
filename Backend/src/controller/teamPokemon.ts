import { Request, Response, NextFunction } from "express";
import * as TeamPokemonService from "../service/teamPokemon";
import loggerWithNameSpace from "../utils/logger";

const logger = loggerWithNameSpace("TeamPokemonController");
export async function createTeamPokemon(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { pokemonId } = req.body;
    const data = await TeamPokemonService.createTeamPokemon(pokemonId);
    res.json(data);
  } catch (e) {
    next(e);
  }
}

export async function addMovesToTeamPokemon(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { teamPokemonId, moves } = req.body;
    const data = await TeamPokemonService.addMovesToTeamPokemon(
      teamPokemonId,
      moves
    );
    res.json(data);
  } catch (e) {
    next(e);
  }
}

export async function getTeamPokemonById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const data = await TeamPokemonService.getTeamPokemonById(parseInt(id));
    res.json(data);
  } catch (e) {
    next(e);
  }
}

export async function getPokemonImageByTeamPokemonId(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      res.status(400).json({ message: "Invalid teamPokemon ID" });
      return;
    }

    const data = await TeamPokemonService.getPokemonImageByTeamPokemonId(id);
    logger.info("Called getPokemonImageByTeamPokemonId");

    res.json(data);
  } catch (e) {
    next(e);
  }
}

export async function getAllAvailableMoves(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const limit = parseInt(req.query.limit as string, 10) || 10;
    const offset = parseInt(req.query.offset as string, 10) || 0;
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      res.status(400).json({ message: "Invalid teamPokemon ID" });
      return;
    }

    const data = await TeamPokemonService.getAllAvailableMoves(
      id,
      limit,
      offset
    );
    logger.info("Called getAllAvailableMoves");

    res.json(data);
  } catch (e) {
    next(e);
  }
}
