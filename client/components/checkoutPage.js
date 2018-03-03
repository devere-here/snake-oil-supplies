import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
//import {Link, withRouter} from 'react-router-dom'
// import { ProductSummary } from './index'
// import { fetchGuestCart } from '../store'
// import { getCartFromLocalStorage } from '../routes'

class CheckoutPage extends Component {
  constructor(props) {
    super(props);

    this.handleUserSubmit = this.handleUserSubmit.bind(this)
    this.handleGuestSubmit = this.handleGuestSubmit.bind(this)

  }

  handleUserSubmit(evt) {
    evt.preventDefault();

    let modifiedOrder = {
      id: this.props.cart.id,
      userId: this.props.user.id,
      completed: true,
    }

    //from the userId, get it's orderId (completed:false) then use the orderID to set (completed: true)

    for (var i=0; i < evt.target.length - 1 ; i++){
      console.log(evt.target[i].value)
      modifiedOrder['evt.target.name'] = evt.target[i].value;
    }

    // axios.put(`/api/orders/${orderId}`, modifiedOrder)
    // .then()
  }

  handleGuestSubmit(evt) {
    evt.preventDefault();
  }

  render() {

    if (this.props.isLoggedIn) {
      console.log('we are a logged in user', this.props.user)

      return (
        <div>
          <h1>In the user's checkout page</h1>
          <div className="checkout-form">
            <form onSubmit={this.handleUserSubmit}>

              <h2>Shipping Address</h2>
                <label htmlFor="name">Full name</label>
                <input name="name" onChange={this.handleChange} defaultValue={this.props.user.creditCardName} />
                <label htmlFor="addressStreet">Street Address</label>
                <input name="addressStreet" onChange={this.handleChange} defaultValue={this.props.user.addressStreet} />
                <label htmlFor="addressCity">City</label>
                <input name="addressCity" onChange={this.handleChange} defaultValue={this.props.user.addressCity} />
                <label htmlFor="addressState">State</label>
                <input name="addressState" onChange={this.handleChange} defaultValue={this.props.user.addressState} />
                <label htmlFor="addressCountry">Country</label>
                <input name="addressCountry" onChange={this.handleChange} defaultValue={this.props.user.addressCountry} />
                <label htmlFor="addressZipCode">ZipCode</label>
                <input name="addressZipCode" onChange={this.handleChange} defaultValue={this.props.user.addressZipCode} />

              <h2>Credit Card Details</h2>
                <label htmlFor="name">Full name</label>
                <input name="name" onChange={this.handleChange} defaultValue={this.props.user.creditCardName} />
                <label htmlFor="creditNumber">Credit Card Number</label>
                <input name="creditNumber" onChange={this.handleChange} defaultValue={this.props.user.creditNumber} />
                <label htmlFor="creditSecurityCode">Security Code</label>
                <input name="creditSecurityCode" onChange={this.handleChange} defaultValue={this.props.user.creditSecurityCode} />
                <label htmlFor="creditExpirationDate">Expiration Date</label>
                <input name="creditExpirationDate" onChange={this.handleChange} defaultValue={this.props.user.creditExpirationDate} />
              <br />
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )
    }
    else {
      console.log('we are a guest user')
      return (
        <div>
          <h1>In the guest's checkout page</h1>

        </div>
      )
    }
  }
}




const mapState = (state, ownProps) => {
  console.log(state)

  return {
    isLoggedIn: !!state.user.id,
    user: state.user
    // products: state.products,
    // cart: state.cart
  }
};
const mapDispatch = (dispatch) => ({
  // loadGuestCart(arr) {
  //   dispatch(fetchGuestCart(arr))
  // },
  // loadUsersCart(userId) {
  //   dispatch(fetchCart(userId))
  // }

});

export default connect(mapState, mapDispatch)(CheckoutPage);


// { props.selectedProducts.map((product) => {
//   return (
//     <div key={product.name}>
//       <ProductSummary product={product} />
//       <hr />
//     </div>
//   )
// })
// }
