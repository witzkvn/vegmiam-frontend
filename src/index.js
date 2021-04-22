import React from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";
import { Provider } from 'react-redux'
import store from './redux/store';
import { BrowserRouter } from 'react-router-dom'
import history from "./helper/functions/createBrowserHistory"
import { authHeader } from "./helper/functions/auth-header"
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';

// axios settings
const headersKeys = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'Authorization': authHeader()
}

export const client = () => {
  return axios.create({
    baseURL: 'http://localhost:3000/api/v1/',
    headers: headersKeys
  })
}

// export const client = async () => {
//   if (process.env.NODE_ENV === "development") {
//     return axios.create({
//       baseURL: 'http://localhost:3000/api/v1/',
//       headers: await headersKeys,

//     })
//   } else if (process.env.NODE_ENV === "devonline") {
//     return axios.create({
//       baseURL: 'https://vegmiam-back-dev.herokuapp.com/',
//       headers: await headersKeys,
//     })
//   } else if (process.env.NODE_ENV === "production") {
//     return axios.create({
//       baseURL: 'https://vegmiam-back-master.herokuapp.com/',
//       headers: await headersKeys,
//     });
//   }
// }


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter history={history}>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
