import React from "react";
import RecipeCard from "../RecipeCard/RecipeCard";

import "./RecipesGrid.scss";

const RecipesGrid = ({ recipes }) => {
  return (
    <div className="RecipesGrid">
      {recipes.map((recette) => (
        <RecipeCard recipe={recette} />
      ))}
    </div>
  );
};

export default RecipesGrid;
