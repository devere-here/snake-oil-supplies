import React from 'react'
// import PropTypes from 'prop-types'
import {connect} from 'react-redux'

const UserEdit = (props) => {
  const {user} = props;
  return (
    <div id={user.id} className="visible">
      <h3>Edit {user.name}</h3>
      <SOS-Form formObj={user} />
    </div>
  )
}

const mapState = () => ({});
const mapDispatch = (/*dispatch*/) => () => ({});
export default connect(mapState, mapDispatch)(UserEdit);
