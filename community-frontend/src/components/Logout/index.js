import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
// import css from "../Search/Search.module.css";

const LogoutButton = () => {
  const { logout } = useAuth0();
  return (
    <div className="logoutButton">
      <button
        // className={css.Button}
        onClick={() => logout({ returnTo: window.location.origin })}
      >
        Log Out
      </button>
    </div>
  );
};

export default LogoutButton;
