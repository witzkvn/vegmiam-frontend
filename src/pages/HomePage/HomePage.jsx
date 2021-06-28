import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import RecipesGrid from "../../components/RecipesGrid/RecipesGrid";
import { getAllRecipesAction, setRecipesArray } from "../../redux/recipes/recipes-actions";
import { getSearchApiUrl } from "../../helper/functions/getSearchApiUrl";
import { selectSearchParams } from "../../redux/search/search-selectors";

const HomePage = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const searchObj = useSelector(selectSearchParams);

  const fetchRecipes = useCallback(
    async (fetchUrl) => {
      setError(null);
      try {
        await dispatch(getAllRecipesAction(fetchUrl));
      } catch (error) {
        setError(error?.response?.data?.message);
      }
      setIsLoading(false);
    },
    [dispatch]
  );

  useEffect(() => {
    setIsLoading(true);
    fetchRecipes(getSearchApiUrl(searchObj)).then(() => setIsLoading(false));

    return () => {
      dispatch(setRecipesArray([]));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, fetchRecipes]);

  if (error) {
    return <p>Une erreur est survenue : {error}</p>;
  }

  return (
    <div className="HomePage">
      <RecipesGrid isLoading={isLoading} />
    </div>
  );
};

export default HomePage;
