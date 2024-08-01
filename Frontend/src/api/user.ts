import { GetRequest, PostRequest } from "../plugins/https";
import { ICreateUser } from "../utils/interfaces/user.interface";

export const APIGetMyDetails = () => {
  return GetRequest("/user/me");
};

export const APICreateUser = (user: ICreateUser) => {
  return PostRequest("/user", user);
};
