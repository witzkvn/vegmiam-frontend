import { client } from "..";

export const loginService = async (email, password) => {
  const data = {
    email,
    password,
  };
  return await client()
    .post("users/login", data)
    .then((res) => res)
    .catch((error) => Promise.reject(error));
};
