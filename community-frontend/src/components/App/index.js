import React from "react";
// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// import Profile from "../Profile";

import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../Login";
import LogoutButton from "../Logout";

// import Chat from "../Chat/Chat";
import HomePage from "../HomePage/index";
import NavBar from "../NavBar";

function App() {
  const { isAuthenticated } = useAuth0();

  return (
    <div>
      <div style={{ margin: "0 30%" }}>
        {!isAuthenticated && <LoginButton />}
        {isAuthenticated && <LogoutButton />}
        {isAuthenticated && <HomePage />}
      </div>
      <NavBar />
    </div>
  );
}

export default App;
