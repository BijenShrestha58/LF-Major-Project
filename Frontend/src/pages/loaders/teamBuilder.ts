import { TeamBuilder } from "../../scripts/TeamBuilder";
import { loadTemplate } from "../../utils/helpers/loadTemplate";

export class TeamBuilderPage {
  static load: () => Promise<string> = async () => {
    return loadTemplate("/src/pages/templates/TeamBuilder.html");
  };

  static initEventListeners: () => void = () => {
    TeamBuilder.init();
  };
}
