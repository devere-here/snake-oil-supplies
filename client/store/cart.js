import axios from 'axios'
import history from '../history'
import { create } from 'domain';

//ACTION TYPES

const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
const EMPTY_CART = 'EMPTY_CART';
const GET_GUEST_CART = 'GET_GUEST_CART';
const UPDATE_CART = 'UPDATE_CART';

//INITIAL STATE
const defaultCart = [];

//ACTION CREATORS
export const updateCart = cart => {
  console.log('action', cart)
  return {type: UPDATE_CART, cart}};

//THUNKS

// export const updateUserCartThunk = (id, cartOrder) => async(dispatch) => {
//   try {
//     let obj = {
//       quantity: cartOrder.quantity,
//       productId: cartOrder.id
//       orderId:
//     }
//     let orderDeets = await axios.put(`/api/orderDetails/${id}`, obj)
//   }
//   catch (err) {
//     console.log(err)
//   }

// }

export const postCart = () => async(dispatch) => {
  try {
    let cart = await axios.post('/api/orders');
    dispatch(createCart(cart.data));
  }
  catch (err) {
    console.log(err)
  }
}


//REDUCER

export default function (prevState = defaultCart, action){
  switch (action.type){
    case UPDATE_CART:
      console.log('in reducer', action.cart);
      return action.cart;
    default:
      return prevState;
  }
}

// using localStorage window object. cart in the store should
// not be necessary


// case GET_CART:
//       return Object.assign({}, prevState, action.cart);
//       //return action.cart;
