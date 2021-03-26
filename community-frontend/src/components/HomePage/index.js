import React from "react";
import "./HomePage.css";
import Input from "../Input/index";
import UserPosts from "../UserPosts/index";
import NavBar from "../NavBar/index";

function HomePage() {
  return (
    <div>
      <h1>HomePage</h1>

      <UserPosts />
      <Input />
      <NavBar />
    </div>
  );
}

export default HomePage;
