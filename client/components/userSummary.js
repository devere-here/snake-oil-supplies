import React from 'react'
// import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'


const UserSummary = (props) => {
  const {user} = props;
  return (
    <Link to={`/settings/${user.id}`}>
      <div id={user.id} className="visible">
      <p>{user.id}: {user.name}: {user.email}</p>
        {
      //to be rendered upon click <SOS-Form formObj={user} />
        }
      </div>
    </Link>
  )
}

const mapState = () => ({});
const mapDispatch = (/*dispatch*/) => () => ({});
export default connect(mapState, mapDispatch)(UserSummary);
