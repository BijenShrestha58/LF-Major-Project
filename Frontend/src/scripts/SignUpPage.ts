import { togglePassword } from "../utils/helpers/togglePassword";
import { AxiosError } from "axios";
import { Router } from "../router";
import { APICreateUser } from "../api/user";
import { ROLE } from "../utils/constants/enums";

export class SignUpActions {
  static init: () => void = () => {
    //get form
    const form = document.getElementById("signUpForm") as HTMLFormElement;
    //handle submit button
    form.addEventListener("submit", this.handleFormSubmit);

    //handle pasword toggle
    const showPasswordToggle = document.getElementById(
      "showPasswordToggle"
    ) as HTMLButtonElement;
    if (showPasswordToggle) {
      showPasswordToggle.addEventListener("click", () =>
        togglePassword("password", showPasswordToggle)
      );
    }
  };

  //handle signup form submit
  static async handleFormSubmit(event: Event) {
    event.preventDefault();
    const usernameInput = document.getElementById(
      "username"
    ) as HTMLInputElement;
    const passwordInput = document.getElementById(
      "password"
    ) as HTMLInputElement;
    try {
      const response = await APICreateUser({
        username: usernameInput.value,
        password: passwordInput.value,
        role: ROLE.USER,
      });
      //set access token and refresh token
      window.alert("User created successfully");

      //redirect to home
      window.history.pushState({}, "", "/#/login");
      Router.loadContent();
    } catch (err) {
      if (err instanceof AxiosError) {
        const errorMessage = err.response?.data?.message || err.message;
        window.alert(errorMessage);
        //clear inputs
        usernameInput.value = "";
        passwordInput.value = "";
      } else {
        window.alert("An unexpected error occurred");
      }
    }
  }
}
