import axios from 'axios'
import history from '../history'

//ACTION TYPES
const GET_PRODUCTS = 'GET_PRODUCTS';

//INITIAL STATE
const defaultProducts = [];

//ACTION CREATORS
const getProducts = products => ({type: GET_PRODUCTS, products});

//THUNKS

export const fetchProducts = ()
