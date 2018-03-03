import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import {auth} from '../store'
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
    let userData;

    for (var i = 0; i < evt.target.length - 1 ; i++){
      console.log(evt.target[i].value)
      let name = evt.target.name;
      //`${evt.target.name}`

      userData[name] = evt.target[i].value;
    }

    // axios.put(`/api/orders/${orderId}`, modifiedOrder)
    // .then()
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

    for (var i = 0; i < evt.target.length - 1 ; i++){
      console.log(evt.target[i].value)
      //let name = evt.target.name;
      //`${evt.target.name}`
      guestInfo[`${evt.target[i].name}`] = evt.target[i].value;
    }

    console.log('guestInfo', guestInfo);


    //dispatch thunk
    axios.post('/auth/guest', guestInfo)
    .then((res) => {
      guestOrder.userId = res.data.id;

      axios.post('/api/orders', guestOrder)
      .then((resOrders) => {
        console.log('in api/orders');
        // let orderId = res.data.id;
        let orderDetailsArray = this.props.cart.map((cartItem) => {
          return {
            orderId: resOrders.data.id,
            productId: cartItem.id,
            quantity: cartItem.quantity
          }
        })

        axios.post('/api/orderDetails', {orderDetailsArray})
        .then(() => {console.log('orderdetails should be made, check your database')})


      })

    })
    //.then(res.data.id)


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
            <div className="checkout-form">
              <form onSubmit={this.handleGuestSubmit}>

                <label htmlFor="email">Email</label>
                  <input name="email" onChange={this.handleChange}  />



                <h2>Shipping Address</h2>
                  <label htmlFor="name">Full name</label>
                  <input name="name" onChange={this.handleChange}  />
                  <label htmlFor="addressStreet">Street Address</label>
                  <input name="addressStreet" onChange={this.handleChange}  />
                  <label htmlFor="addressCity">City</label>
                  <input name="addressCity" onChange={this.handleChange}  />
                  <label htmlFor="addressState">State</label>
                  <input name="addressState" onChange={this.handleChange} />
                  <label htmlFor="addressCountry">Country</label>
                  <input name="addressCountry" onChange={this.handleChange} />
                  <label htmlFor="addressZipCode">ZipCode</label>
                  <input name="addressZipCode" onChange={this.handleChange} />

                <h2>Credit Card Details</h2>
                  <label htmlFor="name">Full name</label>
                  <input name="name" onChange={this.handleChange} />
                  <label htmlFor="creditNumber">Credit Card Number</label>
                  <input name="creditNumber" onChange={this.handleChange} />
                  <label htmlFor="creditSecurityCode">Security Code</label>
                  <input name="creditSecurityCode" onChange={this.handleChange} />
                  <label htmlFor="creditExpirationDate">Expiration Date</label>
                  <input name="creditExpirationDate" onChange={this.handleChange} />
                <br />
                <button type="submit">Submit</button>
              </form>
            </div>


        </div>
      )
    }
  }
}

const mapState = (state, ownProps) => {
  console.log(state)

  return {
    isLoggedIn: !!state.user.id,
    user: state.user,
    cart: state.cart
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
