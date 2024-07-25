import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
import Visitor from "./pages/Visitor";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/visitor" component={Visitor} />
        <Route path="/" component={Login} />
      </Switch>
    </Router>
  );
};

export default App;
