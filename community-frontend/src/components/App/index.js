import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Profile from "../Profile";
import Chat from "../Chat/Chat";
import HomePage from "../HomePage/index";

function App() {
  return (
    <Router>
      <div>
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
      </div>
    </Router>
  );
}

export default App;

{
  /* <div style={{ margin: "0 30%" }}>
  <Chat />
</div>; */
}
