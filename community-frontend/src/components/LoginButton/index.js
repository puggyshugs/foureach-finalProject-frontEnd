import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import css from "./Login.module.css";

function LoginButton() {
  const { loginWithRedirect } = useAuth0();

  return (
    <button className={css.login} onClick={() => loginWithRedirect()}>
      Log In
    </button>
  );
}

export default LoginButton;
