import { HomePage } from "./pages/loaders/homeLoader";
import { LoginPage } from "./pages/loaders/loginLoader";
import { NotFoundPage } from "./pages/loaders/notFoundLoader";

let loggedIn: boolean;

const routes: { [key: string]: { component: any } } = {
  "#/home": { component: HomePage },
  "#/login": { component: LoginPage },
};

export class Router {
  static async loadContent() {
    console.log(localStorage.getItem("isLoggedIn"));
    if (localStorage.getItem("isLoggedIn") === "true") {
      loggedIn = true;
    }

    if (!window.location.hash) {
      window.location.hash = "#/home";
    }

    if (loggedIn && window.location.hash === "#/login") {
      window.location.hash = "#/home";
    }
    console.log(loggedIn);
    if (!loggedIn) {
      window.location.hash = "#/login";
    }

    const hash = window.location.hash;

    const route = routes[hash];
    if (route) {
      const content = await route.component.load();
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
