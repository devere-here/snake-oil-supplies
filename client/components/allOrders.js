import React from 'react'
// import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {OrderSummary} from './index'

const AllOrders = (props) => {
  return (
    <div>
    { props.orders.map( order => {
      return (
        <div key={order.id}>
          <OrderSummary order={order} />
        </div>
      )
    })}
  </div>
  )
}

  const mapState = state => ({orders: state.orders})
  const mapDispatch = (/*dispatch*/) => () => ({})
  export default connect(mapState, mapDispatch)(AllOrders)
