import axios from 'axios'
import history from '../history'

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

// export const postCart = () => async(dispatch) => {
//   try {
//     let cart = await axios.post('/api/orders');
//     dispatch(createCart(cart.data));
//   }
//   catch (err) {
//     console.log(err)
//   }
// }


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
