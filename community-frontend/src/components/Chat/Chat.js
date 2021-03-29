import React, { useState, useEffect, useRef } from "react";
import { HubConnectionBuilder } from "@microsoft/signalr";

import ChatWindow from "../ChatWindow/ChatWindow";
import ChatInput from "../ChatInput/ChatInput";

function Chat() {
  const [connection, setConnection] = useState(null);
  const [chat, setChat] = useState([]);
  const latestChat = useRef(null);
  const [called, setCalled] = useState(false);

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
            updatedChat.push(message);

            setChat(updatedChat);
          });
          connection.on("ReceiveTyper", (user) => {
            const updatedChat = [...latestChat.current];
            updatedChat.push(`${user} is typing...`);

            setChat(updatedChat);
          });
        })
        .catch((e) => console.log("Connection failed: ", e));
    }
  }, [connection]);

  async function sendMessage(user, message) {
    setCalled(!called);
    const chatMessage = {
      user: user,
      message: message,
    };

    if (connection.connectionStarted) {
      try {
        await connection.send("SendMessage", chatMessage);
      } catch (e) {
        console.log(e);
      }
    } else {
      alert("No connection to server yet.");
    }
  }

  async function sendTyper(user, message) {
    const chatMessage = {
      user: user,
      message: `${user} is typing...`,
    };

    if (connection.connectionStarted && message!=="" && called === false) {
      try {
        await connection.send("SendTyper", chatMessage);
      } catch (e) {
        console.log(e);
      }
    } else {
      alert("No connection to server yet.");
    }
    console.log(sendTyper());
  }
 

  return (
    <div>
      <ChatInput sendMessage={sendMessage} onChangeValue = {sendTyper}/>
      <hr />
      <ChatWindow chat={chat} />
    </div>
  );
}

export default Chat;
