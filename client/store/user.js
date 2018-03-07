import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const SET_USER = 'SET_USER'
const REMOVE_USER = 'REMOVE_USER'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const setUser = user => ({type: SET_USER, user})
const removeUser = () => ({type: REMOVE_USER})

/**
 * THUNK CREATORS
 */

export const putUser = (id, user) =>
async (dispatch) => {
  try {
    const updatedUser = await axios.put(`/api/users/${id}`, user)
    dispatch(setUser(updatedUser.data))
    return updatedUser;
  }
  catch (err) {
    console.log(err)
  }
}

export const me = () =>
  dispatch =>
    axios.get('/auth/me')
      .then(res =>
        dispatch(setUser(res.data || defaultUser)))
      .catch(err => console.log(err))

export const auth = (email, password, method) =>
  dispatch =>
    axios.post(`/auth/${method}`, { email, password })
      .then(res => {
        dispatch(setUser(res.data))
        history.push('/home')
      }, authError => { // rare example: a good use case for parallel (non-catch) error handler
        dispatch(setUser({error: authError}))
      })
      .catch(dispatchOrHistoryErr => console.error(dispatchOrHistoryErr))

export const logout = () =>
  dispatch =>
    axios.post('/auth/logout')
      .then(_ => {
        dispatch(removeUser())
        history.push('/login')
      })
      .catch(err => console.log(err))

export const guest = () =>
  dispatch =>
    axios.post('/auth/guest')
      .then((res) => {
        dispatch(setUser(res.data))
      }
    )

/**
 * REDUCER
 */
export default function (state = defaultUser, action) {
  switch (action.type) {
    case SET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    default:
      return state
  }
}
