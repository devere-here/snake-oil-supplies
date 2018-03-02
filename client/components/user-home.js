import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { getCartFromLocalStorage } from '../routes';
import { fetchCart } from '../store';


//import { any component } from './index'

/**
 * COMPONENT
 */
export const UserHome = (props) => {
  const {email} = props
  console.log('in user home');

  return (
    <div>
      <h3>Welcome, {email}</h3>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    //recentAdd id section
    id: state.user.id,
    email: state.user.email
  }
}

//recentAdd mapDispatch
const mapDispatch = (dispatch) => ({
  loadUsersCart(userId) {
    console.log('about to get user cart data');
    dispatch(fetchCart(userId));
  }

});

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
