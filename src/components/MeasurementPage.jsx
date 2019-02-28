import React, { Component } from "react";
import MeasurementSection from "./MeasurementSection/MeasurementSection";
import ResultsSection from "./ResultsSection/ResultsSection";
import CurrentDistanceSection from "./CurrentDistanceSection/CurrentDistanceSection";
import "../styles/MeasurementPage.scss";

class MeasurementPage extends Component {
  state = {
    locations: [],
    results: [],
    delay: 5,
    currentDistance: null
  };

  addLocation = location => {
    const locations = [...this.state.locations];
    locations.push(location);
    this.setState({ locations });
  };

  addResult = result => {
    const results = [...this.state.results];
    results.push(result);
    this.setState({ results });
  };

  setDelay = delay => {
    this.setState({ delay });
  };

  setCurrentDistance = currentDistance => {
    this.setState({ currentDistance });
  };

  render() {
    return (
      <div className="measurement-page">
        <MeasurementSection
          delay={this.state.delay}
          setDelay={this.setDelay}
          addLocation={this.addLocation}
          addResult={this.addResult}
        />
        <ResultsSection
          locations={this.state.locations}
          results={this.state.results}
        />
        <CurrentDistanceSection />
      </div>
    );
  }
}

export default MeasurementPage;
