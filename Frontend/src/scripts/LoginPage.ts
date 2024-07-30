import { togglePassword } from "../utils/helpers/togglePassword";
import { AxiosError } from "axios";
import { Router } from "../router";
import { APIAuthenticateUser } from "../api/auth";
import { isLoggedIn } from "../utils/helpers/isLoggedIn";

export class LoginActions {
  static init: () => void = () => {
    //get form
    const form = document.getElementById("loginForm") as HTMLFormElement;
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

  //handle login form submit
  static async handleFormSubmit(event: Event) {
    event.preventDefault();
    const usernameInput = document.getElementById(
      "username"
    ) as HTMLInputElement;
    const passwordInput = document.getElementById(
      "password"
    ) as HTMLInputElement;
    try {
      const response = await APIAuthenticateUser({
        username: usernameInput.value,
        password: passwordInput.value,
      });
      //set access token and refresh token
      console.log(response);
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      await isLoggedIn();
      //redirect to home
      window.history.pushState({}, "", "/#/home");
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
