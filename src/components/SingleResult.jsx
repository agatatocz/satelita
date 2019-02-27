import React from "react";
import _ from "lodash";

const SingleResult = ({ result }) => {
  return result ? (
    <p>
      Czas: {result.secondsBetween}s
      <br />
      Droga: {_.round(result.distance, 4)} km
      <br />
      Prędkość: {_.round(result.kmPerHour, 4)} km/h
    </p>
  ) : null;
};

export default SingleResult;
