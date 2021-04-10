import React from "react";

import { recettes } from "../dummydatas";

const HomePage = () => {
  return <div className="HomePage">{recettes && recettes.map((recette) => recette.title)}</div>;
};

export default HomePage;
