export const getUser = () => {
  let user;
  const userString = localStorage.getItem("user");
  if (userString) user = JSON.parse(userString);
  return user;
};
