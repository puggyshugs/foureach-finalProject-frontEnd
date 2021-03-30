import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

function ChatInput(props) {
  // const [user, setUser] = useState("");
  const { user } = useAuth0();
  //console.log(user);
  const personName = user.name;
  const [message, setMessage] = useState("");

  function onSubmit(e) {
    e.preventDefault();

    //const isUserProvided = user && user !== "";
    const isMessageProvided = message && message !== " " && message.length !== 0;
    if (isMessageProvided) {
      props.sendMessage(personName, message);
    } else {
      alert("Please insert an user and a message.");
    }
    setMessage("");
  }

  function handleChange(e){
    e.preventDefault();
    const isMessageProvided = message && message !== "" && message.length !== 0;
    if (isMessageProvided) {
      props.sendTyper(personName, message);
    }
    setMessage(e.target.value)
  }

  return (
    <>
    <form onSubmit={onSubmit}>
      <label htmlFor="user">User:</label>
      <br />
      <input type= "text" value={personName} />
      <br />
      <label htmlFor="message">Message:</label>
      <br />
      <input
        type="text"
        id="message"
        name="message"
        value={message}
        onChange={handleChange}
      />
      <br />
      <br />
      <button>Submit</button>
    </form>
    </>
  );
}

export default ChatInput;
