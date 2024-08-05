import { APIGetMoveById } from "../api/move";
import {
  APIAddMoves,
  APIGetAvailableMovesByTeamPokemonId,
} from "../api/teamPokemon";

export default class MoveSelectModal {
  private modalElement: HTMLElement | null;
  private modalContent: HTMLElement | null;
  private closeButton: HTMLElement | null;
  private limit: number;
  private offset: number;
  private currentPage: number;
  private totalMoves: number;
  private pokemonId: number;
  private name: string;

  constructor(pokemonId: number, name: string) {
    this.modalElement = document.getElementById("moveSelectModal");
    this.modalContent = document.getElementById("modalContent");
    this.closeButton = document.getElementById("closeModal");
    //initial values for pagination
    this.limit = 10;
    this.offset = 0;
    this.currentPage = 1;
    this.totalMoves = 0;

    this.pokemonId = pokemonId;
    this.name = name;

    this.init();
  }

  private async init() {
    if (this.closeButton) {
      this.closeButton.addEventListener("click", () => this.hideModal());
    }

    window.addEventListener("click", (event) => {
      if (event.target === this.modalElement) {
        this.hideModal();
      }
    });

    await this.getMoveData();

    const saveButton = document.getElementById("saveMovesBtn");

    this.modalElement?.addEventListener("click", (event) => {
      const target = event.target as HTMLElement;
      if (target.id === "prevPageBtn") {
        this.goToPreviousPage();
      } else if (target.id === "nextPageBtn") {
        this.goToNextPage();
      }
    });
    if (saveButton) {
      saveButton.addEventListener("click", () => this.saveSelectedMoves());
    }
  }

  private async getMoveData() {
    const res = await this.getAvailableMovesByTeamPokemonId(this.pokemonId);

    const availableMoveIdArray = res.data;
    this.totalMoves = res.total;

    const availableMovesArray = await Promise.all(
      availableMoveIdArray.map((moveId: number) => this.getMoveById(moveId))
    );

    const content = this.generateMoveTable(this.name, availableMovesArray);
    this.showModal(content);
  }

  private async getAvailableMovesByTeamPokemonId(pokemonId: number) {
    try {
      const res = await APIGetAvailableMovesByTeamPokemonId(
        pokemonId,
        this.limit,
        this.offset
      );

      return res.data;
    } catch (e) {
      console.error("Error getting moves", e);
    }
  }

  private async getMoveById(id: number) {
    try {
      const res = await APIGetMoveById(id);
      return res.data;
    } catch (e) {
      console.error("Error getting move", e);
    }
  }

  public showModal(content: string) {
    this.setContent(content);
    this.modalElement?.classList.remove("hidden");
  }

  public hideModal() {
    this.modalElement?.classList.add("hidden");
  }

  private setContent(content: string) {
    if (this.modalContent) {
      this.modalContent.innerHTML = content;
    }
  }

  private async saveSelectedMoves() {
    const selectedMoves = this.modalContent?.querySelectorAll<HTMLInputElement>(
      'input[name="selectedMove"]:checked'
    );
    const selectedMoveIds = Array.from(selectedMoves || []).map((checkbox) =>
      parseInt(checkbox.value)
    );

    if (selectedMoveIds.length > 4) {
      alert("Cannot select more than 4 moves");
      return;
    }

    const selectedMovesObj = {
      move1: selectedMoveIds[0],
      move2: selectedMoveIds[1],
      move3: selectedMoveIds[2],
      move4: selectedMoveIds[3],
    };

    const res = await this.addMoves({
      teamPokemonId: this.pokemonId,
      moves: selectedMovesObj,
    });

    window.alert(res.data.message);
    this.hideModal();
  }

  private async addMoves(data: { teamPokemonId: number; moves: {} }) {
    const res = await APIAddMoves(data);
    return res;
  }

  private goToPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.offset -= this.limit;
      this.getMoveData();
    }
  }

  private goToNextPage() {
    if (this.offset + this.limit < this.totalMoves) {
      this.currentPage++;
      this.offset += this.limit;
      this.getMoveData();
    }
  }

  public generateMoveTable(name: string, moves: any[]): string {
    let tableHTML = `
        <h2 class="text-lg font-semibold mb-4">Move selection for ${name}</h2>
        <table class="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th class="py-2 px-4 border-b">Select</th>
              <th class="py-2 px-4 border-b">Move Name</th>
              <th class="py-2 px-4 border-b">Type</th>
              <th class="py-2 px-4 border-b">Power</th>
              <th class="py-2 px-4 border-b">Accuracy</th>
            </tr>
          </thead>
          <tbody>
      `;

    moves.forEach((move, index) => {
      tableHTML += `
          <tr>
            <td class="py-2 px-4 border-b text-center">
              <input type="checkbox" id="move${index}" name="selectedMove" value="${
        move.id
      }" class="form-checkbox h-5 w-5">
            </td>
            <td class="py-2 px-4 border-b">${move.name}</td>
            <td class="py-2 px-4 border-b">${move.type}</td>
            <td class="py-2 px-4 border-b text-center">${move.power || "-"}</td>
            <td class="py-2 px-4 border-b text-center">${
              move.accuracy || "-"
            }</td>
          </tr>
        `;
    });

    tableHTML += `
    </tbody>
   </table>
   <div class="flex justify-between items-center mt-4">
     <button id="prevPageBtn" class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600" ${
       this.currentPage === 1 ? "disabled" : ""
     }>Previous</button>
     <span>Page ${this.currentPage} of ${Math.ceil(
      this.totalMoves / this.limit
    )}</span>
     <button id="nextPageBtn" class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600" ${
       this.currentPage === Math.ceil(this.totalMoves / this.limit)
         ? "disabled"
         : ""
     }>Next</button>
   </div>
   <button id="saveMovesBtn" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
     Save Selected Moves
   </button>
 `;

    return tableHTML;
  }
}
