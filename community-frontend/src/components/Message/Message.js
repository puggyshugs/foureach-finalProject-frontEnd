import React from "react";
import css from "./Message.module.css";

function Message(props) {
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

export default Message;
