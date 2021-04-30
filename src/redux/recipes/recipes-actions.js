import { client } from '../..';
import { RecipesActionTypes } from './recipes-types';

export const setClickedRecipe = (recipe) => ({
  type: RecipesActionTypes.SET_CLICKED_RECIPE,
  payload: recipe,
});

export const getRecipeByIdAction = (recipeID) => {
  return async (dispatch) => {
    try {

      const res = await client().get(`recipes/${recipeID}`)

      if (res.status >= 300) {
        throw new Error('Une erreur est survenue...')
      }
      if (res.data.data.data) {
        dispatch(setClickedRecipe(res.data.data.data))
      }

    } catch (error) {
      throw error
    }
  }
}

export const setRecipesArray = (recipes) => ({
  type: RecipesActionTypes.SET_RECIPES_ARRAY,
  payload: recipes,
});


export const getAllRecipesAction = () => {
  return async (dispatch) => {
    try {
      const res = await client().get('recipes/')

      if (res.status >= 300) {
        throw new Error('Une erreur est survenue...')
      }

      if (res.data.data.data) {
        dispatch(setRecipesArray(res.data.data.data))
      }
    } catch (error) {
      throw error
    }
  }
}


export const createRecipeAction = (recipeObj) => {
  return async (dispatch) => {
    try {
      const formData = new FormData()
      Array.from(recipeObj.images).forEach(img => {
        formData.append('images', img)
      })
      Object.keys(recipeObj).map((key, index) => {
        if (key === "images") return false
        return formData.append(key, recipeObj[key])
      })


      // for (var value of formData.values()) {
      //   console.log(value);
      // }
      const res = await client().post('recipes/', formData)

      if (res.status >= 300) {
        throw new Error('Une erreur est survenue...')
      }

      if (res.data.data.data) {
        // dispatch(setRecipesArray(res.data.data.data))
        console.log(res.data.data.data)
      }
    } catch (error) {
      throw error
    }
  }
}

