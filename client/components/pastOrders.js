import React, { Component } from 'react'
import {connect} from 'react-redux'

class PastOrders extends Component {
  constructor(props) {
    super(props);
    //this;
  }
  render() {
    console.log('in render');
    console.log('this.props.pastOrders', this.props.pastOrders);
    return (
      <div>
      <h1>In past orders</h1>
      { this.props.pastOrders.map((pastOrder) => {
      return (
          <div>
            <h1>Submitted At: {pastOrder.updatedAt}</h1>
            <ul>
              {pastOrder.products.map((itemInOrder) => {
                return (<li>
                  <h3>{itemInOrder.name}</h3>
                  <h3>{itemInOrder.quantity}</h3>
                  <h3>{itemInOrder.price}</h3>
                  </li>)
              })}
            </ul>
          </div>
        )
      })}
      </div>

    )
  }
}

const mapState = state => {
  return {
    pastOrders: state.pastOrders
  }
};
const mapDispatch = null;

export default connect(mapState, mapDispatch)(PastOrders);
