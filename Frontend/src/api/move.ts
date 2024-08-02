import { GetRequest } from "../plugins/https";

export async function APIGetMoveById(id: number) {
  return GetRequest(`/move/${id}`);
}
