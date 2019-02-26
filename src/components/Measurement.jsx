import React, { Component } from "react";
import "../styles/Measurement.scss";

class Measurement extends Component {
  state = {
    seconds: 1
  };

  setSeconds = seconds => {
    seconds = Number(seconds);
    this.setState({ seconds });
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
          <span style={{ fontWeight: "bold" }}>{this.state.seconds}s</span>
        </div>
        <input
          type="range"
          min="1"
          max="60"
          value={this.state.seconds}
          onChange={e => this.setSeconds(e.currentTarget.value)}
          className="seconds-slider"
        />
        <button>START</button>
      </div>
    );
  }
}

export default Measurement;
