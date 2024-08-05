import { IUser } from "../interface/user";
import { BaseModel } from "./base";

export class UserModel extends BaseModel {
  static async getUsers() {
    return await this.queryBuilder().select("*").from("user");
  }

  static async createUser(user: IUser) {
    await this.queryBuilder().insert(user).table("user");
  }

  static async getUserByUsername(username: string) {
    const result = await this.queryBuilder()
      .select("*")
      .from("user")
      .where("user.username", username)
      .first();
    return result;
  }

  static async updateUser(id: string, body: IUser) {
    const result = await this.queryBuilder()
      .update(body)
      .table("user")
      .where({ id });
    return result;
  }

  static async deleteUser(id: string) {
    const result = await this.queryBuilder().from("user").where({ id }).del();
    return result;
  }

  static async getUserById(id: string) {
    const result = await this.queryBuilder()
      .select("id", "username", "role")
      .from("user")
      .where({ id })
      .first();
    return result;
  }
}
