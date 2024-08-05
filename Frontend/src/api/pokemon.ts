import { GetRequest } from "../plugins/https";
import { SORT_OPTIONS } from "../utils/constants/enums";

export const APIGetPokemon = (
  limit: number = 10,
  offset: number = 0,
  sortBy: SORT_OPTIONS = SORT_OPTIONS.ID
) => {
  return GetRequest("/pokemon", {
    params: {
      limit,
      offset,
      sortBy,
    },
  });
};

export const APIGetPokemonById = (id: number) => {
  return GetRequest(`/pokemon/${id}`);
};
