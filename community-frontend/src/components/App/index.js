import React from "react";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Profile from "../Profile";

import { useAuth0 } from "@auth0/auth0-react"; 
import LandingPage from "../LandingPage";
import LogoutButton from "../LogoutButton";

import Chat from "../Chat/Chat";
import HomePage from "../HomePage/index";

function App() {
  const { isAuthenticated } = useAuth0();

  return (

    
      <div>
      <div style={{ margin: "0 30%" }}>
        {!isAuthenticated && <LandingPage/>}
        {isAuthenticated && <LogoutButton />}
        {isAuthenticated && <Chat />}    
      </div>
      </div>

  );
}

export default App;

