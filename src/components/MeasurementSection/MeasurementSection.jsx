import React, { Component } from "react";
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

    fetchData().then(data => {
      if (data) {
        const firstFetch = data;
        addLocation(firstFetch);

        this.startTimer();

        let promise = new Promise(resolve => {
          setTimeout(() => {
            resolve(fetchData());
          }, delay * 1000);
        });

        promise.then(secondFetch => {
          addLocation(secondFetch);

          const distance = getDistance(
            firstFetch.x,
            firstFetch.y,
            secondFetch.x,
            secondFetch.y
          );
          const secondsBetween = secondFetch.time - firstFetch.time;
          const kmPerHour = getVelocity(distance, secondsBetween / 3600);

          const newestResult = {
            secondsBetween,
            distance,
            kmPerHour
          };

          addResult(newestResult);
          this.setState({ newestResult });
        });
      }
      this.setState({ startBtnDisabled: false });
    });
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

    const { delay, setDelay } = this.props;

    return (
      <div className="measurement container-div">
        <InitialContent
          delay={delay}
          setDelay={setDelay}
          measure={this.measure}
          btnDisabled={startBtnDisabled}
        />
        <Timer enable={showTimer} value={timerValue} maxValue={delay} />
        <ResultMsg enable={!showTimer} result={newestResult} />
      </div>
    );
  }
}

export default MeasurementSection;
