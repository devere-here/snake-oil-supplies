import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import products from './products'
import cart from './cart'
import orderDetails from './orderDetails'
import users from './users'
import pastOrders from './pastOrders'
import orders from './orders'
import review from './review'

const reducer = combineReducers({user, products, cart, orderDetails, users, pastOrders, orders, review})
const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
))
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './products'
export * from './cart'
export * from './orderDetails'
export * from './pastOrders'
export * from './users'
export * from './orders'
export * from './review'

