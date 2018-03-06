import axios from 'axios'

const SET_ORDERS = 'SET_ORDERS';

const defaultOrders = [];

export const setOrders = (orders) => ({type: SET_ORDERS, orders});

//THUNKS

export const fetchAllOrders = () => async(dispatch) => {
  try {
    const orders = await axios.get(`/api/orders/admin`)
    dispatch(setOrders(orders.data));
  }
  catch (err) {
    console.log(err)
  }
}

//REDUCER
export default function (prevState = defaultOrders, action){
  switch (action.type){
    case SET_ORDERS:
    return action.orders;
    default:
      return prevState;
  }
}
