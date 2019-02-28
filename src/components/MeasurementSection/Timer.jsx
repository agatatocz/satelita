import React, { Component } from "react";

// const colors = ["#FF4015", "#FFA111", "#FFE012", "#BDF50F", "#35FA2A"];
// const firstColor = "#731630";
const firstColor = "#888";
// const secondColor = "rgba(7, 15, 55, 0.8)";
let secondColor = "#1C8516";
const textColor = "#fff";

class Timer extends Component {
  constructor(props) {
    super(props);
    this.canvas = React.createRef();
    this.contex = null;
  }

  componentDidMount() {
    this.contex = this.canvas.current.getContext("2d");
    this.init();
  }

  init = () => {
    const R = this.canvas.current.width / 2;
    const c = this.contex;
    c.translate(R, R);
  };

  draw = () => {
    const { value, maxValue } = this.props;
    const c = this.contex;
    const R = this.canvas.current.width / 2;
    c.clearRect(-R, -R, 2 * R, 2 * R);

    c.beginPath();
    c.fillStyle = firstColor;
    c.arc(0, 0, R, 0, 2 * Math.PI);
    c.fill();
    c.closePath();

    // console.log((maxValue - value) / maxValue);
    // if ((maxValue - value) / maxValue >= 0.25) secondColor = colors[2];
    // if ((maxValue - value) / maxValue >= 0.5) secondColor = colors[3];
    // if ((maxValue - value) / maxValue >= 0.75) secondColor = colors[4];

    c.beginPath();
    c.fillStyle = secondColor;
    c.moveTo(0, 0);
    c.arc(
      0,
      0,
      R,
      1.5 * Math.PI,
      1.5 * Math.PI + ((maxValue - value) / maxValue) * 2 * Math.PI
    );
    c.moveTo(0, 0);
    c.fill();
    c.closePath();

    c.font = "40px Arial";
    c.fillStyle = textColor;
    c.textAlign = "center";
    c.textBaseline = "middle";
    c.fillText(value, 0, 0);
  };

  render() {
    if (this.contex) this.draw();
    let display = "block";
    if (!this.props.enable) display = "none";
    return (
      <canvas
        id="timer"
        ref={this.canvas}
        width="100"
        height="100"
        style={{ display }}
      />
    );
  }
}

export default Timer;
