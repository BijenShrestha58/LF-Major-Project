import { BaseModel } from "./base";

export class MoveModel extends BaseModel {
  static async getMoveById(moveId: number) {
    return this.queryBuilder()
      .select("*")
      .from("move")
      .where("id", moveId)
      .first();
  }
}
