import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Login, Signup, UserHome, Category, SingleProductPage, CartPage} from './components'
import {me, fetchProducts, fetchCart, fetchGuestCart} from './store'

export function getCartFromLocalStorage(props){

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
  // constructor(props) {

  //   super(props);
  //   this.getCartFromLocalStorage = this.getCartFromLocalStorage.bind(this);
  // }

  componentDidMount () {
    this.props.loadInitialData();
    console.log('in componentDidMount in routes');

    if (this.props.isLoggedIn){
      console.log('in routes about to load cart');
      this.props.loadUsersCart(this.props.userId)
    } else {
      // let keys = Object.keys(localStorage);
      // let cartProducts = this.props.products.filter(function (product) {
      //   return keys.indexOf(product.id.toString()) !== -1
      // })
      let cartProducts = getCartFromLocalStorage(this.props);

      this.props.loadGuestCart(cartProducts);
    }

  }

  componentWillReceiveProps(nextProps){

    console.log('in componentWillReceiveProps in routes');


    //recentAdd guest cart didn't get stored with state until page refresh
    //this is because our getCartFromLocalStorage depends on the store having all the products
    //this did not happen when getCartFromLocalStorage was in componentDidMount because
    //this.props.loadInitialData() did not finish getting products from the database

    //recentAdd we also had a bug
    // we had (userId and user are never equal to each other)'nextProps.userId !== this.props.user'
    // changed to this 'nextProps.user !== this.props.user'



    if (nextProps.products !== this.props.products || nextProps.userId !== this.props.userId) {

      if (nextProps.isLoggedIn){
        this.props.loadUsersCart(nextProps.userId)
      } else {

        let cartProducts = getCartFromLocalStorage(nextProps);

        this.props.loadGuestCart(cartProducts);

      }

    }

    console.log('componentWillReceiveProps in routes is over. Our props will be', nextProps);


  }

  getCartFromLocalStorage(props){

    let keys = Object.keys(localStorage);

    return props.products.filter(function (product) {
      return keys.indexOf(product.id.toString()) !== -1
    })

  }



  render () {
    const {isLoggedIn} = this.props;
    console.log('routes', this.props)
    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/cart" component={CartPage} />
        <Route exact path="/category/:name" component={Category} />
        <Route path="/category/:name/:id" component={SingleProductPage} />
        {
          isLoggedIn &&
            <Switch>
              {/* Routes placed here are only available after logging in */}
              <Route path="/home" component={UserHome} />
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
    userId: state.user.id,
    products: state.products,
    cart: state.cart

  }
}

const mapDispatch = (dispatch) => {
  console.log('about to update store');
  return {
    loadInitialData () {
      dispatch(me());
      dispatch(fetchProducts());
    },
    loadUsersCart(userId) {
      dispatch(fetchCart(userId))
    },
    loadGuestCart(arr){
      dispatch(fetchGuestCart(arr))
    }
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






// OldCode - from componentDid Mount
// if (this.props.isLoggedIn){
    //   this.props.loadUsersCart(this.props.userId);
    // } else {
    //   // let keys = Object.keys(localStorage);
    //   // let cartProducts = this.props.products.filter(function (product) {
    //   //   return keys.indexOf(product.id.toString()) !== -1
    //   // })
    //   console.log('this.props', this.props);
    //   let cartProducts = getCartFromLocalStorage(this.props);
    //   console.log('in routes cartProducts componentDidMount', cartProducts);
    //   console.log('should be arr of 2');

    //   this.props.loadGuestCart(cartProducts);
    // }

// OldCode - from componentWillReceiveProps
// if (nextProps.userId !== this.props.user) {
    //   //this.props.loadUsersCart(nextProps.userId)
    //   console.log('IN IF STATEMENT 1');

    //   if (this.props.isLoggedIn){
    //     this.props.loadUsersCart(nextProps.userId)
    //   } else {

    //     // let keys = Object.keys(localStorage);
    //     // let cartProducts = nextProps.products.filter(function (product) {
    //     //   return keys.indexOf(product.id.toString()) !== -1
    //     // })

    //     let cartProducts = getCartFromLocalStorage(nextProps);
    //     console.log('in routes cartProducts willreceiveprops', cartProducts);
    //     console.log('should be arr of 2');

    //     this.props.loadGuestCart(cartProducts);

    //   }
    // }
