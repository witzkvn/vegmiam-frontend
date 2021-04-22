import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";

import { recettes } from "../../dummydatas";
import { getReadableDate, timeConvert } from "../../helper/functions/timeConverter";
import { getRecipeByIdAction } from "../../redux/recipes/recipes-actions";
import { selectClickedRecipe } from "../../redux/recipes/recipes-selectors";

import "./RecipeDetailPage.scss";
import defaultAvatar from "../../assets/default.jpg";

const RecipeDetailPage = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const { id } = useParams();
  const clickedRecipe = useSelector(selectClickedRecipe);

  const fetchRecipe = useCallback(
    async (id) => {
      setError(null);
      try {
        await dispatch(getRecipeByIdAction(id));
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    },
    [dispatch]
  );

  useEffect(() => {
    setIsLoading(true);
    fetchRecipe(id);
  }, [id, fetchRecipe]);

  if (isLoading) {
    return <p>Chargement ...</p>;
  }

  if (error) {
    return <p>Une erreur est survenue...</p>;
  }

  return (
    <div className="RecipeDetailPage">
      <h2 className="RecipeDetailPage__title">{clickedRecipe?.title}</h2>

      <div className="RecipeDetailPage__meta">
        <p>
          Publié {clickedRecipe?.createdAt ? `le ${getReadableDate(clickedRecipe.createdAt)}, ` : ""}
          {clickedRecipe?.user?.name ? `par ${clickedRecipe.user.name}` : "par un(e) vrai(e) chef(fe) Vegmiam !"}
        </p>
        <div className="userAvatar">
          {clickedRecipe?.user?.avatar && clickedRecipe?.user?.avatar !== "default.jpg" ? (
            <img src={clickedRecipe?.user?.avatar} alt="user avatar" />
          ) : (
            <img src={defaultAvatar} alt="user avatar" />
          )}
        </div>
      </div>

      <div className="RecipeDetailPage__images">
        {clickedRecipe?.images.map((img) => (
          <img src={img} alt={`recette ${clickedRecipe?.title}`} className="RecipeDetailPage__image" />
        ))}
      </div>

      <div className="RecipeDetailPage__stats">
        <div className="RecipeDetailPage__stat">
          <p>Durée :</p>
          <p>{clickedRecipe?.time ? timeConvert(clickedRecipe.time) : "0h30"}</p>
        </div>
        <div className="RecipeDetailPage__stat">
          <p>Difficulté: </p>
          <p>{clickedRecipe?.difficulty ? clickedRecipe.difficulty : "Moyen"}</p>
        </div>
        <div className="RecipeDetailPage__stat">
          <p>Note moyenne: </p>
          <p>
            {clickedRecipe?.ratingsAverage ? clickedRecipe.ratingsAverage : "3.5"}
            <span>{clickedRecipe?.ratingsQuantity && `(${clickedRecipe.ratingsQuantity} notes)`}</span>
          </p>
        </div>
        <div className="RecipeDetailPage__stat">
          <p>Catégorie : </p>
          <p>{clickedRecipe?.category ? clickedRecipe.category : "Divers"}</p>
        </div>
      </div>

      <div className="RecipeDetailPage__ingredients"></div>
    </div>
  );
};

export default RecipeDetailPage;
