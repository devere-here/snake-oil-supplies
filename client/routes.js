import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Route, Switch } from 'react-router-dom'
import axios from 'axios'
import PropTypes from 'prop-types'
import {
  Login, Signup, UserHome, Category,
  SingleProductPage, CartPage, CheckoutPage,
  UserSettings, PastOrderPage,
  UpdateUserSettings, AdminPage,
  UserEdit, ProductEdit, OrderEdit,
  AllUsers, AllProducts, AllOrders
} from './components'

import { me, fetchProducts, updateCart, fetchPastOrders, fetchAllUsers, fetchAllOrders, fetchReviews  } from './store'


export function getCartFromLocalStorage(props) {
  console.log(' in getCartFromLocalStorage, props', props);

  let keys = Object.keys(localStorage);

  let cartProducts = props.products.filter(function (product) {
    return keys.indexOf(product.id.toString()) !== -1
  })

  cartProducts.forEach((cartProduct) => {
    cartProduct.quantity = +localStorage.getItem(cartProduct.id)
  })

  return cartProducts;
}


function mergeCarts(userCart, guestCart) {

  let userCartIdArr = userCart.map((cartItem) => cartItem.id);
  let orderDetailsArray = [];

  guestCart.forEach((guestCartItem) => {
    if (!userCartIdArr.find((cartItemId) => cartItemId === guestCartItem.id)){
      userCart.push(guestCartItem);
      orderDetailsArray.push({
        orderId: userCart.id,
        productId: guestCartItem.id,
        quantity: guestCartItem.quantity
      })
    }
  })

  axios.post('/api/orderDetails', {orderDetailsArray})
  return userCart;
}


/**
 * COMPONENT
 */
class Routes extends Component {
  constructor(props) {
    super(props);
    this.fetchCart = this.fetchCart.bind(this)
    this.conditionallyLoadCart = this.conditionallyLoadCart.bind(this)
  }

  async fetchCart() {
    const userOrder = await axios.get(`/api/orders`)
    let orderDeets = await axios.get(`/api/orderdetails/${userOrder.data[0].id}`, {
      where: { orderId: userOrder.data[0].id }
    });
    let cartProducts = orderDeets.data.map(detail => {
      const productObj = this.props.products.find(product => {
        return detail.productId === product.id
      })
      productObj.quantity = detail.quantity
      return productObj;
    })
    cartProducts.id = userOrder.data[0].id;
    console.log('cartProducts', cartProducts);
    return cartProducts
  }

  async conditionallyLoadCart(nextProps) {
    let cartProducts = [];
    let localStorageCartProducts = getCartFromLocalStorage(nextProps);
    if (nextProps.isLoggedIn) {
      cartProducts = await this.fetchCart()
      cartProducts = mergeCarts(cartProducts, localStorageCartProducts);
      //important I need to make a put request to api/orderDetails, but are we keeping it?
    } else {
      cartProducts = localStorageCartProducts
    }
    console.log('in conditionallyLoadCart', cartProducts);
    this.props.loadCart(cartProducts)
  }


  componentDidMount() {
    this.props.loadInitialData();
    this.props.loadProductReviews();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.products !== this.props.products || nextProps.userId !== this.props.userId) {
      console.log('receive - load cart')
      this.conditionallyLoadCart(nextProps)

      console.log('routes.js admin comp WP', this.props.isAdmin)
      if (this.props.isAdmin) this.props.adminFetch()
    }
  }

  render() {
    const { isLoggedIn, isAdmin } = this.props;
    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/cart" component={CartPage} />
        <Route path="/checkout" component={CheckoutPage} />
        <Route exact path="/category/:name" component={Category} />
        <Route path="/category/:name/:id" component={SingleProductPage} />
        {
          isLoggedIn &&
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route exact path="/home" component={UserHome} />
            <Route exact path="/settings" component={UserSettings} />
            <Route path="/pastorders" component={PastOrderPage} />
            <Route exact path="/settings/updateSettings" component={UpdateUserSettings} />
            {
              isAdmin &&
              <Switch>
                <Route exact path="/admin" component={AdminPage} />
                <Route exact path="/users/admin" component={AllUsers} />
                <Route exact path="/products/admin" component={AllProducts} />
                <Route exact path="/orders/admin" component={AllOrders} />
                <Route exact path="/users/admin/:id" component={UserEdit} />
                <Route exact path="/products/admin/:id" component={ProductEdit} />
                <Route exact path="/orders/admin/:id" component={OrderEdit} />

              </Switch>
            }
          </Switch>
        }

        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  console.log('state in routes.js', state);
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    isAdmin: !!state.user.isAdmin,
    userId: state.user.id,
    products: state.products,
    cart: state.cart,
    users: state.users,
    orders: state.orders,
  }
}

const mapDispatch = (dispatch) => {
  console.log('about to update store');
  return {
    loadInitialData() {
      dispatch(me());
      dispatch(fetchProducts());
    },
    loadCart(cart) {
      dispatch(updateCart(cart));
      dispatch(fetchPastOrders());
    },
    adminFetch() {
      dispatch(fetchAllUsers())
      dispatch(fetchAllOrders())
    },
    loadProductReviews() {
      dispatch(fetchReviews())
    },
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
