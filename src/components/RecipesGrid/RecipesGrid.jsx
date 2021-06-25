import React from "react";
import { useSelector } from "react-redux";
import Pagination from "../Pagination/Pagination";
import RecipeCard from "../RecipeCard/RecipeCard";

import "./RecipesGrid.scss";

import { selectRecipesArray } from "../../redux/recipes/recipes-selectors";
import { useEffect } from "react";

const RecipesGrid = ({ isLoading }) => {
  const recipesArray = useSelector(selectRecipesArray);

  useEffect(() => {
    document.getElementsByClassName("App__right")[0].scrollTo(0, 0);
  }, [recipesArray]);

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
  if (!recipesArray) {
    return <p>Aucun favoris pour le moment.</p>;
  }

  return (
    <>
      <div className="RecipesGrid">
        {recipesArray?.map((recette) => (
          <RecipeCard key={recette?._id} recipe={recette} />
        ))}
      </div>
      <Pagination />
    </>
  );
};

export default RecipesGrid;
