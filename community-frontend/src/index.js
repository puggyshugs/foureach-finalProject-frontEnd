import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App/index";
import reportWebVitals from "./reportWebVitals";
import { Auth0Provider } from "@auth0/auth0-react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";

ReactDOM.render(
  <Auth0Provider
    domain="dev-uxqtya0r.eu.auth0.com" // to be changed
    clientId="j2ijnieb5TAqdUxN5UlBR6Q11ddTS0se" // to be changed
    redirectUri={window.location.origin}
  >
    {console.log("am I here?")}
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Auth0Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
