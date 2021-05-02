import React, { useCallback, useEffect, useRef, useState } from "react";

import { IoCloseCircle } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router";
import CustomButton from "../../components/CustomButton/CustomButton";
import { createRecipeAction, updateRecipeByIdAction } from "../../redux/recipes/recipes-actions";
import { selectClickedRecipe } from "../../redux/recipes/recipes-selectors";

import "./AddRecipePage.scss";

export const IngredientInput = ({ index, handleDeleteCustomInput, handleCustomInputChange, values }) => {
  return (
    <div className="RecipeCustomInput">
      <div className="RecipeCustomInput__group">
        <label htmlFor={`name-${index}`}>Nom</label>
        <input
          type="text"
          id={`name-${index}`}
          value={values.name}
          required
          onChange={(e) => handleCustomInputChange(index, "ingredients", "name", e.target.value)}
        />
      </div>
      <div className="RecipeCustomInput__group">
        <label htmlFor={`quantity-${index}`}>Quantité</label>
        <input
          type="number"
          id={`quantity-${index}`}
          min={1}
          max={10000}
          step={0.1}
          value={values.quantity}
          required
          onChange={(e) => handleCustomInputChange(index, "ingredients", "quantity", e.target.value)}
        />
      </div>
      <div className="RecipeCustomInput__group">
        <label htmlFor={`unit-${index}`}>Unité</label>
        <input
          type="text"
          value={values.unite}
          id={`unite-${index}`}
          onChange={(e) => handleCustomInputChange(index, "ingredients", "unite", e.target.value)}
        />
      </div>
      {index === 0 && (
        <div className="RecipeCustomInput__delete">
          <div className="iconButton noCursor"></div>
        </div>
      )}
      {index > 0 && (
        <div className="RecipeCustomInput__delete" onClick={() => handleDeleteCustomInput(index, "ingredients")}>
          <div className="iconButton">
            <IoCloseCircle />
          </div>
        </div>
      )}
    </div>
  );
};

export const StepInput = ({ index, handleDeleteCustomInput, handleCustomInputChange, values }) => {
  return (
    <div className="RecipeCustomInput">
      <div className="RecipeCustomInput__group">
        <label htmlFor={`etape-${index}`}>Description de l'étape {index + 1}</label>
        <textarea
          name="etape"
          id={`etape-${index}`}
          value={values.description}
          required
          onChange={(e) => handleCustomInputChange(index, "steps", "description", e.target.value)}
        />
      </div>
      {index === 0 && (
        <div className="RecipeCustomInput__delete">
          <div className="iconButton noCursor"></div>
        </div>
      )}

      {index > 0 && (
        <div className="RecipeCustomInput__delete" onClick={() => handleDeleteCustomInput(index, "steps")}>
          <div className="iconButton">
            <IoCloseCircle />
          </div>
        </div>
      )}
    </div>
  );
};

const AddRecipePage = ({ history, location }) => {
  const dispatch = useDispatch();
  const { pathname } = location;
  const clickedRecipe = useSelector(selectClickedRecipe);
  const clickedRecipeId = clickedRecipe?._id;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const imagesInput = useRef();
  const [recipe, setRecipe] = useState({
    title: "",
    description: "",
    difficulty: "moyen",
    time: 5,
    images: {},
    category: "plat",
    themes: [],
    themesString: "",
    ingredients: [
      {
        quantity: 1,
        name: "",
        unite: "",
      },
    ],
    steps: [
      {
        description: "",
      },
    ],
    otherLink: "",
  });

  useEffect(() => {
    if (pathname === "/modifier" && clickedRecipe) {
      setRecipe({
        title: clickedRecipe?.title,
        description: clickedRecipe?.description,
        difficulty: clickedRecipe?.difficulty,
        time: clickedRecipe?.time,
        images: clickedRecipe?.images,
        actualImages: clickedRecipe?.images,
        category: clickedRecipe?.category,
        // themes: clickedRecipe?.themes,
        themesString: clickedRecipe?.themes?.join(),
        ingredients: clickedRecipe?.ingredients,
        steps: clickedRecipe?.steps,
        otherLink: clickedRecipe?.otherLink,
      });
    }
  }, [clickedRecipe, pathname]);

  const handleAddIngredient = () => {
    setRecipe((prevState) => ({
      ...prevState,
      ingredients: [
        ...prevState.ingredients,
        {
          quantity: 1,
          name: "",
          unite: "",
        },
      ],
    }));
  };
  const handleAddStep = () => {
    setRecipe((prevState) => ({
      ...prevState,
      steps: [
        ...prevState.steps,
        {
          description: "",
        },
      ],
    }));
  };

  const handleDeleteCustomInput = (index, field) => {
    setRecipe((prevState) => {
      const itemsArray = [...prevState[field]];
      itemsArray.splice(index, 1);
      return {
        ...prevState,
        [field]: itemsArray,
      };
    });
  };

  const handleCustomInputChange = (index, field, subField, value) => {
    setRecipe((prevState) => {
      const itemToUpdate = { ...prevState[field][index] };
      itemToUpdate[subField] = value;
      const itemsArrayCopy = [...prevState[field]];
      itemsArrayCopy[index] = itemToUpdate;

      return {
        ...prevState,
        [field]: itemsArrayCopy,
      };
    });
  };

  const handleInputChange = (field, value) => {
    setRecipe((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleSubmit = useCallback(async () => {
    setError("");
    setIsLoading(true);
    try {
      const recipeCopy = { ...recipe };
      recipeCopy.ingredients = JSON.stringify(recipeCopy.ingredients);
      recipeCopy.steps = JSON.stringify(recipeCopy.steps);
      if (pathname === "/modifier") {
        await dispatch(updateRecipeByIdAction(recipeCopy, clickedRecipeId));
      } else {
        await dispatch(createRecipeAction(recipeCopy));
      }
      history.push("/");
    } catch (error) {
      console.log(error);
      setError(error?.response?.data?.message || "Merci de vérifier les champs renseignés.");
    }
    setIsLoading(false);
  }, [recipe, pathname, history, dispatch, clickedRecipeId]);

  useEffect(() => {
    const valuesArray = recipe.themesString.split(",").map((item) => item.trim());
    const purValuesArray = valuesArray.filter((val) => val !== "");
    handleInputChange("themes", purValuesArray);
  }, [recipe.themesString]);

  return (
    <form className="AddRecipePage pageWrapWidth" onSubmit={(e) => e.preventDefault()}>
      <h1>Ajouter une recette</h1>

      <p>Attention : si vous quittez la page, la recette ne sera pas sauvegardée.</p>

      <div className="form-group">
        <label htmlFor="title">
          <h2>Titre*</h2>
        </label>
        <input type="text" id="title" onChange={(e) => handleInputChange("title", e.target.value)} value={recipe.title} required />
      </div>

      <div className="form-group">
        <label htmlFor="description">
          <h2>Description courte</h2>
        </label>
        <textarea
          name="description"
          id="description"
          maxLength="600"
          onChange={(e) => handleInputChange("description", e.target.value)}
          value={recipe.description}
        />
      </div>

      <div className="form-group">
        <label htmlFor="difficulty">
          <h2>Difficulté</h2>
        </label>
        <select name="difficulty" id="difficulty" onChange={(e) => handleInputChange("difficulty", e.target.value)} value={recipe.difficulty}>
          <option value="facile">Facile</option>
          <option value="moyen">Moyen</option>
          <option value="difficile">Difficile</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="time">
          <h2>Temps estimé</h2> (en minutes)*
        </label>
        <input type="number" id="time" min="5" max="4320" required onChange={(e) => handleInputChange("time", e.target.value)} value={recipe.time} />
      </div>

      <div className="form-group">
        <label>
          <h2>Catégorie</h2>
        </label>
        <select name="category" id="category" onChange={(e) => handleInputChange("category", e.target.value)} value={recipe.category}>
          <option value="entree">Entree</option>
          <option value="plat">Plat</option>
          <option value="dessert">Dessert</option>
          <option value="boisson">Boisson</option>
          <option value="snack">Snack</option>
          <option value="fromage">Fromage</option>
          <option value="petit-dejeuner">Petit-déjeuner</option>
          <option value="autre">Autre</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="themes">
          <h2>Thème(s)</h2> (séparez les mots-clés par des virgules)
        </label>
        <input type="text" id="themes" onChange={(e) => handleInputChange("themesString", e.target.value)} value={recipe.themesString} />
      </div>

      {/* ingredients */}
      <div className="form-group">
        <label>
          <h2>Liste des ingrédients* </h2> (précisez les quantités pour 1 portion)
        </label>
        {recipe.ingredients.map((ingredient, index) => (
          <IngredientInput
            key={`ingredient-${index}`}
            index={index}
            handleDeleteCustomInput={handleDeleteCustomInput}
            handleCustomInputChange={handleCustomInputChange}
            values={recipe.ingredients[index]}
          />
        ))}
        {recipe.ingredients.length < 20 ? (
          <CustomButton type="button" level="secondary" onClick={handleAddIngredient}>
            Ajouter
          </CustomButton>
        ) : (
          <p>Vous avez atteint le nombre maximum d'ingrédients.</p>
        )}
      </div>

      {/* etapes */}
      <div className="form-group">
        <label>
          <h2>Liste des étapes*</h2>
        </label>
        {recipe.steps.map((step, index) => (
          <StepInput
            key={`step-${index}`}
            index={index}
            handleDeleteCustomInput={handleDeleteCustomInput}
            handleCustomInputChange={handleCustomInputChange}
            values={recipe.steps[index]}
          />
        ))}

        {recipe.steps.length < 20 ? (
          <CustomButton type="button" level="secondary" onClick={handleAddStep}>
            Ajouter
          </CustomButton>
        ) : (
          <p>Vous avez atteint le nombre maximum d'étapes.</p>
        )}
      </div>

      {/* images - reste à connecter au state */}
      <div className="form-group">
        <label htmlFor="images">
          <h2>Image(s)</h2> (attention, au maxiumum 3 images seront conservées)
        </label>
        {pathname === "/modifier" ? (
          <>
            <p>Pour modifier les images, vous devrez re-sélectionner l'ensemble des images désirées. Vos images actuelles :</p>
            <div className="actual-images">
              {recipe?.actualImages?.length > 0
                ? recipe.actualImages.map((img, index) => (
                    <div className="actual-images__image" key={img}>
                      <img src={img} alt="recipe illustration" />
                    </div>
                  ))
                : "Aucune image pour le moment."}
            </div>
          </>
        ) : null}
        <input
          ref={imagesInput}
          type="file"
          id="images"
          name="images"
          multiple
          accept="image/png, image/jpeg"
          onChange={(e) => {
            handleInputChange("images", imagesInput.current.files);
          }}
          files={recipe.images}
        />
      </div>

      <div className="form-group">
        <label htmlFor="link">
          <h2>Lien utile</h2>
        </label>
        <input type="text" id="link" onChange={(e) => handleInputChange("otherLink", e.target.value)} value={recipe.otherLink} />
      </div>

      {error && (
        <div className="AddRecipePage__error">
          <p className="error-text">Une erreur est survenue :</p>
          <p className="error-text">{error}</p>
        </div>
      )}

      <CustomButton type="submit" onClick={handleSubmit} level="primary">
        {isLoading ? "Chargement ..." : pathname === "/modifier" ? "Modifier la carte" : "Publier la recette"}
      </CustomButton>
    </form>
  );
};

export default withRouter(AddRecipePage);

// MODEL

// {
//   "title": "Lasagnes aux légumes",
//   "description": "Un superbe plat de lasagnes riche en légumes et facile à faire. Redécouvrez une recette classique revisitée aux légumes du soleil. Idéal pour faire le plein d'énergie !",
//   "difficulty": "moyen",
//   "ratingsAverage": 4.2,
//   "ratingsQuantity": 6,
//   "time": 50,
//   "images": [
//     "https://s3-eu-west-1.amazonaws.com/images-ca-1-0-1-eu/recipe_photos/original/548/lasagnes-de-legumes-0.jpg",
//     "https://cac.img.pmdstatic.net/fit/http.3A.2F.2Fprd2-bone-image.2Es3-website-eu-west-1.2Eamazonaws.2Ecom.2Fcac.2F2018.2F09.2F25.2F1e5a6bf4-7fc5-4d5f-8baf-1f9a12081497.2Ejpeg/748x372/quality/80/crop-from/center/lasagnes-aux-legumes-grilles-et-pesto-rosso.jpeg",
//     "https://www.regal.fr/sites/art-de-vivre/files/r61_lasagnes-legumes-soleil_bw.jpg"
//   ],
//   "category": "plat",
//   "themes": ["italien", "pates", "tomate", "four"],
//   "otherLink": "https://www.youtube.com/watch?v=xEUAP2pYPQw",
//   "user": "6075b328d1fa521eb4ef2da8",
//   "ingredients": [
//     {
//       "quantity": 2,
//       "name": "aubergines",
//       "unite": ""
//     },
//     {
//       "quantity": 3,
//       "name": "poivrons",
//       "unite": ""
//     },
//     {
//       "quantity": 35,
//       "name": "farine",
//       "unite": "g"
//     },
//     {
//       "quantity": 50,
//       "name": "lait",
//       "unite": "cL"
//     },
//     {
//       "quantity": 2,
//       "name": "parmesan",
//       "unite": "cas"
//     }
//   ],
//   "steps": [
//     {
//       "description": "Eplucher et couper les aubergines en gros dés."
//     },
//     {
//       "description": "Cuire immédiatement à l'eau frémissante pendant 10' égoutter et presser."
//     },
//     {
//       "description": "Suer les oignons et l'ail à l'huile d'olive."
//     },
//     {
//       "description": "Ajouter les poivrons épluchés en lanières et laisser étuver 10 minutes."
//     },
//     {
//       "description": "Suer les aubergines à l'huile d'olive et ajouter le parmesan."
//     },
//     {
//       "description": "Poser une première couche de plaques de lasagnes au fond du plat huilé."
//     },
//     {
//       "description": "Déposer uniformément les aubergines suées et répartir le pesto."
//     },
//     {
//       "description": "Mettre au four 45 minutes à 170°C."
//     }
//   ]
// }
