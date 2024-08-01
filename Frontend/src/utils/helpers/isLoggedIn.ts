import { isAxiosError } from "axios";
import { APIRefresh } from "../../api/auth";
import { APIGetMyDetails } from "../../api/user";

export const isLoggedIn = async () => {
  try {
    const response = await APIGetMyDetails();
    localStorage.setItem("user", JSON.stringify(response.data));
    localStorage.setItem("isLoggedIn", "true");
    return true;
  } catch (error) {
    console.error("Error fetching user details:", error);
    localStorage.setItem("isLoggedIn", "false");
    // Check if the error is due to an invalid or expired access token
    if (isAxiosError(error) && error.response?.status === 401) {
      // Attempt to refresh the access token using the refresh token
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) {
        console.error("No refresh token found. User may need to log in again.");
        return null; // No refresh token available, canthenot proceed
      }

      try {
        const newToken = await APIRefresh({ refreshToken });
        localStorage.setItem("accessToken", newToken.data.accessToken);

        // Retry the request with the new access token
        const response = await APIGetMyDetails();
        localStorage.setItem("user", response.data);
        localStorage.setItem("isLoggedIn", "true");
        return true;
      } catch (refreshError) {
        console.error("Error refreshing token:", refreshError);
        localStorage.setItem("isLoggedIn", "false");

        // Handle errors from the refresh token request (e.g., token expired, invalid)
        if (
          isAxiosError(refreshError) &&
          refreshError.response?.status === 401
        ) {
          console.error(
            "Refresh token is invalid or expired. User needs to log in again."
          );
          // Optionally, clear tokens and redirect to login page
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("user");
          localStorage.removeItem("isLoggedIn");
          // Redirect to login page or handle re-authentication
        }
        return null; // Failed to refresh the token
      }
    } else {
      // Handle other types of errors (e.g., network errors, server errors)
      console.error("An unexpected error occurred:", error);
    }
    return null; // Failed to authenticate
  }
};
