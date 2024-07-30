import { Router } from "./router";
import "./style.css";
import { isLoggedIn } from "./utils/helpers/isLoggedIn";

document.addEventListener("DOMContentLoaded", async () => {
  isLoggedIn();
  Router.init();
  window.addEventListener("hashchange", () => Router.loadContent());
});
