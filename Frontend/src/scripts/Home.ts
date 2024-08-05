import { APIGetTeamsByUserId } from "../api/team";
import { APIGetPokemonImageByTeamPokemonId } from "../api/teamPokemon";
import { getUser } from "../utils/helpers/getUser";
import { ITeam } from "../utils/interfaces/team.interface";

export class HomeActions {
  static teamData: ITeam[] = []; // Store team data here
  static selectedTeamId: number = 0;

  static init = async () => {
    const user = getUser();
    if (user) {
      await this.loadTeamsAndDisplayNames(user.id);
    }
    const roomInputEl = document.getElementById(
      "room-input"
    ) as HTMLInputElement;

    const logOutButton = document.getElementById(
      "logOutButton"
    ) as HTMLAnchorElement;

    const joinRoom = document.getElementById("join-room");

    logOutButton?.addEventListener("click", () => {
      localStorage.clear();
      window.location.hash = "#/login";
    });

    joinRoom?.addEventListener("click", () => {
      localStorage.setItem("room", roomInputEl?.value);

      if (roomInputEl.value) {
        alert(`Joined room ${roomInputEl.value}`);
      } else {
        alert("Room left");
      }
    });
    const battleButton = document.getElementById("battle-button");
    battleButton?.addEventListener("click", this.handleBattleButtonClick);
  };

  static handleBattleButtonClick = () => {
    if (!localStorage.getItem("room")) {
      alert("No room selected");
      return;
    }
    if (this.selectedTeamId !== null) {
      localStorage.setItem("teamId", this.selectedTeamId.toString());
      const route = "#/battle";
      window.location.hash = route;
    } else {
      console.error("No team selected");
    }
  };

  static async getTeamsByUserId(userId: number) {
    const res = await APIGetTeamsByUserId(userId);
    return res.data;
  }

  static async loadTeamsAndDisplayNames(id: number) {
    const teamSelect = document.getElementById("team-select");

    if (!teamSelect) return;

    // Fetch the teams and store the data
    this.teamData = await this.getTeamsByUserId(id);
    if (!this.teamData[0]) return;
    await this.displayPokemonImages(this.teamData[0]);
    this.selectedTeamId = this.teamData[0].id;
    // Populate the select options
    this.teamData.forEach((team: ITeam, index: number) => {
      const optionEl = document.createElement("option");
      optionEl.innerHTML = team.name;
      optionEl.value = index.toString(); // Store the index as the value to select from teamData array
      optionEl.classList.add("bg-gray-900");
      teamSelect.appendChild(optionEl);
    });

    teamSelect.addEventListener("change", this.handleTeamSelection);
  }

  static handleTeamSelection = async (event: Event) => {
    const selectElement = event.target as HTMLSelectElement;
    const selectedIndex = selectElement.value;

    if (selectedIndex) {
      // Retrieve the selected team data using index
      const selectedTeam = this.teamData[parseInt(selectedIndex)];
      this.selectedTeamId = selectedTeam.id;
      if (selectedTeam) await this.displayPokemonImages(selectedTeam);
    }
  };

  static async displayPokemonImages(team: ITeam) {
    for (let i = 1; i <= 6; i++) {
      if (!team) {
        return;
      }
      const pokemonId = team[`teamPokemon${i}` as keyof ITeam] as number;

      const imageElement = document.getElementById(
        `teamPokemon${i}`
      ) as HTMLImageElement;

      if (imageElement) {
        if (pokemonId) {
          try {
            const res = await HomeActions.getPokemonImageFromTeamPokemonId(
              pokemonId
            );
            const imageUrl = res.frontSprite;
            const name = res.name;

            imageElement.src = imageUrl;
            imageElement.alt = name;
          } catch (error) {
            console.error(`Error loading Pokémon data for slot ${i}:`, error);
            imageElement.src = "";
            imageElement.alt = "Error loading Pokémon";
          }
        } else {
          imageElement.src = "";
          imageElement.alt = "";
        }
      }
    }
  }
  static async getPokemonImageFromTeamPokemonId(teamPokemonId: number) {
    try {
      const res = await APIGetPokemonImageByTeamPokemonId(teamPokemonId);
      return res.data;
    } catch (e) {
      console.error("Error getting image", e);
    }
  }
}
