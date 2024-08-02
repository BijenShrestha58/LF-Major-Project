import { APIGetPokemon } from "../api/pokemon";
import {
  APIAddPokemonToTeam,
  APICreateTeam,
  APIGetTeamsByUserId,
  APIGetTeamById,
} from "../api/team";
import {
  APICreateTeamPokemon,
  APIGetAvailableMovesByTeamPokemonId,
  APIGetPokemonImageByTeamPokemonId,
} from "../api/teamPokemon";
import { SORT_OPTIONS } from "../utils/constants/enums";
import { getUser } from "../utils/helpers/getUser";
import { IPokemon } from "../utils/interfaces/pokemon.interface";
import { ITeam } from "../utils/interfaces/team.interface";

export class TeamBuilder {
  static currentPage: number = 1;
  static limit: number = 10;
  static count: number = 151; // total number of pokemon
  static currentTeam: number = 0; // stores id of team being edited
  static currentTeamName: string = "";
  static sortBy: SORT_OPTIONS = SORT_OPTIONS.ID;

  static async getPokemon(limit = 10, offset = 0, sortBy = SORT_OPTIONS.ID) {
    try {
      const data = await APIGetPokemon(limit, offset, sortBy);

      const pokemonTableBody = document.getElementById("pokemonTableBody");

      if (!pokemonTableBody) {
        return;
      }

      // Clear the table body for new data
      pokemonTableBody.innerHTML = "";

      data.data.forEach((pokemon: IPokemon) => {
        const pokemonRow = document.createElement("tr");
        pokemonRow.className =
          "bg-white hover:bg-gray-100 hover:cursor-pointer";
        pokemonRow.innerHTML = `
          <td class="border px-4 py-2 capitalize flex items-center flex-col"><img src=${pokemon.frontSprite} alt="${pokemon.name}" class="w-10 h-10">${pokemon.name}</td>
          <td class="border px-4 py-2 text-center capitalize">${pokemon.type1}</td> 
          <td class="border px-4 py-2 text-center capitalize">${pokemon.type2}</td> 
          <td class="border px-4 py-2 text-center">${pokemon.hp}</td> 
          <td class="border px-4 py-2 text-center">${pokemon.attack}</td> 
          <td class="border px-4 py-2 text-center">${pokemon.defense}</td> 
          <td class="border px-4 py-2 text-center">${pokemon.specialAttack}</td> 
          <td class="border px-4 py-2 text-center">${pokemon.specialDefense}</td> 
          <td class="border px-4 py-2 text-center">${pokemon.speed}</td> 
        `;

        pokemonRow.addEventListener("click", async () => {
          if (this.currentTeam <= 0) {
            window.alert("Select a team or make one first!");
            return;
          }
          const teamPokemonId = await this.createTeamPokemon(pokemon.id);
          await this.addPokemonToTeam(this.currentTeam, teamPokemonId.id);
          this.drawSelectedPokemon();
        });

        pokemonTableBody.appendChild(pokemonRow);
      });
    } catch (error) {
      console.error("Error fetching Pokémon:", error);
    }
  }

  static init = () => {
    const prevPageButton = document.getElementById(
      "prevPage"
    ) as HTMLButtonElement;

    const nextPageButton = document.getElementById(
      "nextPage"
    ) as HTMLButtonElement;

    const addTeamBtn = document.getElementById(
      "addTeamBtn"
    ) as HTMLButtonElement;

    const teamContainer = document.getElementById("teamContainer");

    const teamNameInput = document.getElementById(
      "teamNameInput"
    ) as HTMLInputElement;

    const teamNameContainer = document.getElementById(
      "teamName"
    ) as HTMLElement;

    const sortOptions = document.getElementById("sortOptions");

    sortOptions?.addEventListener("change", async (event) => {
      const selectElement = event.target as HTMLSelectElement;

      const value = selectElement.value;

      // Check if the selected value is a valid enum value
      if (Object.values(SORT_OPTIONS).includes(value as SORT_OPTIONS)) {
        TeamBuilder.sortBy = value as SORT_OPTIONS;
      } else {
        console.error("Invalid sort option selected");
      }

      try {
        TeamBuilder.fetchAndDisplayPokemon();
      } catch (error) {
        console.error("Error fetching sorted data:", error);
      }
    });

    teamNameInput?.addEventListener("input", function () {
      TeamBuilder.currentTeamName = this.value;
    });

    addTeamBtn?.addEventListener("click", async function () {
      if (!teamNameInput.value) {
        window.alert("Please enter a team name.");
        return;
      }
      teamNameContainer.innerHTML = TeamBuilder.currentTeamName || "Team";
      teamContainer?.classList.remove("hidden");

      try {
        const res = await TeamBuilder.createTeam();
        TeamBuilder.currentTeam = res?.data.teamId;
        TeamBuilder.currentTeamName = res?.data.name;
      } catch (e) {
        console.error("Error creating team", e);
      }
    });

    prevPageButton?.addEventListener("click", () => {
      if (TeamBuilder.currentPage > 1) {
        TeamBuilder.currentPage--;
        TeamBuilder.fetchAndDisplayPokemon();
        this.updatePaginationButtons(prevPageButton, nextPageButton);
      }
    });

    nextPageButton?.addEventListener("click", () => {
      if (TeamBuilder.currentPage < Math.ceil(this.count / this.limit)) {
        TeamBuilder.currentPage++;
        TeamBuilder.fetchAndDisplayPokemon();
        this.updatePaginationButtons(prevPageButton, nextPageButton);
      }
    });

    // Fetch and display user teams on initial load
    TeamBuilder.fetchAndDisplayTeams();

    TeamBuilder.fetchAndDisplayPokemon();

    this.updatePaginationButtons(prevPageButton, nextPageButton);
  };

  static fetchAndDisplayPokemon() {
    const offset = (TeamBuilder.currentPage - 1) * TeamBuilder.limit;
    TeamBuilder.getPokemon(TeamBuilder.limit, offset, TeamBuilder.sortBy);
  }

  static updatePaginationButtons = (
    prevPageButton: HTMLButtonElement,
    nextPageButton: HTMLButtonElement
  ) => {
    // Hide the "Previous" button on the first page
    if (TeamBuilder.currentPage === 1) {
      prevPageButton.style.display = "none";
    } else {
      prevPageButton.style.display = "inline-block";
    }

    // Hide the "Next" button on the last page
    if (
      TeamBuilder.currentPage ===
      Math.ceil(TeamBuilder.count / TeamBuilder.limit)
    ) {
      nextPageButton.style.display = "none";
    } else {
      nextPageButton.style.display = "inline-block";
    }
  };

  static createTeamPokemon = async (id: number) => {
    try {
      const res = await APICreateTeamPokemon({ pokemonId: id });
      window.alert(res.data.message);
      return res.data.data;
    } catch (e) {
      console.error("Error creating team pokemon");
    }
  };

  static addPokemonToTeam = async (teamId: number, pokemonId: number) => {
    try {
      const res = await APIAddPokemonToTeam({
        teamId: teamId,
        pokemonId: pokemonId,
      });
      window.alert(res.data.message);
      return res.data;
    } catch (e) {
      console.error("Error adding pokemon to team");
    }
  };

  static async fetchAndDisplayTeams() {
    try {
      const user = getUser();
      const res = await APIGetTeamsByUserId(user.id);
      const data = res.data;
      const teamTabs = document.getElementById("teamTabs");

      if (!teamTabs) {
        return;
      }

      // Clear previous teams
      teamTabs.innerHTML = "";

      data.forEach((team: ITeam) => {
        const teamTab = document.createElement("button");
        teamTab.className =
          "px-4 py-2 bg-blue-500 text-white rounded mr-2 focus:outline-none";
        teamTab.textContent = `${team.name}`;
        teamTab.addEventListener("click", async () => {
          TeamBuilder.currentTeam = team.id;
          TeamBuilder.currentTeamName = team.name;
          this.drawSelectedPokemon();
        });

        teamTabs.appendChild(teamTab);
      });
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  }

  static async createTeam() {
    const user = getUser();
    try {
      const res = await APICreateTeam({
        userId: user.id,
        name: TeamBuilder.currentTeamName,
      });
      window.alert(res.data.message);
      TeamBuilder.fetchAndDisplayTeams();
      return res;
    } catch (e) {
      console.error("Error creating team", e);
    }
  }

  static async getTeamById(id: number) {
    try {
      const team = await APIGetTeamById(id);
      return team;
    } catch (e) {
      console.error("Cannot get team");
    }
  }

  static async showPokemonInTab(teamData: ITeam) {
    console.log(teamData);
    for (let i = 1; i <= 6; i++) {
      const pokemonId = teamData[`teamPokemon${i}` as keyof ITeam] as number;
      let imageElement = document.getElementById(
        `teamPokemon${i}`
      ) as HTMLImageElement;
      if (pokemonId) {
        const imageUrl = await TeamBuilder.getPokemonImageFromTeamPokemonId(
          pokemonId
        );
        imageElement.src = imageUrl;
      } else {
        imageElement.src = "";
        imageElement.alt = "";
      }
      imageElement.parentElement?.addEventListener("click", () => {
        if (pokemonId) {
          TeamBuilder.openMoveSelectModal(pokemonId);
        }
      });
    }
  }

  static openMoveSelectModal(pokemonId: number) {
    const modal = document.getElementById("moveSelectModal");
    const modalContent = document.getElementById("modalContent");

    if (modal && modalContent) {
      modal.classList.remove("hidden");
      TeamBuilder.getAvailableMovesByTeamPokemonId(pokemonId);
      modalContent.innerHTML = `Move selection for Pokémon ID: ${pokemonId}`;
    }

    // Close modal when clicking on <button> (x) element
    const closeModal = document.getElementById("closeModal");
    closeModal?.addEventListener("click", () => {
      modal?.classList.add("hidden");
    });

    // Close modal when clicking outside of the modal content
    window.addEventListener("click", (event) => {
      if (event.target === modal) {
        modal?.classList.add("hidden");
      }
    });
  }

  static async getAvailableMovesByTeamPokemonId(pokemonId: number) {
    const res = await APIGetAvailableMovesByTeamPokemonId(pokemonId);
    console.log(res.data);
    return res.data;
  }

  static async getPokemonImageFromTeamPokemonId(teamPokemonId: number) {
    const res = await APIGetPokemonImageByTeamPokemonId(teamPokemonId);
    return res.data.frontSprite;
  }

  static async drawSelectedPokemon() {
    const teamContainer = document.getElementById("teamContainer");
    const teamNameContainer = document.getElementById(
      "teamName"
    ) as HTMLElement;
    teamNameContainer.innerHTML = TeamBuilder.currentTeamName;

    if (teamContainer) {
      teamContainer.classList.remove("hidden");
    }

    const res = await TeamBuilder.getTeamById(TeamBuilder.currentTeam);
    const teamData = res?.data;
    TeamBuilder.showPokemonInTab(teamData);
  }
}
