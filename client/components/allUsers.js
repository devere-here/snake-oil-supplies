import React from 'react'
// import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {UserSummary} from './index'

const AllUsers = (props) => {
  return (
    <div>
    { props.allUsers.map( user => {
      return (
        <div key={user.email}>
          <UserSummary user={user} />
        </div>
      )
    })}
  </div>
  )
}

  const mapState = state => ({allUsers: state.users})
  const mapDispatch = (/*dispatch*/) => () => ({})
  export default connect(mapState, mapDispatch)(AllUsers)
