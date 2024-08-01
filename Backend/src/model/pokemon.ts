import { BaseModel } from "./base";

export class PokemonModel extends BaseModel {
  static async getAllPokemon(limit: number, offset: number) {
    return await this.queryBuilder()
      .select("*")
      .from("pokemon")
      .limit(limit)
      .offset(offset);
  }
}
