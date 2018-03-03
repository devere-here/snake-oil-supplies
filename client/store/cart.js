import axios from 'axios'
import history from '../history'
import { create } from 'domain';

//ACTION TYPES

const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
const EMPTY_CART = 'EMPTY_CART';
const GET_CART = 'GET_CART';
const GET_GUEST_CART = 'GET_GUEST_CART';
const CREATE_CART = 'CREATE_CART';

//INITIAL STATE
const defaultCart = [];

//ACTION CREATORS
//const getCart = cart => ({type: GET_CART, cart});

export const getCart = cart => ({type: GET_CART, cart});
export const createCart = cart => ({type: CREATE_CART, cart});

//const getGuestCart = cartProducts => ({type: GET_GUEST_CART, cart: cartProducts});


//THUNKS
export const fetchCart = (userId) => async(dispatch) => {
  try {
    if (userId){
      let cart = await axios.get('/api/orders'); // need to fix this
      dispatch(getCart(cart.data));
    }
    else
    {
      // return nothing? elsewhere we will make an new cart
    }
  }
  catch (err) {
    console.log(err)
  }
}

export const postCart = () => async(dispatch) => {
  try {
    let cart = await axios.post('/api/orders');
    dispatch(createCart(cart.data));
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
