import { GetRequest } from "../plugins/https";

export const APIGetPokemon = (limit: number = 151, offset: number = 0) => {
  return GetRequest("/pokemon", {
    params: {
      limit,
      offset,
    },
  });
};
