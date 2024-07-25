import { IUser } from "../interface/user";
import { BaseModel } from "./base";

export class UserModel extends BaseModel {
  static async getUsers() {
    return await this.queryBuilder().select("*").from("user");
  }

  static async createUser(user: IUser) {
    console.log("before");
    await this.queryBuilder()
      .insert(user)
      .table("user")
      .then(() => console.log("after"));
  }

  static async getUserByUsername(username: string) {
    const result = await this.queryBuilder()
      .select("*")
      .from("user")
      .where("user.username", username);
    return result[0];
  }
}
