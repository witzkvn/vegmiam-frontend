import { client } from '../..';
import { UserActionTypes } from './user-types'

// export const rulesAcceptedAction = (history) => {
//   return dispatch => {
//     rulesAccepted()
//       .then(rep => {
//         dispatch(getCurrentUserAction());
//         history.push('/search')
//       })
//       .catch(err => {
//         dispatch(openNotificationPopup('Une erreur est survenue. Nous faisons le nécessaire pour résoudre le problème.'))
//       })
//   }
// }


// export const deleteUserErrors = () => ({
//   type: UserActionTypes.DELETE_USER_ERRORS,
// });

export const setCurrentUserAction = (user) => ({
  type: UserActionTypes.SET_CURRENT_USER,
  payload: user,
});
export const setClickedUserAction = (user) => ({
  type: UserActionTypes.SET_CLICKED_USER,
  payload: user,
});


export const getUserByIdAction = (userId) => {
  return async dispatch => {
    try {
      const res = await client().get(`users/${userId}`)

      if (res.status >= 300) {
        throw new Error('Une erreur est survenue...')
      }

      if (res.data.data.data) {
        // dispatch(setClickedUserAction(res.data.data.data))
        return res.data.data.data
      }
    } catch (error) {
      throw error
    }
  }
}


export const updateUserAtion = (newSettingsObj) => {
  return async dispatch => {

    try {
      let updatedField;
      if (newSettingsObj.avatar) {
        updatedField = new FormData()
        updatedField.append('avatar', newSettingsObj.avatar)
      } else {
        updatedField = JSON.stringify(newSettingsObj)
      }

      console.log(updatedField)
      const res = await client().patch(`users/updateMe`, updatedField)

      if (res.status >= 300) {
        throw new Error('Une erreur est survenue...')
      }


      if (res.data.data.user) {
        dispatch(setCurrentUserAction(res.data.data.user))
        localStorage.setItem('user', JSON.stringify(res.data.data.user))
        return res.data.data.user
      }
    } catch (error) {
      throw error
    }
  }
}


