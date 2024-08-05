import { BaseModel } from "./base";

export class BattleModel extends BaseModel {
  static async createBattle(userId: number, teamId: number) {
    const [id] = await this.queryBuilder()
      .insert({ user_id: userId, team_id: teamId })
      .into("battle")
      .returning("id");
    return id;
  }

  static async getAllBattleData(teamPokemonId: number) {
    const result = await this.queryBuilder()
      .select(
        "team_pokemon.*",
        "pokemon.name as pokemon_name",
        "pokemon.type1",
        "pokemon.type2",
        "pokemon.hp",
        "pokemon.attack",
        "pokemon.defense",
        "pokemon.special_attack",
        "pokemon.special_defense",
        "pokemon.speed",
        "move1.id as move1_id",
        "move1.name as move1_name",
        "move1.power as move1_power",
        "move1.type as move1_type",
        "move1.pp as move1_pp",
        "move1.accuracy as move1_accuracy",
        "move2.id as move2_id",
        "move2.name as move2_name",
        "move2.power as move2_power",
        "move2.type as move2_type",
        "move2.pp as move2_pp",
        "move2.accuracy as move2_accuracy",
        "move3.id as move3_id",
        "move3.name as move3_name",
        "move3.power as move3_power",
        "move3.type as move3_type",
        "move3.pp as move3_pp",
        "move3.accuracy as move3_accuracy",
        "move4.id as move4_id",
        "move4.name as move4_name",
        "move4.power as move4_power",
        "move4.type as move4_type",
        "move4.pp as move4_pp",
        "move4.accuracy as move4_accuracy"
      )
      .from("team_pokemon")
      .join("pokemon", "team_pokemon.pokemon_id", "pokemon.id")
      .leftJoin("move as move1", "team_pokemon.move1", "move1.id")
      .leftJoin("move as move2", "team_pokemon.move2", "move2.id")
      .leftJoin("move as move3", "team_pokemon.move3", "move3.id")
      .leftJoin("move as move4", "team_pokemon.move4", "move4.id")
      .where("team_pokemon.id", teamPokemonId);
    return result;
  }
}
