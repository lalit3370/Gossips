import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MsgBoardPage from "./pages/MsgBoardPage";
import Home from "./pages/HomePage";

import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";

function App() {
  const theme = createMuiTheme({
    palette: {
      type: "dark",
      primary: {
        light: "#a6d4fa",
        main: "#90caf9",
        dark: "#648dae",
      },
    },
  });

  document.body.style.backgroundColor = theme.palette.background.default;
  return (
    <Router>
      <Switch>
        <ThemeProvider theme={theme}>
          <Route path="/" exact component={Home} />
          <Route path="/board/:id" component={MsgBoardPage} />
        </ThemeProvider>
      </Switch>
    </Router>
  );
}

export default App;
