import { HomePage } from "./pages/loaders/homeLoader";
import { LoginPage } from "./pages/loaders/loginLoader";
import { NotFoundPage } from "./pages/loaders/notFoundLoader";

const routes: { [key: string]: { component: any } } = {
  "#/home": { component: HomePage },
  "#/login": { component: LoginPage },
};

export class Router {
  static async loadContent() {
    console.log(window.location.hash);
    const hash = window.location.hash || "#/home";
    const route = routes[hash];
    if (route) {
      const content = await route.component.load();
      console.log(content);
      document.getElementById("app")!.innerHTML = content;

      route.component.initEventListeners();
    } else {
      const content = await NotFoundPage.load();
      document.getElementById("app")!.innerHTML = content;
      NotFoundPage.initEventListeners();
    }
  }

  static handleRouteChange() {
    Router.loadContent();
  }
  static init() {
    window.addEventListener("popstate", () => this.handleRouteChange());
    this.handleRouteChange();
  }
}
