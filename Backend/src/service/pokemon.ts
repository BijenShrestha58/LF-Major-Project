import axios from "axios";
import { POKEAPI_BASE_URL } from "../config";
import * as PokemonModel from "../model/pokemon";

export async function getAllPokemon(limit: number, offset: number) {
  try {
    const data = await PokemonModel.PokemonModel.getAllPokemon(limit, offset);
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
