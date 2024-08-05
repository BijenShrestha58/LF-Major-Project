import { Socket, io } from "socket.io-client";
import { getUser } from "../utils/helpers/getUser";
import { APIGetTeamById } from "../api/team";
import { APIGetTeamPokemonById } from "../api/teamPokemon";
import { APIGetPokemonById } from "../api/pokemon";
import { APIGetMoveById } from "../api/move";

export class Battle {
  static socket: Socket = io("http://localhost:8000");

  static init = async () => {
    const user = getUser();
    const room = localStorage.getItem("room");

    this.socket.emit("joinedRoom", { room, user });

    this.socket.on("roomFullError", (msg) => {
      alert(msg);
    });

    this.socket.on("hello", (x) => {
      alert(x);
    });

    const teamId = localStorage.getItem("teamId");

    if (!teamId) {
      console.error("No team ID found");
      return;
    }

    try {
      const team = await this.getTeamById(parseInt(teamId));
      console.log("Team:", team);

      // Fetch Pokémon details for the team
      await this.loadPokemonDetails(team);
    } catch (error) {
      console.error("Error initializing Battle:", error);
    }
  };

  static getTeamById = async (teamId: number) => {
    const res = await APIGetTeamById(teamId);
    return res.data;
  };

  static loadPokemonDetails = async (team: any) => {
    const pokemonIds = [
      team.teamPokemon1,
      team.teamPokemon2,
      team.teamPokemon3,
      team.teamPokemon4,
      team.teamPokemon5,
      team.teamPokemon6,
    ];

    await Battle.displayActivePokemon(pokemonIds[0]);

    for (const pokemonId of pokemonIds) {
      if (pokemonId) {
        const teamPokemon = await this.getTeamPokemonById(parseInt(pokemonId));
        Battle.displayPokemonName(teamPokemon.pokemonId);
      }
    }
  };

  static async displayPokemonName(id: number) {
    const pokemonDetails = await Battle.getPokemonById(id);
    const pokemonContainer = document.getElementById("pokemon-container");

    if (!pokemonContainer) return;

    // Create button for the Pokémon
    const button = document.createElement("button");
    button.className = "bg-gray-200 p-2 rounded text-xs capitalize";
    button.textContent = pokemonDetails.name;
    pokemonContainer.appendChild(button);
  }

  static async displayActivePokemon(id: number) {
    const activeTeamPokemon = await this.getTeamPokemonById(id); //response is teamPokemon data
    const activePokemon = await this.getPokemonById(
      activeTeamPokemon.pokemonId
    );
    const activePokemonImage = document.getElementById(
      "active-pokemon1"
    ) as HTMLImageElement;
    console.log(activePokemon);
    const activePokemonNameContainer = document.getElementById(
      "active-pokemon-name"
    );
    if (activePokemonNameContainer)
      activePokemonNameContainer.innerHTML = activePokemon.name;

    if (activePokemonImage) activePokemonImage.src = activePokemon.backSprite;

    this.getActivePokemonMoves(activeTeamPokemon);
  }

  static async getPokemonById(id: number) {
    try {
      const res = await APIGetPokemonById(id);
      return res.data;
    } catch (e) {
      console.error(`Error fetching Pokémon details for ID ${id}:`, e);
    }
  }

  static async getTeamPokemonById(id: number) {
    try {
      const res = await APIGetTeamPokemonById(id);
      return res.data;
    } catch (e) {
      console.error(`Error fetching team pokemon for ID ${id}`);
    }
  }

  static async getActivePokemonMoves(activeTeamPokemon: any) {
    const moveContainer = document.getElementById("move-container");
    for (let i = 1; i <= 4; i++) {
      if (activeTeamPokemon[`move${i}`]) {
        const moveDetails = await this.getMoveById(
          activeTeamPokemon[`move${i}`]
        );
        const button = document.createElement("button");
        button.className = `p-2 rounded bg-gray-200 capitalize`;
        button.id = `attack${i}`;
        button.textContent = moveDetails.name;
        button.addEventListener("click", () => {
          this.handleMoveSelection(moveDetails);
        });
        moveContainer?.appendChild(button);
      }
    }
  }

  static async getMoveById(id: number) {
    try {
      const res = await APIGetMoveById(id);
      return res.data;
    } catch (e) {
      console.error(`Move with id ${id} not found`, e);
    }
  }

  static handleMoveSelection(moveDetails: any) {
    console.log(`Selected move: ${moveDetails.name}`);
    // Emit move to the server
    this.socket.emit("selectMove", {
      moveId: moveDetails.id,
      moveName: moveDetails.name,
    });

    // Optionally, disable buttons to prevent multiple clicks
    const moveContainer = document.getElementById("move-container");
    if (moveContainer) {
      const buttons = moveContainer.querySelectorAll("button");
      buttons.forEach((button) => button.setAttribute("disabled", "true"));
    }
  }
}
