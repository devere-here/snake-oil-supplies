import React from 'react'
// import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'


const OrderSummary = (props) => {
  const { order } = props;

  return (
    <div>
      <Link to={`/orders/admin/${order.id}`}>
        <div id={order.id} className="visible">
          <p>Order# {order.id}, UserId: {order.userId}, Completed:{order.completed}</p>
        </div>
      </Link>

    </div>
  )
}

const mapState = (/*state*/) => ({});
const mapDispatch = (/*dispatch*/) => () => ({});
export default connect(mapState, mapDispatch)(OrderSummary);
