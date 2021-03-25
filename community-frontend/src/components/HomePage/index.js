import React from "react";
import './HomePage.css'
import Input from '../Input/index';
import Posts from '../Posts/index';

function HomePage(){
  return (
    <div>
      
      <Posts/>
      <Input/>

      <h1>HomePage</h1>
    </div>
  );
}

export default HomePage;
