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
      maxRadius: 2,
      shootingStar: null
    };
    this.canvas = React.createRef();
    this.contex = null;
    window.onresize = this.canvasInit;
    // window.onloadend = this.canvasInit;
  }

  componentDidMount() {
    this.contex = this.canvas.current.getContext("2d");
    this.canvasInit();
    setInterval(this.draw, 20);
  }

  canvasInit = () => {
    this.setState({ numberOfStars: window.innerWidth / 2 });
    this.canvas.current.width = window.innerWidth;
    this.canvas.current.height = Math.max(
      window.innerHeight,
      document.documentElement.scrollHeight
    );
    // console.log("scroll", document.documentElement.scrollHeight);
    // console.log("client", document.documentElement.clientHeight);
    // console.log("inner", window.innerHeight);
    // console.log(
    //   "max",
    //   Math.max(window.innerHeight, document.documentElement.scrollHeight)
    // );
    this.starsInit();
  };

  draw = () => {
    const { width, height } = this.canvas.current;
    const { stars, shootingStar } = this.state;
    this.contex.fillStyle = "rgba(4, 5, 51, 0.3)";
    this.contex.fillRect(0, 0, width, height);
    stars.map(star => star.draw(this.contex));
    if (shootingStar) {
      shootingStar.draw(this.contex);
      shootingStar.move();
    }

    if (!this.isStarOnScreen(shootingStar)) this.createShootingStar();
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
      dx = 0;
      dy = 0;
      color = starsColors[_.random(0, starsColors.length)];
      stars.push(new Star(x, y, dx, dy, radius, color));
    }
    this.setState({ stars }, () => {
      this.draw();
    });
  };

  createShootingStar = () => {
    const { minRadius, maxRadius, starsColors } = this.state;
    const { width, height } = this.canvas.current;
    const radius = _.random(minRadius + 2, maxRadius + 2, true);
    let dx = _.random(-radius, radius);
    let dy = _.random(-radius, radius);

    if (dx > -1 && dx < 1) dx = _.random(1, radius);
    if (dy > -1 && dy < 1) dy = _.random(-radius, -1);

    const shootingStar = new Star(
      _.random(radius, width - radius),
      _.random(0, height - radius),
      dx,
      dy,
      radius,
      starsColors[_.random(0, starsColors.length)]
    );

    this.setState({ shootingStar });
  };

  isStarOnScreen = star => {
    const { width, height } = this.canvas.current;
    return (
      star && star.x > 0 && star.x < width && star.y > 0 && star.y < height
    );
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
    contex.fill();
  }

  move() {
    this.x += this.dx;
    this.y += this.dy;
  }
}
