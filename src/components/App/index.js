import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Profile from "../Profile";
import css from "./App.module.css";
import LandingPage from "../LandingPage";

import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "../LogoutButton";

import Chat from "../Chat/Chat";
import HomePage from "../HomePage/index";
import DemoMap from "../DemoMap/DemoMap";
//import DemoMap from "../MapLeaflet/MapLeaflet";

function App() {
  const { isAuthenticated } = useAuth0();

  return (
    <div className={css.appContainer}>
      <div style={{ margin: "0 30%" }}>
        {!isAuthenticated && <LandingPage />}
      </div>

      {isAuthenticated && (
        <div>
          <Router>
            <nav>
              <ul className={css.navBar}>
                <li className={css.bars}>
                  <Link className={css.text} to="/">
                    Home
                  </Link>
                </li>
                <li className={css.bars}>
                  <Link className={css.text} to="/profile">
                    Profile
                  </Link>
                </li>
                <li className={css.bars}>
                  <Link className={css.text} to="/chat">
                    Chat
                  </Link>
                </li>
                <li className={css.bars}>
                  <Link className={css.text} to="/map">
                    Events
                  </Link>
                </li>
                <li className={css.bars}>
                  <LogoutButton />
                </li>
              </ul>
            </nav>

            <Switch>
              <Route path="/profile">
                <Profile />
              </Route>
              <Route path="/chat">
                <Chat />
              </Route>
              <Route path="/map">
                <DemoMap />
              </Route>
              <Route path="/">
                <HomePage />
              </Route>
            </Switch>
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;
