import { HomeActions } from "../../scripts/Home";
import { loadTemplate } from "../../utils/helpers/loadTemplate";

export class HomePage {
  static load: () => Promise<string> = async () => {
    return loadTemplate("/src/pages/templates/Home.html");
  };

  static initEventListeners: () => void = () => {
    HomeActions.init();
  };
}
