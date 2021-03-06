import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { Provider } from "react-redux";
import store from "./redux/store";
import { BrowserRouter } from "react-router-dom";
import history from "./helper/functions/createBrowserHistory";
import { authHeader } from "./helper/functions/auth-header";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// axios settings
const getHeadersKeys = () => {
  console.log("headerskeys");
  return {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: authHeader(),
  };
};

export const client = () => {
  const axiosInstance = axios.create({
    baseURL: "https://vegmiam-back-master.herokuapp.com/",
    headers: getHeadersKeys(),
  });

  return axiosInstance;
};

// export const client = () => {
//   console.log(process.env.NODE_ENV);
//   if (process.env.NODE_ENV === "development") {
//     console.log("dev");
//     return axios.create({
//       baseURL: "http://localhost:3000/api/v1/",
//       headers: getHeadersKeys(),
//     });
//   } else if (process.env.NODE_ENV === "devonline") {
//     console.log("devonline");
//     return axios.create({
//       baseURL: "https://vegmiam-back-dev.herokuapp.com/",
//       headers: getHeadersKeys(),
//     });
//   } else if (process.env.NODE_ENV === "production") {
//     console.log("prod");
//     return axios.create({
//       baseURL: "https://vegmiam-back-master.herokuapp.com/",
//       headers: getHeadersKeys(),
//     });
//   }
// };

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter history={history}>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
