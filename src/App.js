import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from './pages/Home';
import Login from './pages/Login';
import Landing from './pages/Landing';
import AzureCameraUI from "./pages/AzureCameraUI";

import './App.css';

function App() {
  return (
    <Router>
      {/* A <Switch> looks through its children <Route>s and renders the first one that matches the current URL. */}
      <Switch>
        <Route exact path="/">
          <Landing/>
        </Route>
        <Route path="/login">
          <Login/>
        </Route>
        <Route path="/home">
          <Home/>
        </Route>
        <Route path="/add">
          <AzureCameraUI/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
