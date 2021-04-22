import React from "react";
import RecipeCard from "../RecipeCard/RecipeCard";

import "./RecipesGrid.scss";

const RecipesGrid = ({ recipes, isLoading }) => {
  if (isLoading) {
    return (
      <div className="RecipesGrid">
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />
      </div>
    );
  }
  return (
    <div className="RecipesGrid">
      {recipes?.map((recette) => (
        <RecipeCard recipe={recette} />
      ))}
    </div>
  );
};

export default RecipesGrid;
