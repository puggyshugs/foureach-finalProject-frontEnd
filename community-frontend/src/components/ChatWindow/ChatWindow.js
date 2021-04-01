import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import css from "./ChatWindow.module.css";
import Message from "../Message/Message";

function ChatWindow({ chat }) {
  const { user } = useAuth0();

  return (
    <div className={css.chatWindowContainer}>
      <ul className={css.chatWindowList}>
        {chat.map((m) => (
          <Message
            key={Date.now() * Math.random()}
            user={m.name}
            message={m.message}
          />
        ))}
      </ul>
    </div>
  );
}

export default ChatWindow;
