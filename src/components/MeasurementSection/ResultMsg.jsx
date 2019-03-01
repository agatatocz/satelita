import React from "react";

const ResultMsg = ({ enable, result }) => {
  return enable && result ? (
    <p className="result-msg">
      ISS w ciągu {result.secondsBetween}s przebyła{" "}
      <span style={{ fontWeight: "bold" }}>{result.distance}km </span>
      poruszając się ze średnią prędkością{" "}
      <span style={{ fontWeight: "bold" }}>{result.kmPerHour}km/h</span>.
    </p>
  ) : null;
};

export default ResultMsg;
