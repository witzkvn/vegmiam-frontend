import React from "react";
import RecipesGrid from "../../components/RecipesGrid/RecipesGrid";

import { recettes } from "../../dummydatas";

const HomePage = () => {
  return (
    <div className="HomePage">
      <RecipesGrid recipes={recettes} />
    </div>
  );
};

export default HomePage;
