import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import css from "./logout.module.css";

const LogoutButton = () => {
  const { logout } = useAuth0();
  return (
    <div className={css.logoutButton}>
      <button
        className={css.button}
        onClick={() => logout({ returnTo: window.location.origin })}
      >
        Log Out
      </button>
    </div>
  );
};

export default LogoutButton;
