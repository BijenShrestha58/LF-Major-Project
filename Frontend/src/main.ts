import { Router } from "./router";
import "./style.css";

document.addEventListener("DOMContentLoaded", async () => {
  Router.init();
  window.addEventListener("hashchange", () => Router.loadContent());
});
