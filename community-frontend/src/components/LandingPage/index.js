import LoginButton from "../LoginButton";
import React from "react";
import logo from "../../Images/landingpageimage.svg";
import "./LandingPage.css";

function LandingPage(){
    return(
        <>
        <div className="LandingPage">
        <h1>Title</h1>
        <p>Here is a brief description of the community app</p>
        <img className="LandingPage-logo" src={logo} alt="logo"/>
        <div className="vertical-center"><LoginButton /></div>
        
        </div>
    
    </>
    )
}

export default LandingPage;