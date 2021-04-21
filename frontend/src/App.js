import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./pages/HomePage";
import MsgBoardPage from "./pages/MsgBoardPage";

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
