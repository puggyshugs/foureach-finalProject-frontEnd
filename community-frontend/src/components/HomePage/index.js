import React from "react";
import css from "./HomePage.module.css";
import PostsInput from "../PostsInput/index";
import UserPosts from "../UserPosts/index";
import logo from "../../Images/landingpageimage.svg";

function HomePage() {
  return (
    <div className={css.homePageContainer}>
      <div className={css.titleAndLogoContainer}>
        <img className={css.homePage_logo} src={logo} alt="logo" />
        <h1 className={css.title}>Community Notifications</h1>
      </div>
      <UserPosts className={css.UserPosts} />
    </div>
  );
}

export default HomePage;
