import { LoginActions } from "../../scripts/LoginPage";
import { loadTemplate } from "../../utils/helpers/loadTemplate";

export class LoginPage {
  static load: () => Promise<string> = async () => {
    return loadTemplate("/src/pages/templates/LoginPage.html");
  };

  static initEventListeners: () => void = () => {
    LoginActions.init();
  };
}
