export class NotFoundPage {
  static load: () => Promise<string> = async () => {
    const response = await fetch("/src/pages/templates/NotFound.html");
    return response.text();
  };

  static initEventListeners: () => void = () => {};
}
