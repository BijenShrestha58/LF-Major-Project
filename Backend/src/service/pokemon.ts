import axios from "axios";
import { POKEAPI_BASE_URL } from "../config";
import * as PokemonModel from "../model/pokemon";
import { NotFoundError } from "../error/NotFoundError";

/**
 * Fetches all Pokémon with pagination and sorting options.
 *
 * @param {number} limit - The number of Pokémon to fetch.
 * @param {number} offset - The number of Pokémon to skip before starting to fetch.
 * @param {string} sortBy - The field by which to sort the Pokémon.
 * @returns {Promise<Object[]>} A promise that resolves to an array of Pokémon objects.
 * @throws {Error} Throws an error if the fetch operation fails.
 */
export async function getAllPokemon(
  limit: number,
  offset: number,
  sortBy: string
) {
  try {
    const sortField = (() => {
      switch (sortBy) {
        case "id":
          return "id";
        case "name":
          return "name";
        case "hp":
          return "hp";
        case "atk":
          return "attack";
        case "def":
          return "defense";
        case "spAtk":
          return "special_attack";
        case "spDef":
          return "special_defense";
        case "spe":
          return "speed";
        default:
          return "id";
      }
    })();

    const data = await PokemonModel.PokemonModel.getAllPokemon(
      limit,
      offset,
      sortField
    );
    return data;
  } catch (error) {
    throw error;
  }
}

/**
 * Fetches the details of a Pokémon by its ID.
 *
 * @param {string} id - The ID of the Pokémon to fetch.
 * @returns {Promise<Object>} A promise that resolves to the details of the Pokémon.
 * @throws {Error} Throws an error if the fetch operation fails.
 */
export async function getPokemonDetails(id: string) {
  const data = await PokemonModel.PokemonModel.getPokemonDetails(id);
  if (!data) {
    throw new NotFoundError(`Pokemon with id ${id} does not exist`);
  }
  return data;
}
