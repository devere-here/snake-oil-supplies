import React, { Component } from 'react'
//import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {Link, withRouter} from 'react-router-dom'
import { ProductSummary } from './index'
import { fetchGuestCart } from '../store'
import { getCartFromLocalStorage } from '../routes'

class CartPage extends Component {
  constructor(props) {
    super(props);
    this.decrementQuantity = this.decrementQuantity.bind(this);
    this.incrementQuanitity = this.incrementQuanitity.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  decrementQuantity(id) {

    if (this.props.isLoggedIn) {
      // put request to server to decrement quantity

      console.log('should decrement in server')
    }
    else {
      // decrement quanity in local storage

      let quantity = localStorage.getItem(id);
      quantity--;
      localStorage.setItem(id, quantity);

      let cartProducts = getCartFromLocalStorage(this.props);
      this.props.loadGuestCart(cartProducts);

      console.log('should decrement in storage');

      console.log('this.props.cart', this.props.cart);


    }
  }

  incrementQuanitity(id) {

    if (this.props.isLoggedIn) {
      // put request to server to increment quantity
      console.log('should increment in server')

    } else {
      // increment quanity in local storage
      console.log('should increment in storage')

      let quantity = localStorage.getItem(id);
      quantity++;
      localStorage.setItem(id, quantity);

      // let keys = Object.keys(localStorage);
      // let cartProducts = this.props.products.filter(function (product) {
      //   return keys.indexOf(product.id.toString()) !== -1
      // })

      let cartProducts = getCartFromLocalStorage(this.props);
      console.log('cartProducts', cartProducts);

      this.props.loadGuestCart(cartProducts);

      console.log('this.props.cart', this.props.cart);
      console.log('this.props.isLoggedIn', this.props.isLoggedIn);

    }
  }

  deleteItem(id) {

    if (this.props.isLoggedIn) {
      // put request to server to delete item
      console.log('should delete in server')
    }
    else {
      // delete quanity in local storage

      delete localStorage[id];

      let cartProducts = getCartFromLocalStorage(this.props);

      this.props.loadGuestCart(cartProducts);

      console.log('shoule delete in storage')
      console.log('id', id);

    }
  }
  render() {


    //recentAdd - adds quantity property to logged in user
    //dummy data in case it doesn't have a quantity
    //guest cart is rendered directly from state not from localStorage
    let cartProducts = this.props.cart;

    if (this.props.isLoggedIn) {
      cartProducts.forEach((cartProduct) => {
        cartProduct.quantity = cartProduct.quantity || 1;
      })
    }

    return (
      <div>
        <h1>In the cart page</h1>
        {
          cartProducts.map((product) => {
            return (
              <div key={product.id}>
                <img src={product.imageUrl} height="200px" width="200px" />
                <h3> {product.name} </h3>
                <h5> {product.price} </h5>
                {console.log('product.quantity', product.quantity)}
                <h2>QUANTITY : {this.props.isLoggedIn ? 1 : localStorage.getItem(product.id.toString())}</h2>
                <button onClick={() => this.decrementQuantity(product.id)} >-</button>
                <button onClick={() => this.incrementQuanitity(product.id)} >+</button>
                <button onClick={() => this.deleteItem(product.id)} >Delete item</button>
                <hr />
              </div>

            )
          })
        }
      <div>Total Price placeholder</div>
      <Link to={'/checkout'}><button>Checkout</button></Link>
      </div>
    )
  }
}

const mapState = (state, ownProps) => {
  //const categoryName = ownProps.match.params.name
  console.log(state)

  return {
    isLoggedIn: !!state.user.id,
    products: state.products,
    cart: state.cart
  }
};
const mapDispatch = (dispatch) => ({
  loadGuestCart(arr){
    dispatch(fetchGuestCart(arr))
  },
  // loadUsersCart(userId) {
  //   dispatch(fetchCart(userId))
  // }

});
export default connect(mapState, mapDispatch)(CartPage);


// { props.selectedProducts.map((product) => {
//   return (
//     <div key={product.name}>
//       <ProductSummary product={product} />
//       <hr />
//     </div>
//   )
// })
// }
