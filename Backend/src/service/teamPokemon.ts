import { BadRequestError } from "../error/BadRequestError";
import { ConflictError } from "../error/ConflictError";
import { NotFoundError } from "../error/NotFoundError";
import * as TeamPokemonModel from "../model/teamPokemon";

export async function createTeamPokemon(pokemonId: number) {
  const id = await TeamPokemonModel.TeamPokemonModel.createTeamPokemon(
    pokemonId
  );
  return { message: "teamPokemon Created", data: id };
}

export async function addMovesToTeamPokemon(
  teamPokemonId: number,
  moves: { move1?: number; move2?: number; move3?: number; move4?: number }
) {
  await TeamPokemonModel.TeamPokemonModel.addMovesToTeamPokemon(
    teamPokemonId,
    moves
  );
  return { message: "Moves added to teamPokemon" };
}

export async function getTeamPokemonById(teamPokemonId: number) {
  if (typeof teamPokemonId !== "number" || teamPokemonId <= 0) {
    throw new ConflictError("Invalid teamPokemonId");
  }

  const teamPokemon =
    await TeamPokemonModel.TeamPokemonModel.getTeamPokemonById(teamPokemonId);

  if (!teamPokemon) {
    throw new NotFoundError(`Team Pokemon with id ${teamPokemonId} not found`);
  }

  return teamPokemon;
}

export async function getPokemonImageByTeamPokemonId(id: number) {
  if (!id) {
    throw new BadRequestError("teamPokemonId is required");
  }

  const res =
    await TeamPokemonModel.TeamPokemonModel.getPokemonImageByTeamPokemonId(id);

  return res;
}
