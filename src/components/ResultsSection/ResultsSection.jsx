import React from "react";
import _ from "lodash";
import "../../styles/ResultsSection.scss";
import ResultsListItem from "./ResulstListItem";
import SingleResult from "./SingleResult";

const ResultsSection = ({ locations, results }) => {
  const locationPairs = _.chunk(locations, 2);
  return (
    <div className="results container-div">
      <h4>Twoje pomiary</h4>
      <div className="popup">
        <i className="fa fa-question-circle-o" aria-hidden="true" />
        <span className="popup-info">
          Czas pomiędzy pomiarami może różnić się od czasu wybranego przez
          Ciebie za pomocą suwaka z uwagi na opóźnienia występujące w ruchu
          sieciowym. Ilość sekund obliczana jest na postawie znaczników
          czasowych informujących, w którym momencie wartości odczytanych
          współrzędnych geograficznych satelity były aktualne.
        </span>
      </div>

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
    </div>
  );
};

export default ResultsSection;
