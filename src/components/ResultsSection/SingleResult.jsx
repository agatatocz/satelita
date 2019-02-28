import React from "react";

const SingleResult = ({ result }) => {
  return result ? (
    <p>
      Czas: {result.secondsBetween}s
      <br />
      Droga: {result.distance} km
      <br />
      Prędkość: {result.kmPerHour} km/h
    </p>
  ) : null;
};

export default SingleResult;
