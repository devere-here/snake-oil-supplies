import axios from 'axios'

//ACTION TYPES
const GET_USERS = 'GET_USERS'

//INITIAL STATE
const defaultUsers = []

//ACTION CREATORS
const getUsers = users => ({ type: GET_USERS, users })

//THUNK CREATORS
export const fetchAllUsers = () => async (dispatch) => {
  try {
    const allUsers = await axios.get('/api/users/admin')
    dispatch(getUsers(allUsers.data))
  } catch (err) {
    console.log(err)
  }
}

// REDUCER
export default function (state = defaultUsers, action) {
  switch (action.type) {
    case GET_USERS:
      return action.users
    default:
      return state
  }
}
