export class LoginPage {
  static load: () => Promise<string> = async () => {
    const response = await fetch("/src/pages/templates/LoginPage.html");
    return response.text();
  };

  static initEventListeners: () => void = () => {};
}
