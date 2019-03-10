import React from "react";

const InitialButton = ({ onClick }) => {
  return (
    <button onClick={onClick}>
      KLIK!{" "}
      <i
        className="fa fa-rocket"
        aria-hidden="true"
        style={{ marginLeft: 10 }}
      />
    </button>
  );
};

export default InitialButton;
