import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

function ChatInput(props) {
  // const [user, setUser] = useState("");
  const { user } = useAuth0();
  const [message, setMessage] = useState("");

  function onSubmit(e) {
    e.preventDefault();

    //const isUserProvided = user && user !== "";
    const isMessageProvided = message && message !== "";

    if (isMessageProvided) {
      props.sendMessage(user.name, message);
    } else {
      alert("Please insert an user and a message.");
    }
  }
/* 
  function onUserUpdate(e) {
    setUser(e.target.value);
  }
 */
  function onMessageUpdate(e) {
    setMessage(e.target.value);
  }

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="user">User:</label>
      <br />
      <input type= "text" value={user.name} />
      <br />
      <label htmlFor="message">Message:</label>
      <br />
      <input
        type="text"
        id="message"
        name="message"
        value={message}
        onChange={onMessageUpdate}
      />
      <br />
      <br />
      <button>Submit</button>
    </form>
  );
}

export default ChatInput;
