import { GetRequest, PostRequest, PutRequest } from "../plugins/https";

export async function APICreateTeam(data: { userId: number; name: string }) {
  return PostRequest("/team", data);
}

export async function APIGetTeamsByUserId(userId: number) {
  return GetRequest(`/team/user/${userId}`);
}

export async function APIAddPokemonToTeam(data: {
  teamId: number;
  pokemonId: number;
}) {
  return PutRequest("/team/add-pokemon", data);
}

export async function APIGetTeamById(id: number) {
  return GetRequest(`/team/${id}`);
}
