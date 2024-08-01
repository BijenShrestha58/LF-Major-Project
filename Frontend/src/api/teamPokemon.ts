import { GetRequest, PostRequest } from "../plugins/https";

export const APICreateTeamPokemon = (data: { pokemonId: number }) => {
  return PostRequest("/team-pokemon", data);
};

export const APIGetPokemonImageByTeamPokemonId = (id: number) => {
  return GetRequest(`/team-pokemon/image/${id}`);
};
