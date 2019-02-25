import React from "react";
import "../styles/HomePage.scss";

const HomePage = () => {
  return (
    <div className="home-page">
      <h1>Międzynarodowa Stacja Kosmiczna (ISS)</h1>
      <p>
        okrąża Ziemię 15 razy dziennie, co oznacza, że musi poruszać się bardzo
        szybko.
        <br />
        Zobacz jaka jest prędkość ISS w tej chwili!
      </p>
      <button>Zaczynamy!</button>
    </div>
  );
};

export default HomePage;
