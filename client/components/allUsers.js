import React from 'react'
// import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {UserSummary} from './index'

const AllUsers = (props) => {
  return (
    <div>
    { props.users.map( user => {
      console.log('customer', user)
      return (
        <div key={user.email}>
          <UserSummary customer={user} />
        </div>
      )
    })}
  </div>
  )
}

  const mapState = state => ({users: state.users})
  const mapDispatch = (/*dispatch*/) => () => ({})
  export default connect(mapState, mapDispatch)(AllUsers)
