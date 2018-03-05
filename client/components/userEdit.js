import React from 'react'
// import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {SOSForm} from './index'

const UserEdit = (props) => {
  const user = props.users.find((userInstance) => {
    return userInstance.id === +props.match.params.id
  })
  return (
    <div id={user.id} className="visible">
      <h3>Edit {user.name}</h3>
      <SOSForm formObj={user} />
    </div>
  )
}

const mapState = (state) => ({
  users: state.users
});
const mapDispatch = (/*dispatch*/) => () => ({});
export default connect(mapState, mapDispatch)(UserEdit);
