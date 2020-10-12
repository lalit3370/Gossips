import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route}  from 'react-router-dom'; 
import MsgBoardPage from './MsgBoardPage';
import Home from './Home';
function App() {

  return (
      <Router>
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/board/:id" component={MsgBoardPage}/>
        </Switch>
      </Router>
  );
}

export default App;
