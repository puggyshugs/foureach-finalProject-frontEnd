import React from "react";
import "./HomePage.css";
import Input from "../Input/index";
import Posts from "../Posts/index";
import NavBar from "../NavBar/index";

function HomePage() {
  return (
    <div>
      <h1>HomePage</h1>

      <Posts />
      <Input />
      <NavBar />
    </div>
  );
}

export default HomePage;
