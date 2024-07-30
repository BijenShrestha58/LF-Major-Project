import { loadTemplate } from "../../utils/helpers/loadTemplate";

export class NotFoundPage {
  static load: () => Promise<string> = async () => {
    return loadTemplate("/src/pages/templates/NotFound.html");
  };

  static initEventListeners: () => void = () => {};
}
