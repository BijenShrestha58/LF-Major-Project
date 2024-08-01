import * as TeamModel from "../model/team";
import * as TeamPokemonService from "./teamPokemon";
import { ConflictError } from "../error/ConflictError";
import { NotFoundError } from "../error/NotFoundError";
import loggerWithNameSpace from "../utils/logger";
import { BadRequestError } from "../error/BadRequestError";

const logger = loggerWithNameSpace("TeamService");

export async function createTeam(userId: number, name: string) {
  if (typeof userId !== "number" || userId <= 0) {
    throw new ConflictError("Invalid userId");
  }

  const teamId = await TeamModel.TeamModel.createTeam(userId, name);
  logger.info("Called TeamModel.createTeam");
  return { message: "Team Created", teamId: teamId.id };
}

export async function addPokemonToTeam(teamId: number, pokemonId: number) {
  if (typeof teamId !== "number" || teamId <= 0) {
    throw new ConflictError("Invalid teamId");
  }

  if (typeof pokemonId !== "number" || pokemonId <= 0) {
    throw new ConflictError("Invalid pokemonId");
  }

  // First, check if the teamPokemon exists
  try {
    await TeamPokemonService.getTeamPokemonById(pokemonId);
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw new NotFoundError(
        `Pokemon with id ${pokemonId} not found in teamPokemon table`
      );
    }
    throw error;
  }

  const result = await TeamModel.TeamModel.addPokemonToTeam(teamId, pokemonId);

  if (result.error === "TeamNotFound") {
    throw new NotFoundError(`Team with id ${teamId} not found`);
  }

  if (result.error === "TeamFull") {
    throw new ConflictError("Cannot add more Pokemon. Team is already full");
  }

  logger.info("Called TeamModel.addPokemonToTeam");
  return { message: "Pokemon added to team" };
}

export async function getTeamById(teamId: number) {
  if (typeof teamId !== "number" || teamId <= 0) {
    throw new ConflictError("Invalid teamId");
  }

  const team = await TeamModel.TeamModel.getTeamById(teamId);
  logger.info("Called TeamModel.getTeamById");

  if (!team) {
    throw new NotFoundError(`Team with id ${teamId} not found`);
  }

  return team;
}

export async function getTeamsByUserId(userId: number) {
  if (!userId) {
    throw new BadRequestError("User ID is required");
  }

  const teams = await TeamModel.TeamModel.getTeamsByUserId(userId);

  return teams;
}
