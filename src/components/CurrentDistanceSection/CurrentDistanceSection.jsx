import React, { Component } from "react";
import _ from "lodash";
import "../../styles/CurrentDistanceSection.scss";

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
        <h3>
          Sprawdź, jaką drogę przebyła ISS od czasu twojego pierwszego pomiaru!
        </h3>

        {currentDistance ? (
          <div className="current-distance">
            <span>{currentDistance} km</span>
            <button onClick={this.getCurrentDistance}>
              <i className="fa fa-refresh" aria-hidden="true" />
            </button>
          </div>
        ) : (
          <button onClick={this.getCurrentDistance}>
            KLIK!{" "}
            <i
              className="fa fa-rocket"
              aria-hidden="true"
              style={{ marginLeft: 10 }}
            />
          </button>
        )}
      </div>
    );
  }
}

export default CurrentDistanceSection;
