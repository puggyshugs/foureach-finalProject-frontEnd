import React, { useState, useEffect, useRef } from "react";
import { HubConnectionBuilder } from "@microsoft/signalr";

import ChatWindow from "../ChatWindow/ChatWindow";
import ChatInput from "../ChatInput/ChatInput";
import Message from "../Message/Message";

function Chat() {
  const [connection, setConnection] = useState(null);
  const [chat, setChat] = useState([]);
  const latestChat = useRef(null);
  const [currentTyper, setCurrentTyper] = useState(null);
  const [currentMessage, setCurrentMessage] = useState(null);
  const [send, setSend] = useState(false);

  // get old chats from database on page load.
  // async function getOldChat() {
  //   const response = await fetch("https://localhost:5001/Chats");
  //   const resData = await response.json();
  //   console.log(resData);
  //   setChat(resData);
  //   return;
  // }

  // useEffect(() => {
  //   getOldChat();
  // }, []);

  latestChat.current = chat;

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl("https://localhost:5001/hubs/chat")
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
            const updatedChat = [...latestChat.current];
            updatedChat.unshift(message);
            //TODO: spread array
            setChat(updatedChat);
          });
          connection.on("ReceiveTyper", (user) => {
            console.log(user);
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
    console.log(chatMessage);
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
    const chatMessage = {
      name: user,
      message: `${user} is typing...`,
    };

    if (connection.connectionStarted && send === false) {
      try {
        (await connection.send("SendTyper", chatMessage)) && setSend(!send);
      } catch (e) {
        console.log(e);
      }
    } else {
      alert("No connection to server yet.");
    }
    setTimeout(function () {
      setCurrentMessage("");
    }, 4000);
  }

  return (
    <div>
      <ChatInput sendMessage={sendMessage} sendTyper={sendTyper} />
      <hr />
      <ChatWindow chat={chat} />
      <Message message={currentMessage} />
    </div>
  );
}

export default Chat;
