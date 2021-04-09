import React from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";
import { Provider } from 'react-redux'
import store from './redux/store';
import { Router } from 'react-router-dom'
import history from "./helper/functions/createBrowserHistory"
// import { authHeader } from "./helper/functions/auth-header"
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// AXIOS SETTINGS
// var csrftoken = getCookie('csrftoken');


// console.log('csrftoken',csrftoken)
// const headersKeys = {
//   'Accept': 'application/json',
//   'Content-Type': 'application/json',
//   'authorization': authHeader()
// }

// export const client = () => {
//   return axios.create({
//     baseURL: 'https://swipetuto-back-dev.herokuapp.com/api/v1/',
//     headers: headersKeys
//   });
//   // if (process.env.NODE_ENV === "development") {
//   //   return axios.create({
//   //     baseURL: 'http://localhost:8000/api/v1/',
//   //     headers: headersKeys
//   //   });

//   // } else if (process.env.NODE_ENV === "production") {
//   //   return axios.create({
//   //     baseURL: 'https://swipetuto-back-dev.herokuapp.com/api/v1/',
//   //     headers: headersKeys
//   //   });
//   // }
// }


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
