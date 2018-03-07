import React from 'react';
// import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';

/**
 * COMPONENT
 */
export const Confirmation = (props) => {

    const {email, order} = props

    return (
      <div id="guest-confirmation">
        <div>
          <h1>Thanks!</h1>
          {
            // <h2>{email}</h2>
            // <h3>Order Number: {order.id}</h3>
          }
          <p>We have received your order, please check your email for your invoice and order confirmation.</p>
          <Link to="/home" ><button>Return to homepage</button></Link>
        </div>
      </div>
    )

}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // userId: state.user.id,
    email: state.user.email,
    //order: state.
  }
}

//recentAdd mapDispatch
// const mapDispatch = (dispatch) => ({
//   loadUsersCart(userId) {
//     dispatch(fetchCart(userId));
//   }

// });

export default connect(mapState)(Confirmation)

