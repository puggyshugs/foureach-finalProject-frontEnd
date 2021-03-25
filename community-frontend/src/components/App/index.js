import React from "react";
import { useAuth0 } from "@auth0/auth0-react"; 
import LoginButton from "../Login";
import LogoutButton from "../Logout";
import Chat from "../Chat/Chat";

function App() {
  const { isAuthenticated } = useAuth0();

  return (

    <div 
    // className={css.App}
    >
      <div style={{ margin: "0 30%" }}>
        {!isAuthenticated && <LoginButton />}
        {isAuthenticated && <LogoutButton />}
        {isAuthenticated && <Chat />}    
      </div>
    </div>
  );
}

export default App;
