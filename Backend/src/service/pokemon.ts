import axios from "axios";
import { POKEAPI_BASE_URL } from "../config";
import * as PokemonModel from "../model/pokemon";

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

export async function getPokemonDetails(id: string) {
  try {
    const response = await axios.get(`${POKEAPI_BASE_URL}/pokemon/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching Pokémon details:", error);
    throw error;
  }
}
