import React from "react";

const Header = () => {
  return (
    <React.Fragment>
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
    </React.Fragment>
  );
};

export default Header;
