import { GetRequest, PostRequest, PutRequest } from "../plugins/https";

export const APICreateTeamPokemon = (data: { pokemonId: number }) => {
  return PostRequest("/team-pokemon", data);
};

export const APIGetPokemonImageByTeamPokemonId = (id: number) => {
  return GetRequest(`/team-pokemon/image/${id}`);
};

export const APIGetAvailableMovesByTeamPokemonId = (
  id: number,
  limit: number,
  offset: number
) => {
  return GetRequest(`/team-pokemon/move/${id}`, { params: { limit, offset } });
};

export const APIAddMoves = (data: { teamPokemonId: number; moves: {} }) => {
  return PutRequest("/team-pokemon/add-moves", data);
};

export const APIGetTeamPokemonById = (id: number) => {
  return GetRequest(`/team-pokemon/${id}`);
};
