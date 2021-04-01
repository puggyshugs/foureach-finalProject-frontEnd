import css from "./Input.module.css";
import React, { useState, useEffect } from "react";
import { Button } from "@chakra-ui/react";
import { ChatIcon } from "@chakra-ui/icons";
import { useAuth0 } from "@auth0/auth0-react";
import { MDBInput } from "mdbreact";

function PostsInput({ setPostChange, postChange }) {
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
    setPostChange(!postChange);
    console.log({ resData });
    //setText(resData.content);
    // return text;
  }

  return (
    <div className={css.input}>
      <h5 className={css.inputTitle}>
        Let your community know what you're thinking...
      </h5>
      <MDBInput
        className={css.inputField}
        type="textarea"
        label="Type notification..."
        rows="2"
        icon="pencil-alt"
        onChange={(e) => updateText(e)}
      />
      <Button
        onClick={() => handleClick(text)}
        leftIcon={<ChatIcon />}
        className={css.sendMessageButton}
      >
        Post
      </Button>
    </div>
  );
}

export default PostsInput;
// onChange={(e) => updateText(e)}
// type="text"
