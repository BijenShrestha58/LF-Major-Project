import axios from "axios";
import { POKEAPI_BASE_URL } from "../config";
import { BadRequestError } from "../error/BadRequestError";
import { ConflictError } from "../error/ConflictError";
import { NotFoundError } from "../error/NotFoundError";
import loggerWithNameSpace from "../utils/logger";
import * as TeamPokemonModel from "../model/teamPokemon";

const logger = loggerWithNameSpace("teamPokemonService");

/**
 * Creates a new team Pokémon entry.
 *
 * @param {number} pokemonId - The ID of the Pokémon to create in the team.
 * @returns {Promise<Object>} A promise that resolves to an object containing a success message and the ID of the created team Pokémon.
 */
export async function createTeamPokemon(pokemonId: number) {
  const id = await TeamPokemonModel.TeamPokemonModel.createTeamPokemon(
    pokemonId
  );
  logger.info("Called createTeamPokemon");
  return { message: "teamPokemon Created", data: id };
}

/**
 * Adds moves to a team Pokémon.
 *
 * @param {number} teamPokemonId - The ID of the team Pokémon to which moves will be added.
 * @param {Object} moves - An object containing move IDs to add to the team Pokémon.
 * @param {number} [moves.move1] - The ID of the first move.
 * @param {number} [moves.move2] - The ID of the second move.
 * @param {number} [moves.move3] - The ID of the third move.
 * @param {number} [moves.move4] - The ID of the fourth move.
 * @returns {Promise<Object>} A promise that resolves to an object containing a success message.
 */
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

/**
 * Fetches a team Pokémon by its ID.
 *
 * @param {number} teamPokemonId - The ID of the team Pokémon to fetch.
 * @returns {Promise<Object>} A promise that resolves to the team Pokémon object if found.
 * @throws {ConflictError} If the teamPokemonId is not a valid number or is less than or equal to 0.
 * @throws {NotFoundError} If no team Pokémon is found with the provided ID.
 */
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

/**
 * Fetches the Pokémon image associated with a team Pokémon by its ID.
 *
 * @param {number} id - The ID of the team Pokémon whose image is to be fetched.
 * @returns {Promise<Object>} A promise that resolves to the image data of the Pokémon.
 * @throws {BadRequestError} If the ID is not provided.
 */
export async function getPokemonImageByTeamPokemonId(id: number) {
  if (!id) {
    throw new BadRequestError("teamPokemonId is required");
  }

  const res =
    await TeamPokemonModel.TeamPokemonModel.getPokemonImageByTeamPokemonId(id);

  return res;
}

/**
 * Fetches all available moves for a Pokémon associated with a team Pokémon,
 * with pagination support.
 *
 * @param {number} id - The ID of the team Pokémon to fetch moves for.
 * @param {number} limit - The maximum number of moves to return.
 * @param {number} offset - The number of moves to skip before starting to return results.
 * @returns {Promise<Object>} A promise that resolves to an object containing the paginated list of move IDs and the total number of available moves.
 * @throws {BadRequestError} If the ID is not provided.
 * @throws {Error} Throws an error if fetching the Pokémon data fails.
 */
export async function getAllAvailableMoves(
  id: number,
  limit: number,
  offset: number
) {
  const totalNumberOfMoves = 165;
  if (!id) {
    throw new BadRequestError("teamPokemonId is required");
  }

  const teamPokemon = await getTeamPokemonById(id);
  logger.info("Called getTeamPokemonById");

  const res = await axios.get(
    `${POKEAPI_BASE_URL}/pokemon/${teamPokemon.pokemonId}`
  );

  const moveIdArray = res.data.moves.map((move) => {
    const parts = move.move.url.split("/");
    return parts[parts.length - 2];
  });

  const filteredMoveIdArray = moveIdArray.filter(
    (moveId) => moveId <= totalNumberOfMoves
  );

  const startIndex = offset;
  const endIndex = startIndex + limit;
  const paginatedData = filteredMoveIdArray.slice(startIndex, endIndex);

  return { data: paginatedData, total: filteredMoveIdArray.length };
}
