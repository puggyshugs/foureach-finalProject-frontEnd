import React from "react";
import css from "./IsTypingMessage.module.css";

function IsTypingMessage(props) {
  return (
    <div
      className={css.messageContainer}
      // style={{ background: "#eee", borderRadius: "5px", padding: "0 10px" }}
    >
      <p className={css.chatUserName}>
        <strong>{props.user}</strong>
      </p>
      <p className={css.chatMessageContent}>{props.message}</p>
    </div>
  );
}

export default IsTypingMessage;
