import React from "react";

const MeasurementSectionResultMsg = ({ enable, result }) => {
  return enable && result ? (
    <p>
      ISS w ciągu {result.secondsBetween}s przebyła {result.distance}km
      poruszając się ze średnią prędkością {result.kmPerHour}km/h.
    </p>
  ) : null;
};

export default MeasurementSectionResultMsg;
