import { BaseModel } from "./base";

export class MoveModel extends BaseModel {
  static async getMoveById(moveId: number) {
    return this.queryBuilder()
      .select("*")
      .from("team")
      .where("id", moveId)
      .first();
  }
}
