import React from "react";
import { Link } from "react-router-dom";
import { timeConvert } from "../../helper/functions/timeConverter";
import AddFavButton from "../AddFavButton/AddFavButton";
import { IoTimeOutline, IoStar } from "react-icons/io5";

import "./RecipeCard.scss";

const RecipeCard = ({ recipe }) => {
  if (!recipe) {
    return (
      <div className="RecipeCard loading">
        <div className="RecipeCard__top loadingBox">
          <div className="RecipeCard__image"></div>
        </div>
        <div className="RecipeCard__bottom">
          <div className="RecipeCard__title loadingBox"></div>
          <div className="RecipeCard__stats">
            <div className="RecipeCard__stat loadingBox"></div>
            <div className="RecipeCard__stat loadingBox"></div>
            <div className="RecipeCard__stat loadingBox"></div>
          </div>
        </div>
      </div>
    );
  }

  const getDifficultyNumberArray = (difficulty) => {
    switch (difficulty) {
      case "facile":
        return [1];
      case "difficile":
        return [1, 1, 1];
      default:
        return [1, 1];
    }
  };

  return (
    <div className="RecipeCard">
      <AddFavButton
        onClick={(e) => {
          e.stopPropagation();
        }}
        recipeId={recipe._id}
      />

      <Link className="RecipeCard__wrapper" to={`/recette/${recipe._id}${recipe.slug ? `/${recipe.slug}` : ""}`}>
        <div className="RecipeCard__top">
          <img src={recipe.images[0]} alt="aperçu de la recette" />
        </div>
        <div className="RecipeCard__bottom">
          <h3>{recipe.title}</h3>
          <div className="RecipeCard__stats">
            <div className="RecipeCard__stat">
              <IoTimeOutline />
              <p>{timeConvert(recipe.time)}</p>
            </div>
            <div className="RecipeCard__stat">
              {getDifficultyNumberArray().map((item) => (
                <IoStar />
              ))}
            </div>
            <div className="RecipeCard__stat">{`${recipe.ratingsAverage}/5`}</div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default RecipeCard;
