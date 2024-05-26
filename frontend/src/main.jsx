import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "./i18N.js";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import AuthService from "./services/auth/AuthService.js";
import ApiError from "./services/ApiError.js";
import store from "./store/index.js";

axios.defaults.baseURL = import.meta.env.VITE_SERVER_URI;
axios.defaults.withCredentials = true;

let refreshingTokenInProgress = false;

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    /* If an error has occurred from refresh token api */
    if (error?.config?.url?.includes("refresh-token")) {
      return Promise.reject(error);
    }
    /*If the response status is 401, and the requested api end point is not login api  */
    if (
      error?.response?.status === 401 &&
      !error?.config?.url?.includes("login") &&
      !refreshingTokenInProgress
    ) {
      /* Refreshing the token */
      refreshingTokenInProgress = true;

      const response = await AuthService.refreshAccessToken();

      refreshingTokenInProgress = false;
      /* Refresh token success */
      if (!(response instanceof ApiError)) {
        /* Replay the original request */
        return axios(error.config);
      }
    }
    /* Other errors */
    return Promise.reject(error);
  }
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
