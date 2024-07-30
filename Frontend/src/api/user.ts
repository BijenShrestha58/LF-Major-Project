import { GetRequest } from "../plugins/https";

export const APIGetMyDetails = () => {
  return GetRequest("/user/me");
};
