import React from 'react'
// import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'


const UserSummary = (props) => {
  const {customer} = props;
  return (
    <Link to={`/settings/${customer.id}`}>
      <div id={customer.id} className="visible">
        <p>{customer.id}: {customer.creditCardName}: {customer.email}</p>
      </div>
    </Link>
  )
}

const mapState = () => ({});
const mapDispatch = (/*dispatch*/) => () => ({});
export default connect(mapState, mapDispatch)(UserSummary);
