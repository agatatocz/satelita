import React from "react";
import _ from "lodash";
import "../styles/ResultsSection.scss";
import ResultsListItem from "./ResulstListItem";
import SingleResult from "./SingleResult";

const ResultsSection = ({ locations, results }) => {
  const locationPairs = _.chunk(locations, 2);
  return (
    <div className="results container-div">
      <h4>Twoje pomiary</h4>
      <div className="results-list">
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
    </div>
  );
};

export default ResultsSection;
