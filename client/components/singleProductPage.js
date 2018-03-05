import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCartFromLocalStorage } from '../routes';
import { updateCart } from '../store';
import axios from 'axios';
import { Link } from 'react-router-dom';

class singleProductPage extends Component {
  constructor(props) {
    super(props);

    this.addToCart = this.addToCart.bind(this);
  }

  async addToCart(evt) {
    evt.preventDefault();

    let id = this.props.product.id,
        addedProduct = this.props.product,
        quantity = evt.target.quantity.value,
        keys = Object.keys(localStorage);

    let localCart = this.props.cart;


    let index = localCart.indexOf(addedProduct);

    if (index !== -1) {
      localCart[index].quantity += +quantity;
      if (this.props.isLoggedIn){

        let putObj = {
          quantity: localCart[index].quantity,
          productId: localCart[index].id,
          orderId: this.props.orderId
        }
        await axios.put(`/api/orderDetails/${putObj.orderId}`, putObj)

      }
    } else {
      addedProduct.quantity = quantity;
      localCart.push(addedProduct);
      if (this.props.isLoggedIn){

        let postObj = {
          quantity: quantity,
          productId: addedProduct.id,
          orderId: this.props.orderId
        }
        console.log('about to post');
        await axios.post('/api/orderDetails', {orderDetailsArray: [postObj]});
      }
    }

    if (!this.props.isLoggedIn){
      localStorage.setItem(id, quantity);

    }

    console.log('the localCart', localCart);
    this.props.dispatchUpdateCart(localCart);

    this.props.history.push('/cart');

    // if (keys.find((key) => +key === id)) {
    //   quantity = +localStorage.getItem(id) + +quantity
    // }

    //localStorage.setItem(id, quantity);

    //recentAdd - addItem button now adds item to store as well as localStorage this is only for guests
    //for users store/ database must be updated

    //let cartProducts = getCartFromLocalStorage(this.props);



  }

  render() {

    const { product } = this.props;

    return (

      !product ? null
        : (
          <div>
            <img src={product.imageUrl} width="50%" />
            <h1>{product.name}</h1>
            <h2>Price: {product.price}</h2>
            <h3>Rating: {product.rating}</h3>
            <p>Additional Info: {'Temporary description'}</p>
            <h3>Quantity:</h3>
            <form onSubmit={this.addToCart}>
              <input
                name="quantity"
                defaultValue="1"
                onChange={this.handleChange}
              />
              <button type="submit">Add To Cart</button>
            </form>
          </div>

        )


    )
  }
}

const mapState = ({ products, quantity, cart, user }, ownProps) => {
  const paramId = Number(ownProps.match.params.id);

  return {
    product: products.find(product => product.id === paramId),
    quantity,
    products,
    cart,
    orderId: cart.id,
    isLoggedIn: !!user.id
  }
};

const mapDispatch = (dispatch) => ({
  dispatchUpdateCart(arr){
    dispatch(updateCart(arr))
  },
  // loadUsersCart(userId) {
  //   dispatch(fetchCart(userId))
  // }

});

export default connect(mapState, mapDispatch)(singleProductPage);
