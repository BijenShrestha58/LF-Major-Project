import { BaseModel } from "./base";

export class PokemonModel extends BaseModel {
  static async getAllPokemon(limit: number, offset: number, sortField: string) {
    const query = this.queryBuilder()
      .select("*")
      .from("pokemon")
      .limit(limit)
      .offset(offset);

    if (sortField === "id" || sortField === "name") {
      query.orderBy(sortField);
    } else {
      query.orderBy(sortField, "desc");
    }

    return await query;
  }

  static async getPokemonDetails(id: string) {
    const result = await this.queryBuilder()
      .select("*")
      .from("pokemon")
      .where({ id })
      .first();
    return result;
  }
}
