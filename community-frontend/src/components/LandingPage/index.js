import LoginButton from "../LoginButton";
import React from "react";
import logo from "../../Images/landingpageimage.svg";
import "./LandingPage.css";

function LandingPage(){
    return(
        <>
        <div className = "LandingPage">
        <h1>Title</h1>
        <img className = "logo" src = {logo} alt = "Logo"/>
        </div>
    <LoginButton />
    </>
    )
}

export default LandingPage;