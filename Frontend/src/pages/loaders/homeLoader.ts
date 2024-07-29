export class HomePage {
  static load: () => Promise<string> = async () => {
    const response = await fetch("/src/pages/templates/Home.html");
    return response.text();
  };

  static initEventListeners: () => void = () => {};
}
