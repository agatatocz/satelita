import React, { Component } from "react";
import Measurement from "./Measurement";
import Results from "./Results";
import CurrentDistance from "./CurrentDistance";
import "../styles/MeasurementPage.scss";

class MeasurementPage extends Component {
  state = {};
  render() {
    return (
      <div className="measurement-page">
        <Measurement />
        <Results />
        <CurrentDistance />
      </div>
    );
  }
}

export default MeasurementPage;
