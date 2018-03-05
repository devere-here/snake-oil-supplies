import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Route, Switch } from 'react-router-dom'
import axios from 'axios'
import PropTypes from 'prop-types'
import { Login, Signup, UserHome, Category, SingleProductPage, CartPage, CheckoutPage, UserSettings, UpdateUserSettings, UserEdit, AdminPage } from './components'
import { me, fetchProducts, updateCart } from './store'

export function getCartFromLocalStorage(props) {

  console.log(' in getCartFromLocalStorage, props', props);

  let keys = Object.keys(localStorage);

  let cartProducts = props.products.filter(function (product) {
    return keys.indexOf(product.id.toString()) !== -1
  })

  // recentAdd - our cart data in state did not have a quantity property. It does now
  cartProducts.forEach((cartProduct) => {
    cartProduct.quantity = +localStorage.getItem(cartProduct.id)

  })

  return cartProducts;

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
    if (nextProps.isLoggedIn) {
      cartProducts = await this.fetchCart()
    } else {
      cartProducts = getCartFromLocalStorage(nextProps);
    }
    console.log('in conditionallyLoadCart', cartProducts);
    this.props.loadCart(cartProducts)
  }

  componentDidMount() {
    this.props.loadInitialData()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.products !== this.props.products || nextProps.userId !== this.props.userId) {
      console.log('receive - load cart')


      this.conditionallyLoadCart(nextProps)
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
            <Route exact path="/settings/updateSettings" component={UpdateUserSettings} />
            {
              isAdmin &&
              <Switch>
                <Route exact path="/admin" component={AdminPage} />
                <Route exact path="/settings/:id" component={UserEdit} />
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
      dispatch(updateCart(cart))
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
