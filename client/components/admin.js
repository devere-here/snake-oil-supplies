import React, {Component} from 'react'
// import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {AllUsers} from './index'
import {fetchAllUsers, fetchAllOrders} from '../store'


class AdminPage extends Component {
  constructor() {
    super()
  }

  componentDidMount() {
    console.log('ADMIN DID MOUNT')
    this.props.fetchUsersAndOrders();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props) {
      console.log('ADMIN DID RECEIVE')
      this.props.fetchUsersAndOrders();
    }
  }

  render() {
    return (
      <div>
      { /*
        <Products />
        <Orders />
      */}
        <AllUsers />
      </div>
    )
  }
}

const mapState = () => ({});
const mapDispatch = (dispatch) => () => ({
  fetchUsersAndOrders() {
    dispatch(fetchAllUsers())
    dispatch(fetchAllOrders())
  }
});
export default connect(mapState, mapDispatch)(AdminPage);
