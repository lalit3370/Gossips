import React, { useEffect, useState } from "react";
import "./App.css";
import MsgComponent from "./components/MsgComponent.js";
import Title from "./components/Title";
import Nav from "./components/Nav";
import CreateMsg from "./components/CreateMsg";
import axios from "axios";

export default function MsgBoardPage(match) {
  var [messages, setMessages] = useState([]);
  var [count, setcount] = useState(0);
  const boardId = match.match.params.id;
  const url = "http://localhost:5000/board/" + boardId; 
  useEffect(() => {
    axios
      .get(url)
      .then(function (response) {
        setcount(Object.keys(response.data).length);
        setMessages(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [count]);
  function updateCount(){
      setcount(count+1);
  }
  const msgs = messages.map((msg) => (
    <MsgComponent key={msg.id} content={msg.content} date={msg.date} />
  ));
  return (
    <div>
      <Nav />
      <Title title={boardId} />
      <CreateMsg
        data={{
            boardId: boardId,
            updateCount: updateCount,
            count: count
        }}
      />
      {msgs}
    </div>
  );
}
