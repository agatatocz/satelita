import React, { Component } from "react";
import _ from "lodash";
import "../styles/MeasurementSection.scss";

class MeasurementSection extends Component {
  state = {
    newestResult: null
  };

  measure = () => {
    this.setState({ newestResult: null });

    let promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.fetchData());
      }, this.props.delay * 1000);
    });

    this.fetchData()
      .then(data => {
        const firstFetch = data;
        this.props.addLocation(firstFetch);

        promise.then(secondFetch => {
          this.props.addLocation(secondFetch);

          const distance = _.round(
            this.getDistance(
              firstFetch.x,
              firstFetch.y,
              secondFetch.x,
              secondFetch.y
            ),
            4
          );
          const secondsBetween = secondFetch.time - firstFetch.time;
          const kmPerHour = _.round(
            this.getVelocity(distance, secondsBetween / 3600),
            4
          );

          const newestResult = {
            secondsBetween,
            distance,
            kmPerHour
          };

          this.props.addResult(newestResult);
          this.setState({ newestResult });
        });
      })
      .catch(error => console.error(error));
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
    const { newestResult } = this.state;
    return (
      <div className="measurement container-div">
        <h4>
          Aby wyznaczyć prędkość Międzynarodowej Stacji Kosmicznej, należy
          dokonać dwóch odczytów jej położenia.
        </h4>
        <div className="spans">
          <span>Wybierz ilość sekund pomiędzy odczytami:</span>
          <span style={{ fontWeight: "bold" }}>{this.props.delay}s</span>
        </div>
        <input
          type="range"
          min="5"
          max="60"
          value={this.props.delay}
          onChange={e => this.props.setDelay(Number(e.currentTarget.value))}
          className="seconds-slider"
        />
        <button onClick={this.measure}>START</button>
        {newestResult ? (
          <p>
            ISS w ciągu {newestResult.secondsBetween}s przebyła{" "}
            {newestResult.distance}km poruszając się ze średnią prędkością{" "}
            {newestResult.kmPerHour}km/h.
          </p>
        ) : null}
      </div>
    );
  }
}

export default MeasurementSection;
