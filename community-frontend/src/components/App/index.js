import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Profile from "../Profile";

import LandingPage from "../LandingPage";

import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../LoginButton";
import LogoutButton from "../LogoutButton";

import Chat from "../Chat/Chat";
import HomePage from "../HomePage/index";

function App() {
  const { isAuthenticated } = useAuth0();

  return (
    <div>
      <div style={{ margin: "0 30%" }}>
        {!isAuthenticated && <LoginButton />}
      </div>

      {isAuthenticated && (
        <div>
          <LogoutButton />
          <Router>
            <nav>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
                <li>
                  <Link to="/chat">Chat</Link>
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
