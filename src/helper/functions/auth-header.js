export const authHeader = () => {
  let token = JSON.parse(localStorage.getItem('jwt'));
  console.log(token)
  if (token) {
    // axios.defaults.headers.common['Authorization'] = `Token ${user.token}`;
    return 'Bearer ' + token;
  } else {
    // delete axios.defaults.headers.common['Authorization'];
    return;
  }
}