import { Request, Response, NextFunction } from "express";
import * as PokemonService from "../service/pokemon";

export async function getAllPokemon(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const limit = parseInt(req.query.limit as string, 10) || 10;
    const offset = parseInt(req.query.offset as string, 10) || 0;
    const sortBy = req.query.sortBy as string;
    const pokemonData = await PokemonService.getAllPokemon(
      limit,
      offset,
      sortBy
    );
    res.json(pokemonData);
  } catch (error) {
    next(error);
  }
}

export async function getPokemonDetails(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const pokemonDetails = await PokemonService.getPokemonDetails(id);
    res.json(pokemonDetails);
  } catch (error) {
    next(error);
  }
}
