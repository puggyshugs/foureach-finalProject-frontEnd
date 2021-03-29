import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

import Message from "../Message/Message";

function ChatWindow(props) {
  const { user } = useAuth0();

  const chat = props.chat.map((m) => (
    <Message
      key={Date.now() * Math.random()}
      user={user.name}
      message={m.message}
    />
  ));

  return <div>{chat}</div>;
}

export default ChatWindow;
