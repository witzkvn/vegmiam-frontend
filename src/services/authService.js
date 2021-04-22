import { client } from ".."

export const loginService = (email, password) => {
  const data = {
    email,
    password
  }
  return client().post('users/login', data).then(res => res).catch(error => Promise.reject(error))
}