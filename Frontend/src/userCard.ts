import "./counter.ts";
import "./pages/LoginPage.ts";

const template = document.createElement("template");
template.innerHTML = `
<style>
  h3{
    color:coral;
  }
</style>
<my-counter></my-counter>
<login-page></login-page>
<div>
  <img/>
  <div>
    <h3></h3>
    <div class = "info">
      <p><slot name = "email"/></p>
      <p><slot name = "phone"/></p>
    </div>
  </div>
</div>`;

class UserCard extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot?.appendChild(template.content.cloneNode(true));
    const word = this.shadowRoot?.querySelector("h3");
    word!.innerText = this.getAttribute("name")!;

    const image = this.shadowRoot?.querySelector("img");
    image!.src = this.getAttribute("avatar")!;
  }
}

window.customElements.define("user-card", UserCard);
