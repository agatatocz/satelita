import React from "react";

const InitialContent = props => {
  return (
    <React.Fragment>
      <h4>
        Aby wyznaczyć prędkość Międzynarodowej Stacji Kosmicznej, należy dokonać
        dwóch odczytów jej położenia.
      </h4>
      <div className="spans">
        <span>Wybierz ilość sekund pomiędzy odczytami:</span>
        <span style={{ fontWeight: "bold" }}>{props.delay}s</span>
      </div>
      <input
        type="range"
        min="5"
        max="60"
        value={props.delay}
        onChange={e => props.setDelay(Number(e.currentTarget.value))}
        className="seconds-slider"
        disabled={props.btnDisabled}
      />
      <button onClick={props.measure} disabled={props.btnDisabled}>
        START
      </button>
    </React.Fragment>
  );
};

export default InitialContent;
