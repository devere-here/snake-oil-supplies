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
    const user = {};
    for (let field of event.target) {
      if (field.value) user[field.name] = field.value
    }
    console.log('user', user)
    try {
      await axios.put(`/api/users/admin/${user.id}`, user)
      console.log('fetch users')
      this.props.fetchUsers()
    }
    catch (err) {
      console.log(err)
    }
    console.log('redirect to /admin')
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
