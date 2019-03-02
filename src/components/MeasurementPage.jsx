import React, { Component } from "react";
import MeasurementSection from "./MeasurementSection/MeasurementSection";
import ResultsSection from "./ResultsSection/ResultsSection";
import CurrentDistanceSection from "./CurrentDistanceSection/CurrentDistanceSection";
import "../styles/MeasurementPage.scss";

class MeasurementPage extends Component {
  state = {
    locations: [],
    results: [],
    delay: 5
    // currentDistance: null
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

  // setCurrentDistance = currentDistance => {
  //   this.setState({ currentDistance });
  // };

  fetchData = async () => {
    let x, y, time;
    await fetch("http://api.open-notify.org/iss-now.json")
      .then(res => res.json())
      .then(res => {
        x = res.iss_position.latitude;
        y = res.iss_position.longitude;
        time = res.timestamp;
      })
      .catch(error => console.error(error));
    return { x, y, time };
  };

  getDistance = (x1, y1, x2, y2) => {
    return (
      Math.sqrt(
        Math.pow(x2 - x1, 2) +
          Math.pow(Math.cos((x1 * Math.PI) / 180) * (y2 - y1), 2)
      ) *
      (40075.704 / 360)
    );
  };

  getVelocity = (distance, time) => {
    return distance / time;
  };

  render() {
    const { locations, results, delay } = this.state;
    return (
      <div className="measurement-page">
        <MeasurementSection
          delay={delay}
          setDelay={this.setDelay}
          addLocation={this.addLocation}
          addResult={this.addResult}
          fetchData={this.fetchData}
          getDistance={this.getDistance}
          getVelocity={this.getVelocity}
        />
        <ResultsSection locations={locations} results={results} />
        {locations.length > 1 ? (
          <CurrentDistanceSection
            firstResult={locations[0]}
            fetchData={this.fetchData}
            getDistance={this.getDistance}
          />
        ) : null}
      </div>
    );
  }
}

export default MeasurementPage;
