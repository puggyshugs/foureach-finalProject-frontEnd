import React from "react";
import "./HomePage.css";
import PostsInput from "../PostsInput/index";
import UserPosts from "../UserPosts/index";
import NavBar from "../NavBar/index";

function HomePage() {
  return (
    <div>
      <h1>HomePage</h1>

      <UserPosts />

      <NavBar />
    </div>
  );
}

export default HomePage;
