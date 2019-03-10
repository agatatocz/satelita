import React from "react";

const DistanceButton = ({ currentDistance, onClick }) => {
  return (
    <div className="current-distance">
      <span>{currentDistance} km</span>
      <button onClick={onClick}>
        <i className="fa fa-refresh" aria-hidden="true" />
      </button>
    </div>
  );
};

export default DistanceButton;
