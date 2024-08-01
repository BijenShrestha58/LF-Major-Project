import { BaseModel } from "./base";

export class TeamModel extends BaseModel {
  static async createTeam(userId: number, name: string) {
    const [id] = await this.queryBuilder()
      .insert({ user_id: userId, name: name })
      .into("team")
      .returning("id");
    return id;
  }

  static async addPokemonToTeam(teamId: number, pokemonId: number) {
    // First, check if the pokemonId exists in the teamPokemon table
    const pokemonExists = await this.queryBuilder()
      .select("id")
      .from("team_pokemon")
      .where("id", pokemonId)
      .first();

    if (!pokemonExists) {
      return { error: "PokemonNotFound" };
    }

    const team = await this.queryBuilder()
      .select("*")
      .from("team")
      .where("id", teamId)
      .first();

    if (!team) {
      return { error: "TeamNotFound" };
    }

    for (let i = 1; i <= 6; i++) {
      const column = `teamPokemon${i}`;
      if (!team[column]) {
        await this.queryBuilder()
          .update({ [column]: pokemonId })
          .where("id", teamId)
          .into("team");
        return { success: true };
      }
    }

    return { error: "TeamFull" };
  }

  static async getTeamById(teamId: number) {
    return this.queryBuilder()
      .select("*")
      .from("team")
      .where("id", teamId)
      .first();
  }

  static async getTeamsByUserId(userId: number) {
    return await this.queryBuilder().select("*").from("team").where({ userId });
  }
}
