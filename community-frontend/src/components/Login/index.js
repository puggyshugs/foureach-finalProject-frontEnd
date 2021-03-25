import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
// import css from "../Search/Search.module.css";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <button 
  // className={css.Button}
   onClick={() => loginWithRedirect()}>Log In</button>;
};

export default LoginButton;