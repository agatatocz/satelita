import React from "react";
import "../../styles/ResultsSection.scss";
import Header from "./Header";
import ResultsList from "./ResultsList";

const ResultsSection = ({ locations, results }) => {
  return (
    <div className="results container-div">
      <Header />
      <ResultsList locations={locations} results={results} />
    </div>
  );
};

export default ResultsSection;
