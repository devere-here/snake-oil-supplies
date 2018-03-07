import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import {updateCart, fetchPastOrders} from '../store'

class CheckoutPage extends Component {
  constructor(props) {
    super(props);

    this.handleUserSubmit = this.handleUserSubmit.bind(this)
    this.handleGuestSubmit = this.handleGuestSubmit.bind(this)

  }

async handleUserSubmit(evt) {
    evt.preventDefault();
    let userData = {};

    for (var i = 0; i < evt.target.length - 1 ; i++){
      userData[`${evt.target[i].name}`] = evt.target[i].value;
   }

    let modifiedOrder = {
      id: this.props.cart.id,
      userId: this.props.user.id,
      completed: true,
      shippingStreet: userData.addressStreet,
      shippingCity: userData.addressCity,
      shippingState: userData.addressState,
      shippingCountry: userData.addressCountry,
      shippingZipCode: userData.addressZipCode,
      email: this.props.user.email
    }

    await axios.put(`/api/users/${this.props.user.id}`, userData)
    await axios.put(`/api/orders`, modifiedOrder)
    this.props.getPreviousOrders();
    this.props.clearCart();
    this.props.history.push('/pastOrders')
  }

handleGuestSubmit(evt) {
    evt.preventDefault();

    let guestInfo = {
      isGuest: 'true',
      password: '123'
    }
    let guestOrder = {
      completed: 'true'
    }
    for (let field of evt.target){
      guestInfo[field.name] = field.value;
    }

    axios.post('/auth/guest', guestInfo)
    .then((res) => res.data)
    .then((res) => {
      guestOrder.userId = res.id;
      guestOrder.shippingStreet = res.addressStreet;
      guestOrder.shippingCity = res.addressCity;
      guestOrder.shippingState = res.addressState;
      guestOrder.shippingCountry = res.addressCountry;
      guestOrder.shippingZipCode = res.addressZipCode;
      guestOrder.email = res.email;

      axios.post('/api/orders', guestOrder)
      .then((resOrders) => {
        let orderDetailsArray = this.props.cart.map((cartItem) => {
          return {
            orderId: resOrders.data.id,
            productId: cartItem.id,
            quantity: cartItem.quantity
          }
        })

        axios.post('/api/orderDetails', {orderDetailsArray})
        .then(() => {
          localStorage.clear();
          this.props.clearCart();
        })
      })
      this.props.history.push(`/confirmation`)
    })
  }

  render() {
    if (this.props.isLoggedIn) {
      const {user} = this.props

      return (
        <div>
          <h1>In the user's checkout page</h1>
          <div className="checkout-form">
            <form onSubmit={this.handleUserSubmit}>

              <h2>Shipping Address</h2>
                <label htmlFor="name">Full name</label>
                <input name="name" defaultValue={user.creditCardName} required />
                <label htmlFor="addressStreet">Street Address</label>
                <input name="addressStreet" defaultValue={user.addressStreet} required />
                <label htmlFor="addressCity">City</label>
                <input name="addressCity" defaultValue={user.addressCity} required />
                <label htmlFor="addressState">State</label>
                <input name="addressState" defaultValue={user.addressState}required />
                <label htmlFor="addressCountry">Country</label>
                <input name="addressCountry" defaultValue={user.addressCountry} required />
                <label htmlFor="addressZipCode">ZipCode</label>
                <input name="addressZipCode" defaultValue={user.addressZipCode} required />

              <h2>Credit Card Details</h2>
                <label htmlFor="name">Full name</label>
                <input name="name" defaultValue={user.creditCardName} required />
                <label htmlFor="creditNumber">Credit Card Number</label>
                <input name="creditNumber" defaultValue={user.creditNumber} required />
                <label htmlFor="creditSecurityCode">Security Code</label>
                <input name="creditSecurityCode" defaultValue={user.creditSecurityCode} required />
                <label htmlFor="creditExpirationDate">Expiration Date</label>
                <input name="creditExpirationDate" defaultValue={user.creditExpirationDate} required />
              <br />
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )
    }
    else {
      return (
        <div>
          <h1>In the guest's checkout page</h1>
            <div className="checkout-form">
              <form onSubmit={this.handleGuestSubmit}>

                <label htmlFor="email">Email</label>
                  <input name="email"  required />

                <h2>Shipping Address</h2>
                  <label htmlFor="name">Full name</label>
                  <input name="name"  required />
                  <label htmlFor="addressStreet">Street Address</label>
                  <input name="addressStreet" required />
                  <label htmlFor="addressCity">City</label>
                  <input name="addressCity" required />
                  <label htmlFor="addressState">State</label>
                  <input name="addressState" required />
                  <label htmlFor="addressCountry">Country</label>
                  <input name="addressCountry" required />
                  <label htmlFor="addressZipCode">ZipCode</label>
                  <input name="addressZipCode" required />

                <h2>Credit Card Details</h2>
                  <label htmlFor="name">Full name</label>
                  <input name="name" required />
                  <label htmlFor="creditNumber">Credit Card Number</label>
                  <input name="creditNumber" required />
                  <label htmlFor="creditSecurityCode">Security Code</label>
                  <input name="creditSecurityCode" required />
                  <label htmlFor="creditExpirationDate">Expiration Date</label>
                  <input name="creditExpirationDate" required />
                <br />
                <button type="submit">Submit</button>
              </form>
            </div>


        </div>
      )
    }
  }
}

const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id,
    user: state.user,
    cart: state.cart
  }
};
const mapDispatch = (dispatch) => ({
  getPreviousOrders() {
    dispatch(fetchPastOrders())
  },
  clearCart() {
    dispatch(updateCart([]))
  }
});

export default connect(mapState, mapDispatch)(CheckoutPage);

