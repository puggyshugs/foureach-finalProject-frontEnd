import React from "react";
import css from "./ChatWindow.module.css";
import Message from "../Message/Message";

function ChatWindow({ chat }) {
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
