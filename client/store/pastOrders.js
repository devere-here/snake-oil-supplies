import axios from 'axios'
import history from '../history'

//ACTION TYPES

const GET_PAST_ORDERS = 'GET_PAST_ORDERS';

//INITIAL STATE
const defaultOrders = [];

//ACTION CREATORS

const getPastOrders = pastOrders => ({ type: GET_PAST_ORDERS, pastOrders })

//THUNKS

export const fetchPastOrders = () => async (dispatch) => {
  try {
    const pastOrders = await axios.get('/api/orders/pastOrders');
    dispatch(getPastOrders(pastOrders.data));
    return pastOrders
  }
  catch (err) {
    console.log(err)
  }
}

//REDUCER

export default function (prevState = defaultOrders, action) {
  switch (action.type) {
    case GET_PAST_ORDERS:
      return action.pastOrders;
    default:
      return prevState;
  }
}


