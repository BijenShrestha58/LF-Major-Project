import { PostRequest } from "../plugins/https";
import { ILoginUser, IRefreshToken } from "../utils/interfaces/auth.interface";

export const APIAuthenticateUser = (data: ILoginUser) => {
  return PostRequest("/auth/login", data);
};

export const APIRefresh = (data: IRefreshToken) => {
  return PostRequest("auth/refresh", data);
};
