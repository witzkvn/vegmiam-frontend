import React from "react";
import { Link } from "react-router-dom";
import { timeConvert } from "../../helper/functions/timeConverter";

import "./RecipeCard.scss";

const RecipeCard = ({ recipe }) => {
  return (
    <Link className="RecipeCard" to={`/recette/${recipe.id}`}>
      <div className="RecipeCard__top">
        <img src={recipe.images[0]} alt="aperçu de la recette" />
      </div>
      <div className="RecipeCard__bottom">
        <h3>{recipe.title}</h3>
        <div className="RecipeCard__stats">
          <div className="RecipeCard__stat">
            <p>{timeConvert(recipe.time)}</p>
          </div>
          <div className="RecipeCard__stat">
            <p>{recipe.difficulty}</p>
          </div>
          <div className="RecipeCard__stat">{`${recipe.rating}/5`}</div>
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;
