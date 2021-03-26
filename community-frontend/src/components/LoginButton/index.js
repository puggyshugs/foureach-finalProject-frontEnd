import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./Login.css";

function LoginButton() {
const { loginWithRedirect } = useAuth0();


  return <button 
  className= "login"
   onClick={() => loginWithRedirect()}>Log In</button>;
};

export default LoginButton;