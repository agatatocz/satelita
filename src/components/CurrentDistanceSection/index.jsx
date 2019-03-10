import React, { Component } from "react";
import _ from "lodash";
import "../../styles/CurrentDistanceSection.scss";
import InitialButton from "./InitialButton";
import DistanceButton from "./DistanceButton";
import Header from "./Header";

class CurrentDistanceSection extends Component {
  state = {
    currentDistance: null
  };

  getCurrentDistance = () => {
    const { firstResult, fetchData, getDistance } = this.props;
    fetchData().then(({ x, y }) => {
      const currentDistance = _.round(
        getDistance(firstResult.x, firstResult.y, x, y),
        4
      );
      this.setState({ currentDistance });
    });
  };

  render() {
    const { currentDistance } = this.state;
    return (
      <div className="current-distance-section container-div">
        <Header />
        {currentDistance ? (
          <DistanceButton
            currentDistance={currentDistance}
            onClick={this.getCurrentDistance}
          />
        ) : (
          <InitialButton onClick={this.getCurrentDistance} />
        )}
      </div>
    );
  }
}

export default CurrentDistanceSection;
