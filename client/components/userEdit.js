import React, {Component} from 'react'
// import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {SOSForm} from './index'
import { fetchAllUsers } from '../store'
import axios from 'axios'


class UserEdit extends Component {
  constructor () {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async handleSubmit(event) {
    event.preventDefault()
    const fieldsReqInt = ['id', 'phone', 'creditNumber', 'creditSecurityCode', 'billingZipCode', 'addressZipCode']
    const fieldsReqBool = ['isAdmin', 'isGuest']
    const user = {};
    for (let field of event.target) {
      console.log('target field', field)
      if (fieldsReqInt.includes(field)) {
        user[field.name] = Number(field.value)
      }
      else if (fieldsReqBool.includes(field)) {
        user[field.name] = Boolean(field.value)
      }
      else {user[field.name] = field.value}
    }
    console.log('user', user)
    try {
      await axios.put(`/api/users/admin/${user.id}`, user)
      this.props.fetchUsers()
    }
    catch (err) {
      console.log(err)
    }
    this.props.history.push('/admin')
  }

  render() {
    const user = this.props.users.find((userInstance) => {
      return userInstance.id === +this.props.match.params.id
    })
    return (
      <div id={user.id} className="visible">
        <h3>Edit {user.name}</h3>
        <SOSForm obj={user} handleSubmit={this.handleSubmit} />
      </div>
    )
  }
}

const mapState = (state) => ({
  users: state.users
});
const mapDispatch = (dispatch) => () => ({
  fetchUsers() {
    dispatch(fetchAllUsers())
  }
});
export default connect(mapState, mapDispatch)(UserEdit);
