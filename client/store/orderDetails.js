import axios from 'axios'

const FETCH_ORDER_DETAILS = 'FETCH_ORDER_DETAILS';

const defaultOrderDetails = [];

export const getOrderDetails = cart => ({type: FETCH_ORDER_DETAILS, cart});

//THUNKS

export const fetchOrderDetails = () => async(dispatch) => {
  try {
    const order = await axios.get(`/api/orders/`)
    const orderDetails = await axios.get(`/api/orderDetails/${order.data[0].id}`)
    dispatch(getOrderDetails(orderDetails));
  }
  catch (err) {
    console.log(err)
  }
}


export default function (prevState = defaultOrderDetails, action){
  switch (action.type){
    case FETCH_ORDER_DETAILS:
    return action.cart;
    default:
      return prevState;
  }
}
