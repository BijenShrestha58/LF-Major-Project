import * as TeamModel from "../model/team";
import * as TeamPokemonService from "./teamPokemon";
import { ConflictError } from "../error/ConflictError";
import { NotFoundError } from "../error/NotFoundError";
import loggerWithNameSpace from "../utils/logger";
import { BadRequestError } from "../error/BadRequestError";

const logger = loggerWithNameSpace("TeamService");

/**
 * Creates a new team for a user.
 *
 * @param {number} userId - The ID of the user creating the team.
 * @param {string} name - The name of the team.
 * @returns {Promise<Object>} A promise that resolves to an object containing a success message and the ID of the created team.
 * @throws {ConflictError} If the userId is not a valid number or is less than or equal to 0.
 */
export async function createTeam(userId: number, name: string) {
  if (typeof userId !== "number" || userId <= 0) {
    throw new ConflictError("Invalid userId");
  }

  const teamId = await TeamModel.TeamModel.createTeam(userId, name);
  logger.info("Called TeamModel.createTeam");
  return { message: "Team Created", teamId: teamId.id };
}

/**
 * Adds a Pokémon to a team.
 *
 * @param {number} teamId - The ID of the team to which the Pokémon will be added.
 * @param {number} pokemonId - The ID of the Pokémon to add to the team.
 * @returns {Promise<Object>} A promise that resolves to an object containing a success message.
 * @throws {ConflictError} If the teamId or pokemonId is not a valid number or is less than or equal to 0.
 * @throws {NotFoundError} If the Pokémon is not found in the teamPokemon table or if the team is not found.
 * @throws {ConflictError} If the team is already full.
 */
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

/**
 * Fetches a team by its ID.
 *
 * @param {number} teamId - The ID of the team to fetch.
 * @returns {Promise<Object>} A promise that resolves to the team object if found.
 * @throws {ConflictError} If the teamId is not a valid number or is less than or equal to 0.
 * @throws {NotFoundError} If no team is found with the provided ID.
 */
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

/**
 * Fetches all teams associated with a specific user.
 *
 * @param {number} userId - The ID of the user whose teams are to be fetched.
 * @returns {Promise<Object[]>} A promise that resolves to an array of team objects.
 * @throws {BadRequestError} If the userId is not provided.
 */
export async function getTeamsByUserId(userId: number) {
  if (!userId) {
    throw new BadRequestError("User ID is required");
  }

  const teams = await TeamModel.TeamModel.getTeamsByUserId(userId);

  return teams;
}
