import { Box, Paper, Typography } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import axios from "axios";
import "fontsource-roboto";
import React, { useEffect, useState } from "react";
import "./App.css";
import CreateMsg from "../src/components/CreateMsg";
import MsgComponent from "../src/components/MsgComponent.js";

export default function MsgBoardPage(match) {
  const theme = useTheme();
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
  function updateCount() {
    setcount(count + 1);
  }
  const msgs = messages.map((msg) => (
    <Paper>
      <MsgComponent key={msg.id} content={msg.content} date={msg.date} />
    </Paper>
  ));
  return (
    <Box
      display="flex"
      flexDirection="column"
      bgcolor={theme.palette.background.default}
      flex={1}
      height="98vh"
    >
      <Box>
        <Typography variant="h2" color="textPrimary">
          {boardId}
        </Typography>
      </Box>
      <Box>
        <CreateMsg
          data={{
            boardId: boardId,
            updateCount: updateCount,
            count: count,
          }}
        />
      </Box>
      <Box>{msgs}</Box>
    </Box>
  );
}
