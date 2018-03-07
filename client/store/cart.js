//ACTION TYPES

const UPDATE_CART = 'UPDATE_CART';

//INITIAL STATE
const defaultCart = [];

//ACTION CREATORS
export const updateCart = cart => {
  return {type: UPDATE_CART, cart}};

//REDUCER

export default function (prevState = defaultCart, action){
  switch (action.type){
    case UPDATE_CART:
      return action.cart;
    default:
      return prevState;
  }
}
