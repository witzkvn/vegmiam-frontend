import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import RecipesGrid from "../../components/RecipesGrid/RecipesGrid";
import { getFavoritesRecipesAction, setRecipesArray } from "../../redux/recipes/recipes-actions";

import "./FavoritesPage.scss";

const FavoritesPage = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const fetchRecipes = useCallback(async () => {
    setError(null);
    try {
      await dispatch(getFavoritesRecipesAction());
    } catch (error) {
      setError(error?.response?.data?.message);
    }
    setIsLoading(false);
  }, [dispatch]);

  useEffect(() => {
    setIsLoading(true);
    fetchRecipes().then(() => setIsLoading(false));

    return () => {
      dispatch(setRecipesArray([]));
    };
  }, [dispatch, fetchRecipes]);

  if (error) {
    return <p>Une erreur est survenue : {error}</p>;
  }

  return (
    <div className="FavoritesPage">
      <h1>Vos Favoris</h1>
      <RecipesGrid isLoading={isLoading} />
    </div>
  );
};

export default FavoritesPage;
