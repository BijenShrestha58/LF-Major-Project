import { HomePage } from "./pages/loaders/homeLoader";
import { LoginPage } from "./pages/loaders/loginLoader";
import { NotFoundPage } from "./pages/loaders/notFoundLoader";
import { SignUpPage } from "./pages/loaders/signupLoader";
import { TeamBuilderPage } from "./pages/loaders/teamBuilder";

let loggedIn: boolean;

const routes: { [key: string]: { component: any } } = {
  "#/home": { component: HomePage },
  "#/login": { component: LoginPage },
  "#/signup": { component: SignUpPage },
  "#/teambuilder": { component: TeamBuilderPage },
};

export class Router {
  static async loadContent() {
    if (localStorage.getItem("isLoggedIn") === "true") {
      loggedIn = true;
    }

    if (!window.location.hash) {
      window.location.hash = "#/home";
    }

    if (
      loggedIn &&
      (window.location.hash === "#/login" ||
        window.location.hash === "#/signup")
    ) {
      window.location.hash = "#/home";
    }

    if (
      !loggedIn &&
      routes[window.location.hash] &&
      window.location.hash !== "#/signup"
    ) {
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
