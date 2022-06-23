export const authHeader = () => {
  let localStorageJWT = localStorage.getItem("jwt");

  if (localStorageJWT && localStorageJWT !== "undefined") {
    let token = JSON.parse(localStorageJWT);
    return "Bearer " + token;
  }

  return;
};
