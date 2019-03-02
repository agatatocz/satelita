import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "font-awesome/css/font-awesome.min.css";
import "./styles/App.scss";
import Background from "./components/Background";
import HomePage from "./components/HomePage";
import MeasurementPage from "./components/MeasurementPage";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <Background />
          <Switch>
            <Route path="/pomiary" component={MeasurementPage} />
            <Route path="/" component={HomePage} />
          </Switch>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
