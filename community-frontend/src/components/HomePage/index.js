import React from "react";
import css from "./HomePage.module.css";
import PostsInput from "../PostsInput/index";
import UserPosts from "../UserPosts/index";

function HomePage() {
  return (
    <div className={css.homePageContainer}>
      <h1 className={css.title}>Home Page (replace with title)</h1>

      <UserPosts className={css.UserPosts} />
    </div>
  );
}

export default HomePage;
