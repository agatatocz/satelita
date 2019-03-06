import React from "react";
import _ from "lodash";
import ResultsListItem from "./ResulstListItem";
import SingleResult from "./SingleResult";

const ResultsList = ({ locations, results }) => {
  const locationPairs = _.chunk(locations, 2);
  return (
    <div className="results-list">
      {locations.length ? null : (
        <p>Wykonaj pierwsze pomiary klikając "START"!</p>
      )}
      <ol>
        {locationPairs.map((pair, i) => (
          <div className="results-list-item-div" key={pair[0].time}>
            <ResultsListItem item={pair[0]} />
            <ResultsListItem item={pair[1]} />
            <SingleResult result={results[i]} />
          </div>
        ))}
      </ol>
    </div>
  );
};

export default ResultsList;
