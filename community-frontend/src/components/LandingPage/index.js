import LoginButton from "../LoginButton";
import React from "react";
import logo from "../../Images/landingpageimage.svg";
import css from "./LandingPage.module.css";

function LandingPage() {
  return (
    <>
      <div className={css.LandingPage}>
        <h1>Title</h1>
        <p>Here is a brief description of the community app</p>
        <div className={css.imageContainer}>
          <div>
            <img className={css.LandingPage_logo} src={logo} alt="logo" />
          </div>
          <div className={css.overlay.LandingPage_logo2}>
            <LoginButton />
          </div>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
