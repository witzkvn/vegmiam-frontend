import { client } from "../index";

export const loginService = async (email, password) => {
  const data = {
    email,
    password,
  };

  try {
    const res = await client().post("users/login", data);
    return res;
  } catch (error) {
    return await Promise.reject(error);
  }
};
