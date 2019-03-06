import React, { Component } from "react";
import _ from "lodash";
import MeasurementSection from "./MeasurementSection/MeasurementSection";
import ResultsSection from "./ResultsSection/ResultsSection";
import CurrentDistanceSection from "./CurrentDistanceSection/CurrentDistanceSection";
import "../styles/MeasurementPage.scss";

class MeasurementPage extends Component {
  state = {
    locations: [],
    results: [],
    delay: 5
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

  fetchData = async () => {
    let x, y, time;
    await fetch("http://api.open-notify.org/iss-now.json")
      .then(res => res.json())
      .then(res => {
        x = res.iss_position.latitude;
        y = res.iss_position.longitude;
        time = res.timestamp;
      })
      .catch(() => {
        alert(
          "Ups! Wystąpił błąd podczas pobierania danych. Sprawdź połączenie internetowe i spróbuj jeszcze raz."
        );
      });
    if (x && y && time) return { x, y, time };
    return null;
  };

  getDistance = (x1, y1, x2, y2) => {
    const R = 6500 + 400; //promień ziemi + odległość ISS od ziemi (km)
    x1 = (x1 * Math.PI) / 180;
    y1 = (y1 * Math.PI) / 180;
    x2 = (x2 * Math.PI) / 180;
    y2 = (y2 * Math.PI) / 180;

    const a =
      Math.sin((x2 - x1) / 2) * Math.sin((x2 - x1) / 2) +
      Math.cos(x1) *
        Math.cos(x2) *
        Math.sin((y2 - y1) / 2) *
        Math.sin((y2 - y1) / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return _.round(R * c, 4);
  };

  getVelocity = (distance, time) => {
    return _.round(distance / time, 4);
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
