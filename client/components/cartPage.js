import React, { Component } from 'react'
//import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {Link, withRouter} from 'react-router-dom'
import { ProductSummary } from './index'
import { updateCart } from '../store'
import { getCartFromLocalStorage } from '../routes'
import axios from 'axios';

class CartPage extends Component {
  constructor(props) {
    super(props);
    this.incrementOrDecrement = this.incrementOrDecrement.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  async incrementOrDecrement(product, type) {

    let localCart = this.props.cart;
    let index = localCart.indexOf(product);
    type === 'increment' ? localCart[index].quantity++ : localCart[index].quantity--;

    if (this.props.isLoggedIn) {
      let putObj = {
        quantity: localCart[index].quantity,
        productId: localCart[index].id,
        orderId: this.props.orderId
      }

      await axios.put(`/api/orderDetails/${putObj.orderId}`, putObj);

    } else {
      localStorage.setItem(localCart[index].id, localCart[index].quantity);
    }

    let newLocalCart = localCart.slice();
    newLocalCart.id = localCart.id;

    this.props.loadCart(newLocalCart);

  }

  async deleteItem(toBeDeletedProduct) {



    let localCart = this.props.cart;
    let index = localCart.indexOf(toBeDeletedProduct);

    console.log('localCart', localCart);



    if (this.props.isLoggedIn) {
      let deleteObj = {
        productId: localCart[index].id,
        orderId: this.props.orderId
      }

      await axios.delete(`/api/orderDetails/${deleteObj.orderId}`, {data: deleteObj});

    } else {
      delete localStorage[toBeDeletedProduct.id];
    }

    localCart.splice(index, 1);
    let newLocalCart = localCart.slice();
    newLocalCart.id = localCart.id;

    this.props.loadCart(newLocalCart);
  }
  render() {


    //recentAdd - adds quantity property to logged in user
    //dummy data in case it doesn't have a quantity
    //guest cart is rendered directly from state not from localStorage
    let cartProducts = this.props.cart;
    console.log('cartProducts', cartProducts);

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
                <h2>QUANTITY : {product.quantity}</h2>
                <button onClick={() => this.incrementOrDecrement(product, 'decrement')} >-</button>
                <button onClick={() => this.incrementOrDecrement(product, 'increment')} >+</button>
                <button onClick={() => this.deleteItem(product)} >Delete item</button>
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
    cart: state.cart,
    orderId: state.cart.id
  }
};
const mapDispatch = (dispatch) => ({
  loadCart(cart) {
    console.log('about to dispatch this cart ', cart);
    dispatch(updateCart(cart))
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


//<h2>QUANTITY : {this.props.isLoggedIn ? 1 : localStorage.getItem(product.id.toString())}</h2>
