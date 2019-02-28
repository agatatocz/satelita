import React from "react";

const ResultsListItem = ({ item }) => {
  return item ? (
    <li>
      Szerokość geograficzna: {item.x}
      <br />
      Długość geograficzna: {item.y}
      <br />
      Znacznik czasowy: {item.time}
    </li>
  ) : null;
};

export default ResultsListItem;
