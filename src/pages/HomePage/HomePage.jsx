import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import RecipesGrid from "../../components/RecipesGrid/RecipesGrid";

import { recettes } from "../../dummydatas";
import { setRecipesArray } from "../../redux/recipes/recipes-actions";
import { selectRecipesArray } from "../../redux/recipes/recipes-selectors";
import { getAllRecipesAction } from "../../redux/recipes/recipes-actions";

const HomePage = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const recipesArray = useSelector(selectRecipesArray);

  const fetchRecipes = useCallback(async () => {
    setError(null);
    try {
      // console.log("call");
      await dispatch(getAllRecipesAction());
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, [dispatch]);

  useEffect(() => {
    setIsLoading(true);
    fetchRecipes().then(() => setIsLoading(false));
  }, [fetchRecipes]);

  // if (isLoading) {
  //   return <p>Chargement ...</p>;
  // }

  if (error) {
    return <p>Une erreur est survenue : {error}</p>;
  }

  return (
    <div className="HomePage">
      <RecipesGrid recipes={recipesArray} isLoading={isLoading} />
    </div>
  );
};

export default HomePage;
