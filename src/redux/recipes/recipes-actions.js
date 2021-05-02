import { client } from '../..';
import { openPopupMessageAction } from '../layout/layout-actions';
import { setCurrentUserAction } from '../user/user-actions';
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
      const res = await client().get('recipes/?fields=title,slug,images,time,difficulty,ratingsAverage')

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

export const getAllRecipesFromUserByIdAction = (userId) => {
  return async (dispatch) => {
    try {
      const res = await client().get(`recipes/user/${userId}/?fields=title,slug,images,time,difficulty,ratingsAverage`)

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

export const getFavoritesRecipesAction = () => {
  return async (dispatch) => {
    try {
      const res = await client().get('recipes/fav')

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

export const updateRecipeByIdAction = (recipeObj, recipeId) => {
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

      const res = await client().patch(`recipes/modify/${recipeId}`, formData)

      if (res.status >= 300) {
        throw new Error('Une erreur est survenue...')
      }

    } catch (error) {
      throw error
    }
  }
}
export const deleteRecipeByIdAction = (recipeId) => {
  return async (dispatch) => {
    try {
      const res = await client().delete(`recipes/delete/${recipeId}`)

      if (res.status >= 300) {
        throw new Error('Une erreur est survenue...')
      }
      console.log(res)
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}


export const toggleFavRecipeAction = (recipeId) => {
  return async (dispatch) => {
    try {
      const res = await client().get(`recipes/fav/${recipeId}`)

      if (res.status >= 300) {
        dispatch(openPopupMessageAction('error', 'Une erreur est survenue...'))
        throw new Error('Une erreur est survenue...')
      }

      if (res.data.data.data) {
        dispatch(setCurrentUserAction(res.data.data.data))
        localStorage.setItem("user", JSON.stringify(res.data.data.data));
      }
    } catch (error) {
      dispatch(openPopupMessageAction('error', 'Une erreur est survenue...'))
      throw error
    }
  }
}

