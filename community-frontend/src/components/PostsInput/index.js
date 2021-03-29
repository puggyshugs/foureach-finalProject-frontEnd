import "./Input.css";
import React, { useState, useEffect } from "react";
import { Button } from "@chakra-ui/react";
import { ChatIcon } from "@chakra-ui/icons";
import { useAuth0 } from '@auth0/auth0-react';

function PostsInput() {
  const [text, setText] = useState("");
  const { user } = useAuth0();

  function updateText(e) {
    setText(e.target.value);
  }

  async function handleClick(content) {
    const response = await fetch("https://localhost:5001/posts", {
      method: "POST",
      body: JSON.stringify({ content: content, name: user.name }),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    });
    const resData = await response.json();
    console.log(resData);
    //setText(resData.content);
   // return text;
  }

  return (
    <div className="Input">
      <input onChange={(e) => updateText(e)} type="text"></input>
      <p>{text}</p>
      <Button
        onClick={() => handleClick(text)}
        leftIcon={<ChatIcon />}
        bg="slategrey"
        radius="50%"
        color="white"
        variant="solid"
      >
        Send Message
      </Button>
    </div>
  );
}

export default PostsInput;
// onChange={(e) => updateText(e)}
// type="text"
