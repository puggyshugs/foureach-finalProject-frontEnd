import React, { useState, useEffect, useRef } from "react";
import { HubConnectionBuilder } from "@microsoft/signalr";
import css from "./Chat.module.css";
import ChatWindow from "../ChatWindow/ChatWindow";
import ChatInput from "../ChatInput/ChatInput";
import IsTypingMessage from "../IsTypingMessage/IsTypingMessage";

function Chat() {
  const [connection, setConnection] = useState(null);
  const [chat, setChat] = useState([]);
  const latestChat = useRef(null);

  const [, setCurrentTyper] = useState(null);
  const [currentMessage, setCurrentMessage] = useState(null);
  const [send, setSend] = useState(false);

  // get old chats from database on page load.
  async function getOldChat() {
    const response = await fetch(process.env.REACT_APP_BACKEND_CHAT_URL);
    const resData = await response.json();
    setChat(resData);
    return;
  }

  useEffect(() => {
    getOldChat();
  }, []);

  latestChat.current = chat;

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl(process.env.REACT_APP_BACKEND_CHAT_HUB_URL)
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);
  }, []);

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then((result) => {
          console.log("Connected!");

          connection.on("ReceiveMessage", (message) => {
            const updatedChat = [message, ...latestChat.current];
            // updatedChat.unshift(message);
            // const messageAddedToChat = [message, ...updatedChat];
            // setChat(messageAddedToChat);
            // comment;
            setChat(updatedChat);
          });
          connection.on("ReceiveTyper", (user) => {
            setCurrentTyper(user.name);
            setCurrentMessage(user.message);
          });
        })
        .catch((e) => console.log("Connection failed: ", e));
    }
  }, [connection]);

  async function sendMessage(user, message) {
    const chatMessage = {
      name: user,
      message: message,
    };
    if (connection.connectionStarted) {
      try {
        (await connection.send("SendMessage", chatMessage)) && setSend(!send);
        setSend(send);
      } catch (e) {
        console.log(e);
      }
    } else {
      alert("No connection to server yet.");
    }
  }
  async function sendTyper(user) {
    if (user === null) {
      var chatMessage = {
        name: ` `,
        message: ` `,
      };
    } else {
      chatMessage = {
        name: user,
        message: `${user} is typing...`,
      };
    }

    if (connection.connectionStarted && send === false) {
      try {
        (await connection.send("SendTyper", chatMessage)) && setSend(!send);
      } catch (e) {
        console.log(e);
      }
    } else {
      alert("No connection to server yet.");
    }
    // setTimeout(function () {
    //   setCurrentMessage("");
    // }, 10000);
  }

  return (
    <div className={css.mainChatContainer}>
      <div className={css.inputAndWindowContainer}>
        <div className={css.chatInputHoverMode}>
          <ChatInput sendMessage={sendMessage} sendTyper={sendTyper} />
        </div>
        <div className={css.chatWindowHover}>
          <IsTypingMessage message={currentMessage} />
          <ChatWindow chat={chat} />
        </div>
      </div>
    </div>
  );
}

export default Chat;
