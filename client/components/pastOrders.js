import React from 'react'
import {connect} from 'react-redux'

const PastOrders = props =>  {

    return (
      <div>
      <h1>In past orders</h1>
      { props.pastOrders.map((pastOrder) => {
        var totalPrice = 0;
      return (
          <div key={pastOrder.id}>
            <h1>Submitted At: {new Date(pastOrder.updatedAt).toDateString()}</h1>
            <ul>
              {pastOrder.products.map((itemInOrder) => {
                totalPrice += itemInOrder.price * itemInOrder.orderDetail.quantity
                let price = itemInOrder.price * itemInOrder.orderDetail.quantity
                return (
                  <div key={itemInOrder.name}>
                    <ul type="none">
                      <h3>Product Name</h3>
                      <li>
                      <img src={itemInOrder.imageUrl} height="200px" width="200px" />
                      </li>
                      <li>{itemInOrder.name}</li>
                      <h3>Quantity</h3>
                      <li>{itemInOrder.orderDetail.quantity}</li>
                      <h3>Price</h3>
                      <li>${price}</li>
                    </ul>
                  </div>
                )
              })}
            </ul>
            <h2>TOTAL PRICE</h2>
            <h3>{totalPrice}</h3>
            <hr />
          </div>
        )
      })}
      </div>

    )
  }


const mapState = state => {
  return {
    pastOrders: state.pastOrders
  }
};
const mapDispatch = null;

export default connect(mapState, mapDispatch)(PastOrders);
