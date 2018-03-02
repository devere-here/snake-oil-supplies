import axios from 'axios'
import history from '../history'

//ACTION TYPES

const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
const EMPTY_CART = 'EMPTY_CART';
const GET_CART = 'GET_CART';
const GET_GUEST_CART = 'GET_GUEST_CART';

//INITIAL STATE
const defaultCart = [];

//ACTION CREATORS
//const getCart = cart => ({type: GET_CART, cart});

export const getCart = cart => ({type: GET_CART, cart});




//const getGuestCart = cartProducts => ({type: GET_GUEST_CART, cart: cartProducts});


//THUNKS
export const fetchCart = (userId) => async(dispatch) => {
  try {

    let cart;

    if (userId){

      cart = await axios.get('/api/products');
      dispatch(getCart(cart.data));
    }
  }
  catch (err) {
    console.log(err)
  }
}


export const fetchGuestCart = (cartProducts) => async(dispatch) => {
  try {
    dispatch(getCart(cartProducts))
  }
  catch (err) {
    console.log(err)
  }
}


//REDUCER

export default function (prevState = defaultCart, action){
  switch (action.type){
    case GET_CART:
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
