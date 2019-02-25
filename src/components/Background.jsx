import React, { Component } from "react";
import _ from "lodash";

class Background extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stars: [],
      numberOfStars: window.innerWidth / 2,
      starsColors: ["#FFFFF6", "#FFF38B", "#FFF163"],
      minRadius: 0.5,
      maxRadius: 1.5
    };
    this.canvas = React.createRef();
    this.contex = null;
    window.onresize = this.canvasInit;
  }

  componentDidMount() {
    this.canvasInit();
  }

  canvasInit = () => {
    this.setState({ numberOfStars: window.innerWidth / 2 });
    this.canvas.current.width = window.innerWidth;
    this.canvas.current.height = window.innerHeight;
    this.contex = this.canvas.current.getContext("2d");
    this.starsInit();
  };

  draw = () => {
    const { width, height } = this.canvas.current;
    this.contex.fillStyle = "#040533";
    this.contex.fillRect(0, 0, width, height);
    this.state.stars.map(star => star.draw(this.contex));
  };

  starsInit = () => {
    const { minRadius, maxRadius, numberOfStars, starsColors } = this.state;
    const { width, height } = this.canvas.current;
    let stars = [];
    let x, y, dx, dy, radius, color;
    for (let i = 0; i < numberOfStars; i++) {
      radius = _.random(minRadius, maxRadius, true);
      x = _.random(radius, width - radius);
      y = _.random(0, height - radius);
      dx = _.random(-5, 5);
      dy = _.random(0, 4);
      color = starsColors[_.random(0, starsColors.length)];
      stars.push(new Star(x, y, dx, dy, radius, color));
    }
    this.setState({ stars }, () => {
      this.draw();
    });
  };

  render() {
    return (
      <canvas className="canvas" ref={this.canvas} style={{ zIndex: -100 }} />
    );
  }
}

export default Background;

class Star {
  constructor(x, y, dx, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;
  }

  draw(contex) {
    contex.beginPath();
    contex.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    contex.fillStyle = this.color;
    contex.strokeStyle = this.color;
    contex.fill();
    contex.stroke();
  }
}
