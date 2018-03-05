import axios from 'axios'

const FETCH_ORDER_DETAILS = 'FETCH_ORDER_DETAILS';


const defaultOrderDetails = [];

export const getOrderDetails = cart => ({type: FETCH_ORDER_DETAILS, cart});

//THUNKS

export const fetchOrderDetails = (userId) => (dispatch) => {
  try {
    if (userId){
      axios.get('/api/orders')
      .then((order) => {
        axios.get(`/api/orderDetails/${order.data[0].id}`)
        .then((orderDetails) => {
          dispatch(getOrderDetails(orderDetails));
        })
      });
    }
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
