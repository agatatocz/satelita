import React, { Component } from "react";
import "./styles/App.scss";
import HomePage from "./components/HomePage";
import Background from "./components/Background";

class App extends Component {
  componentDidMount() {
    let first;
    this.fetchData().then(data => (first = data));
    let promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.fetchData());
      }, 1000);
    });

    promise.then(second => {
      const distance = this.getDistance(
        first[0],
        first[1],
        second[0],
        second[1]
      );
      console.log("distance:", distance);
      console.log(
        "velocity: ",
        this.getVelocity(distance, (second[2] - first[2]) / 3600),
        "km/h"
      );
    });
  }

  fetchData = async () => {
    let x, y, time;
    await fetch("http://api.open-notify.org/iss-now.json")
      .then(res => res.json())
      .then(res => {
        console.log(res);
        x = res.iss_position.latitude;
        y = res.iss_position.longitude;
        time = res.timestamp;
      });
    console.log([x, y, time]);
    return [x, y, time];
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
      <React.Fragment>
        <Background />
        <HomePage />
      </React.Fragment>
    );
  }
}

export default App;
