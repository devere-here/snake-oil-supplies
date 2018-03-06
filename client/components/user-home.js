import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
//import { getCartFromLocalStorage } from '../routes';
//import { fetchCart } from '../store';


//import { any component } from './index'

//recentAdd - UserHome was a functional component and is now a class component
//user cart now loads when immediately when user logs in


/**
 * COMPONENT
 */
export const UserHome = (props) => {

    const {email} = props

    return (
      <div id="userHomePage">
        <div>
          <h1>Welcome,</h1>
          <h2>{email}</h2>
          <Link to="/pastorders" ><button>See Past Orders</button></Link>
        </div>
      </div>
    )

}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    userId: state.user.id,
    email: state.user.email
  }
}

//recentAdd mapDispatch
// const mapDispatch = (dispatch) => ({
//   loadUsersCart(userId) {
//     dispatch(fetchCart(userId));
//   }

// });

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
