import { ROLE } from "../constants/enums";

export interface ICreateUser {
  username: string;
  password: string;
  role: ROLE;
}
