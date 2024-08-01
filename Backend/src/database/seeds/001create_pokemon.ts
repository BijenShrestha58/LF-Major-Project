import axios from "axios";
import { Knex } from "knex";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const POKEAPI_BASE_URL = "https://pokeapi.co/api/v2";
const MAX_POKEMON = 151; // The number of Pokémon to fetch

async function fetchPokemonData() {
  const pokemonData = [];
  for (let id = 1; id <= MAX_POKEMON; id++) {
    const { data } = await axios.get(`${POKEAPI_BASE_URL}/pokemon/${id}`);
    pokemonData.push({
      id: data.id,
      name: data.name,
      type1: data.types[0]?.type.name ?? null,
      type2: data.types[1]?.type.name ?? null,
      hp: data.stats.find((stat) => stat.stat.name === "hp")?.base_stat ?? null,
      attack:
        data.stats.find((stat) => stat.stat.name === "attack")?.base_stat ??
        null,
      defense:
        data.stats.find((stat) => stat.stat.name === "defense")?.base_stat ??
        null,
      special_attack:
        data.stats.find((stat) => stat.stat.name === "special-attack")
          ?.base_stat ?? null,
      special_defense:
        data.stats.find((stat) => stat.stat.name === "special-defense")
          ?.base_stat ?? null,
      speed:
        data.stats.find((stat) => stat.stat.name === "speed")?.base_stat ??
        null,
      front_sprite: data.sprites.front_default,
      back_sprite: data.sprites.back_default,
    });
  }
  return pokemonData;
}

export async function seed(knex: Knex): Promise<void> {
  try {
    const pokemonData = await fetchPokemonData();
    await knex("pokemon").del(); // Clear existing entries
    await knex("pokemon").insert(pokemonData); // Insert new entries
  } catch (error) {
    console.error("Error seeding Pokémon data:", error);
  }
}
