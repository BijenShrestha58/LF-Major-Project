/**
 * Retrieves the user object from localStorage.
 *
 * @returns {Object|null} The parsed user object if it exists in localStorage, or `null` if not.
 */
export const getUser = () => {
  let user;
  const userString = localStorage.getItem("user");
  if (userString) user = JSON.parse(userString);
  return user;
};
