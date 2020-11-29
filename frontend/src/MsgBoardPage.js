import React, { useEffect, useState } from "react";
import "./App.css";
import MsgComponent from "./components/MsgComponent.js";
import Title from "./components/Title";
import Nav from "./components/Nav";
import CreateMsg from "./components/CreateMsg";
import axios from "axios";
import { Grid, Typography, Paper } from "@material-ui/core";
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function MsgBoardPage(match) {
  const classes = useStyles();
  const theme = createMuiTheme({
    palette: {
      type: "light",
    }
  });
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
    <Grid item xs={12}><Paper><MsgComponent key={msg.id} content={msg.content} date={msg.date} /></Paper></Grid>
  ));
  return (
    <ThemeProvider theme={theme}>
      <Nav />
      <Title title={boardId} />
      <CreateMsg
        data={{
          boardId: boardId,
          updateCount: updateCount,
          count: count
        }}
      />
      <br />
      <Grid
        container
        direction="column"
        alignItems="stretch"
        spacing={3}
        style={{ minHeight: '100vh' }}
      >
        {msgs}
      </Grid>
    </ThemeProvider>

  );
}
