import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { getCartFromLocalStorage } from '../routes';
import { fetchCart } from '../store';


//import { any component } from './index'

//recentAdd - UserHome was a functional component and is now a class component
//user cart now loads when immediately when user logs in


/**
 * COMPONENT
 */
export class UserHome extends Component {

  componentDidMount(){

    this.props.loadUsersCart(this.props.userId);

  }


  render(){

    const {email} = this.props

    return (
      <div>
        <h3>Welcome, {email}</h3>
      </div>
    )

  }



}
// = (props) => {
//   const {email} = props
//   console.log('in user home');

//   return (
//     <div>
//       <h3>Welcome, {email}</h3>
//     </div>
//   )
// }

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    //recentAdd id section
    userId: state.user.id,
    email: state.user.email
  }
}

//recentAdd mapDispatch
const mapDispatch = (dispatch) => ({
  loadUsersCart(userId) {
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
