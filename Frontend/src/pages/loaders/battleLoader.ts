import { Battle } from "../../scripts/Battle";
import { loadTemplate } from "../../utils/helpers/loadTemplate";

export class BattlePage {
  static load: () => Promise<string> = async () => {
    return loadTemplate("/src/pages/templates/Battle.html");
  };

  static initEventListeners: () => void = () => {
    Battle.init();
  };
}
