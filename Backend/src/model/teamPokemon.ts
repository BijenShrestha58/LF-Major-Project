import { BaseModel } from "./base";

export class TeamPokemonModel extends BaseModel {
  static async createTeamPokemon(pokemonId: number) {
    const [id] = await this.queryBuilder()
      .insert({ pokemon_id: pokemonId })
      .into("team_pokemon")
      .returning("id");

    return id;
  }

  static async addMovesToTeamPokemon(
    teamPokemonId: number,
    moves: { move1?: number; move2?: number; move3?: number; move4?: number }
  ) {
    await this.queryBuilder()
      .update(moves)
      .where({ id: teamPokemonId })
      .into("team_pokemon");
  }

  static async getTeamPokemonById(teamPokemonId: number) {
    return this.queryBuilder()
      .select("*")
      .from("team_pokemon")
      .where("id", teamPokemonId)
      .first();
  }

  static async getPokemonImageByTeamPokemonId(id: number) {
    return await this.queryBuilder()
      .select("pokemon.front_sprite")
      .from("team_pokemon")
      .join("pokemon", "team_pokemon.pokemon_id", "pokemon.id")
      .where("team_pokemon.id", id)
      .first();
  }
}
