import { ROLE } from "../enum/role";

export interface IUser {
  id: string;
  username: string;
  password: string;
  role: ROLE;
}
