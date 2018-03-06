import React, {Component} from 'react'
// import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {SOSForm} from './index'
import { fetchAllOrders } from '../store'
import axios from 'axios'


class OrderEdit extends Component {
  constructor () {
    super()
    this.updateOrder = this.updateOrder.bind(this)
    this.updateDetail = this.updateDetail.bind(this)
  }

  async updateOrder(event) {
    event.preventDefault()
    const order = {};
    for (let field of event.target) {
      if (field.value) order[field.name] = field.value
    }

    try {
      await axios.put(`/api/orders/admin/${order.id}`, order)
      this.props.fetchOrders()
    }
    catch (err) {
      console.log(err)
    }
  }
  async updateDetail(event) {
    event.preventDefault()
    const orderDetail = {};
    for (let field of event.target) {
      if (field.value) orderDetail[field.name] = field.value
    }
    try {
      await axios.put(`/api/orderDetails/admin`, orderDetail)
      this.props.fetchOrders()
    }
    catch (err) {
      console.log(err)
    }
  }

  render() {
    const orderId = +this.props.match.params.id
    const order = this.props.orders.find((orderInstance) => {
      return orderInstance.id === orderId
    })

    let orderDetailsArr = [];
    if (order.products.length > 0) {
      orderDetailsArr = order.products.map( product => {
        product.orderDetail.name = product.name
        return product.orderDetail
      })
      delete order.products
    }
    const template = {quantity: 0, orderId: 0, productId: 0}
    const disabledKeys = ['orderId', 'productId']

    return (
      <div id={order.id} className="visible">
        <h3>Edit Order #{order.id}</h3>
        <SOSForm obj={order} handleSubmit={this.updateOrder} />
        <h3>Add To Order</h3>
        <SOSForm obj={template} handleSubmit={this.updateDetail} />
        <h3>Edit Order List</h3>
        {
          orderDetailsArr.map( details => (
            <div key ={details.productId}>
              <h4>{details.name}</h4>
              {delete details.name}
              <SOSForm obj={details} handleSubmit={this.updateDetail} exclude={disabledKeys} />
            </div>
          ))
        }
      </div>
    )
  }
}

const mapState = (state) => ({
  orders: state.orders
});
const mapDispatch = (dispatch) => () => ({
  fetchOrders() {
    dispatch(fetchAllOrders())
  }
});
export default connect(mapState, mapDispatch)(OrderEdit);
