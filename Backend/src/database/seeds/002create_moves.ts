import axios from "axios";
import { Knex } from "knex";

const POKEAPI_BASE_URL = "https://pokeapi.co/api/v2";
const GEN_1_MOVE_COUNT = 165; // Approximate number of Gen 1 moves

async function fetchMoveData(id: number) {
  try {
    const response = await axios.get(`${POKEAPI_BASE_URL}/move/${id}`);
    const data = response.data;

    // Extract relevant fields
    const move = {
      id: data.id,
      name: data.name,
      power: data.power,
      accuracy: data.accuracy,
      type: data.type.name,
      move_damage_class: data.damage_class.name,
      pp: data.pp,
      priority: data.priority,
      stat_change:
        data.stat_changes.length > 0 ? data.stat_changes[0].stat.name : null,
      stat_change_value:
        data.stat_changes.length > 0 ? data.stat_changes[0].change : 0,
    };

    return move;
  } catch (error) {
    console.error(`Error fetching move data for ID ${id}:`, error);
    return null;
  }
}

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("move").del();

  const movePromises = [];
  for (let id = 1; id <= GEN_1_MOVE_COUNT; id++) {
    movePromises.push(fetchMoveData(id));
  }

  const moves = await Promise.all(movePromises);

  // Filter out any null values from failed requests
  const validMoves = moves.filter((move) => move !== null);

  // Insert fetched moves into the database
  if (validMoves.length > 0) {
    await knex("move").insert(validMoves);
    console.log("Successfully seeded moves table.");
  } else {
    console.error("No moves data available to seed.");
  }
}
