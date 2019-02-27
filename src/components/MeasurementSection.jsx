import React, { Component } from "react";
import "../styles/MeasurementSection.scss";

class MeasurementSection extends Component {
  measure = () => {
    let firstFetch;
    this.fetchData().then(data => {
      firstFetch = data;
      this.props.addLocation(firstFetch);
    });

    let promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.fetchData());
      }, this.props.delay * 1000);
    });

    promise.then(secondFetch => {
      this.props.addLocation(secondFetch);

      const distance = this.getDistance(
        firstFetch.x,
        firstFetch.y,
        secondFetch.x,
        secondFetch.y
      );
      const secondsBetween = secondFetch.time - firstFetch.time;
      const kmPerHour = this.getVelocity(distance, secondsBetween / 3600); // km/h

      this.props.addResult({
        secondsBetween,
        distance,
        kmPerHour
      });
    });
  };

  fetchData = async () => {
    let x, y, time;
    await fetch("http://api.open-notify.org/iss-now.json")
      .then(res => res.json())
      .then(res => {
        x = res.iss_position.latitude;
        y = res.iss_position.longitude;
        time = res.timestamp;
      });
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
          min="1"
          max="60"
          value={this.props.delay}
          onChange={e => this.props.setDelay(Number(e.currentTarget.value))}
          className="seconds-slider"
        />
        <button onClick={this.measure}>START</button>
      </div>
    );
  }
}

export default MeasurementSection;
