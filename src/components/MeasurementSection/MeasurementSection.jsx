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
    const {
      delay,
      fetchData,
      addLocation,
      addResult,
      getDistance,
      getVelocity
    } = this.props;

    this.setState({
      newestResult: null,
      startBtnDisabled: true,
      timerValue: delay
    });

    let promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(fetchData());
      }, delay * 1000);
    });

    fetchData()
      .then(data => {
        console.log(data);
        const firstFetch = data;
        addLocation(firstFetch);

        this.startTimer();

        promise.then(secondFetch => {
          addLocation(secondFetch);

          const distance = _.round(
            getDistance(
              firstFetch.x,
              firstFetch.y,
              secondFetch.x,
              secondFetch.y
            ),
            4
          );
          const secondsBetween = secondFetch.time - firstFetch.time;
          const kmPerHour = _.round(
            getVelocity(distance, secondsBetween / 3600),
            4
          );

          const newestResult = {
            secondsBetween,
            distance,
            kmPerHour
          };

          addResult(newestResult);
          this.setState({ newestResult, startBtnDisabled: false });
        });
      })
      .catch(error => console.error(error));
  };

  startTimer = () => {
    this.setState({ showTimer: true });
    const timer = setInterval(() => {
      this.setState({ timerValue: this.state.timerValue - 1 }, () => {
        if (this.state.timerValue <= 0) this.stopTimer(timer);
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
