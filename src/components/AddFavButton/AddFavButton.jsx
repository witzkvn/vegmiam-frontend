import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserfavorites } from "../../redux/user/user-selectors";
import { IoHeart, IoHeartOutline } from "react-icons/io5";

import "./AddFavButton.scss";
import { toggleFavRecipeAction } from "../../redux/recipes/recipes-actions";

const AddFavButton = ({ recipeId }) => {
  const dispatch = useDispatch();
  const userFavs = useSelector(selectUserfavorites);
  const recipeIsFav = userFavs.some((id) => id === recipeId);
  const [isFav, setIsFav] = useState(recipeIsFav);

  const toggleFavHandler = async (recipeId) => {
    setIsFav((prevState) => !prevState);
    try {
      await dispatch(toggleFavRecipeAction(recipeId));
    } catch (error) {
      setIsFav((prevState) => !prevState);
    }
  };

  return (
    <div className="AddFavButton" onClick={() => toggleFavHandler(recipeId)}>
      {isFav ? <IoHeart /> : <IoHeartOutline />}
    </div>
  );
};

export default AddFavButton;
