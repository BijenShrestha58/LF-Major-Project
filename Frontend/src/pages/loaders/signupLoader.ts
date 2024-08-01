import { SignUpActions } from "../../scripts/SignUpPage";
import { loadTemplate } from "../../utils/helpers/loadTemplate";

export class SignUpPage {
  static load: () => Promise<string> = async () => {
    return loadTemplate("/src/pages/templates/SignUpPage.html");
  };

  static initEventListeners: () => void = () => {
    SignUpActions.init();
  };
}
