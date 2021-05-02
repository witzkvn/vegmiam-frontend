import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, withRouter } from "react-router";

import { recettes } from "../../dummydatas";
import { getReadableDate, timeConvert } from "../../helper/functions/timeConverter";
import { deleteRecipeByIdAction, getRecipeByIdAction } from "../../redux/recipes/recipes-actions";
import { selectClickedRecipe } from "../../redux/recipes/recipes-selectors";
import ImageFullscreenSlider from "../../components/ImageFullscreenSlider/ImageFullscreenSlider";

import "./RecipeDetailPage.scss";
import { selectCurrentUser } from "../../redux/user/user-selectors.js";
import AddFavButton from "../../components/AddFavButton/AddFavButton";
import UserAvatar from "../../components/UserAvatar/UserAvatar";
import CustomButton from "../../components/CustomButton/CustomButton";
import { Link } from "react-router-dom";
import AlertOverlayPopup from "../../components/AlertOverlayPopup/AlertOverlayPopup";
import { closeOverlayMessageAction, openOverlayMessageAction } from "../../redux/layout/layout-actions";

import { IoArrowBack } from "react-icons/io5";

const RecipeDetailPage = ({ history }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const [portions, setPortions] = useState(2);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageFullscreen, setImageFullscreen] = useState(false);
  const [error, setError] = useState();
  const [deleteError, setDeleteError] = useState();
  const { id } = useParams();
  const clickedRecipe = useSelector(selectClickedRecipe);

  const fetchRecipe = useCallback(
    async (id) => {
      setError(null);
      try {
        await dispatch(getRecipeByIdAction(id));
      } catch (error) {
        setError(error?.response?.data?.message);
      }
      setIsLoading(false);
    },
    [dispatch]
  );

  useEffect(() => {
    setIsLoading(true);
    fetchRecipe(id);
  }, [id, fetchRecipe]);

  if (error) {
    return <p>Une erreur est survenue...</p>;
  }

  const handlePortionsChange = (e) => {
    const newPortionsValue = parseInt(e.target.value);
    setPortions(newPortionsValue);
  };

  if (isLoading) {
    return (
      <div className="RecipeDetailPage loading">
        <div className="RecipeDetailPage__title loadingBox pageWrapWidth"></div>

        <div className="RecipeDetailPage__meta pageWrapWidth loadingBox"></div>

        <div className="RecipeDetailPage__images">
          <div className="RecipeDetailPage__image loadingBox"></div>
          <div className="RecipeDetailPage__image loadingBox"></div>
          <div className="RecipeDetailPage__image loadingBox"></div>
        </div>

        <div className="RecipeDetailPage__stats loadingBox pageWrapWidth"></div>

        <div className="RecipeDetailPage__sectionLoading pageWrapWidth">
          <div className="RecipeDetailPage__sectionLoading--title loadingBox"></div>
          <div className="RecipeDetailPage__sectionLoading--content loadingBox"></div>
        </div>
        <div className="RecipeDetailPage__sectionLoading pageWrapWidth">
          <div className="RecipeDetailPage__sectionLoading--title loadingBox"></div>
          <div className="RecipeDetailPage__sectionLoading--content loadingBox"></div>
        </div>
      </div>
    );
  }

  const handleOpenImageSlider = (imgUrl) => {
    setSelectedImage(imgUrl);
    setImageFullscreen(true);
  };

  const handleCloseImageSlider = () => {
    setImageFullscreen(false);
    setSelectedImage(null);
  };

  const handleDeleteRecipe = async () => {
    setDeleteError(null);
    try {
      await dispatch(deleteRecipeByIdAction(clickedRecipe?._id));
      history.push("/");
    } catch (error) {
      setDeleteError(error?.response?.data?.message || "Une erreur est survenue lors de la suppression de la recette. Merci de réessayer.");
    }
    dispatch(closeOverlayMessageAction());
  };

  return (
    <>
      <AlertOverlayPopup bgOnClick={() => dispatch(closeOverlayMessageAction())}>
        <p>Etes-vous sûr de vouloir supprimer cette recette ? Elle sera définitivement perdue.</p>
        <div className="AlertOverlayPopup__buttons">
          <CustomButton onClick={() => dispatch(closeOverlayMessageAction())} level="secondary">
            Annuler
          </CustomButton>
          <CustomButton onClick={handleDeleteRecipe} level="primary">
            Supprimer
          </CustomButton>
        </div>
      </AlertOverlayPopup>

      {imageFullscreen && <ImageFullscreenSlider imgUrl={selectedImage} handleCloseImageSlider={handleCloseImageSlider} />}

      <div className="RecipeDetailPage">
        {deleteError && <p>Une erreur est survenue lors de la suppression... Merci de réessayer.</p>}
        <div className="RecipeDetailPage__header">
          <div className="RecipeDetailPage__header--block">
            <IoArrowBack onClick={() => history.goBack()} />
          </div>
          <div className="RecipeDetailPage__header--central">
            <h1 className="RecipeDetailPage__header--title">{clickedRecipe?.title}</h1>
            {clickedRecipe?.user?._id === currentUser?._id && (
              <div className="RecipeDetailPage__header--actions">
                <Link to="/modifier">Modifier</Link>
                <p onClick={() => dispatch(openOverlayMessageAction())}>Supprimer</p>
              </div>
            )}
          </div>
          <div className="RecipeDetailPage__header--block">
            <AddFavButton recipeId={clickedRecipe?._id} />
          </div>
        </div>

        <div className="RecipeDetailPage__meta pageWrapWidth">
          <p>
            Publié {clickedRecipe?.createdAt ? `le ${getReadableDate(clickedRecipe.createdAt)}, ` : ""}
            {clickedRecipe?.user?.name ? `par ${clickedRecipe.user.name}` : "par un(e) vrai(e) chef(fe) Vegmiam !"}
          </p>
          <UserAvatar userId={clickedRecipe?.user?._id} imgSrc={clickedRecipe?.user?.avatar} />
        </div>

        {clickedRecipe?.images?.length > 0 && (
          <div className="RecipeDetailPage__images">
            {clickedRecipe?.images.map((img, index) => (
              <img
                key={`${clickedRecipe?.id}-image-${index}`}
                src={img}
                alt={`recette ${clickedRecipe?.title}`}
                className="RecipeDetailPage__image"
                onClick={() => handleOpenImageSlider(img)}
              />
            ))}
          </div>
        )}

        {clickedRecipe?.description && (
          <div className="RecipeDetailPage__description pageWrapWidth">
            <p>{clickedRecipe?.description}</p>
          </div>
        )}

        <div className="RecipeDetailPage__stats pageWrapWidth">
          <div className="RecipeDetailPage__stat">
            <p>Durée</p>
            <p>{clickedRecipe?.time ? timeConvert(clickedRecipe.time) : "0h30"}</p>
          </div>
          <div className="RecipeDetailPage__stat">
            <p>Difficulté</p>
            <p>{clickedRecipe?.difficulty ? clickedRecipe.difficulty : "Moyen"}</p>
          </div>
          <div className="RecipeDetailPage__stat">
            <p>Note</p>
            <p>{clickedRecipe?.ratingsAverage ? clickedRecipe.ratingsAverage : "3.5"}/5</p>
            <p>{(clickedRecipe?.ratingsQuantity || clickedRecipe?.ratingsQuantity === 0) && `(${clickedRecipe.ratingsQuantity} notes)`}</p>
          </div>
          <div className="RecipeDetailPage__stat">
            <p>Catégorie</p>
            <p>{clickedRecipe?.category ? clickedRecipe.category : "Divers"}</p>
          </div>
        </div>

        <div className="RecipeDetailPage__ingredients pageWrapWidth">
          <div className="RecipeDetailPage__ingredients--top">
            <h2>Ingrédients</h2>
            <div className="RecipeDetailPage__ingredients--ratio">
              <input id="portions" type="number" min="1" max="100" value={portions} onChange={handlePortionsChange} />
              <label htmlFor="portions">Portions</label>
            </div>
          </div>
          <ul className="RecipeDetailPage__ingredients--bottom">
            {clickedRecipe?.ingredients.map((ingredient, index) => (
              <li key={`${clickedRecipe?.id}-ingredient-${index}`} className="RecipeDetailPage__ingredient">
                <span className="RecipeDetailPage__ingredient--quantity">
                  {Math.ceil(ingredient?.quantity * portions)}
                  {ingredient.unite ? ` ${ingredient.unite}` : ""}
                </span>
                <span className="RecipeDetailPage__ingredient--name">{ingredient?.name}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="RecipeDetailPage__etapes pageWrapWidth">
          <h2>Etapes</h2>
          <div className="RecipeDetailPage__etapes--wrapper">
            {clickedRecipe?.steps.map((step, index) => (
              <div className="RecipeDetailPage__etapes--item" key={`${clickedRecipe?.id}-image-${index}`}>
                <p className="RecipeDetailPage__etapes--stepNumber">{index + 1}.</p>
                <p className="RecipeDetailPage__etapes--step">{step?.description}</p>
              </div>
            ))}
          </div>
        </div>

        {clickedRecipe?.otherLink && (
          <div className="RecipeDetailPage__otherLink pageWrapWidth">
            <h2>Lien utile</h2>
            <div className="RecipeDetailPage__otherLink--link">
              <p>L'auteur de cette recette propose un lien utile : </p>
              <a href={clickedRecipe.otherLink} target="_blank" rel="noreferrer">
                Voir le lien
              </a>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default withRouter(RecipeDetailPage);
