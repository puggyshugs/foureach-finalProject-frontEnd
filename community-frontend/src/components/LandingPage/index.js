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
        <div className="imageContainer">
        <div><img className=" LandingPage-logo" src={logo} alt="logo"/></div>
        <div className=" overlay LandingPage-logo2"><LoginButton /></div>
        </div>
        
        </div>
    
    </>
    )
}

export default LandingPage;