import React, { Component } from "react";
import _ from "lodash";
import "../../styles/MeasurementSection.scss";
import ResultMsg from "./ResultMsg";
import InitialContent from "./InitialContent";
import Timer from "./Timer";

class MeasurementSection extends Component {
  state = {
    newestResult: null,
    startBtnDisabled: false,
    showTimer: false,
    timerValue: 0
  };

  measure = () => {
    this.setState({
      newestResult: null,
      startBtnDisabled: true,
      timerValue: this.props.delay
    });

    let promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.fetchData());
      }, this.props.delay * 1000);
    });

    this.fetchData()
      .then(data => {
        const firstFetch = data;
        this.props.addLocation(firstFetch);

        this.startTimer();

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
          this.setState({ newestResult, startBtnDisabled: false });
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

  startTimer = () => {
    this.setState({ showTimer: true });
    const timer = setInterval(() => {
      this.setState({ timerValue: this.state.timerValue - 1 }, () => {
        if (this.state.timerValue < 0) this.stopTimer(timer);
      });
    }, 1000);
  };

  stopTimer = timer => {
    this.setState({ showTimer: false });
    clearInterval(timer);
  };

  render() {
    const {
      newestResult,
      startBtnDisabled,
      showTimer,
      timerValue
    } = this.state;
    return (
      <div className="measurement container-div">
        <InitialContent
          delay={this.props.delay}
          setDelay={this.props.setDelay}
          measure={this.measure}
          btnDisabled={startBtnDisabled}
        />
        <Timer
          enable={showTimer}
          value={timerValue}
          maxValue={this.props.delay}
        />
        <ResultMsg enable={!showTimer} result={newestResult} />
      </div>
    );
  }
}

export default MeasurementSection;
