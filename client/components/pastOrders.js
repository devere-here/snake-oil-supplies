import React, { Component } from 'react'
import {connect} from 'react-redux'
import { fetchPastOrders } from '../store'

class PastOrders extends Component {
  constructor(props) {
    super(props);
    //this;
  }

  componentDidMount(){
    this.props.loadPastOrders();

  }

  render() {

    let pastOrders = this.props.pastOrders.reverse();
    return (
      <div>
      <h1>In past orders</h1>
      { pastOrders.map((pastOrder) => {
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
const mapDispatch = (dispatch) => {
  return {
    loadPastOrders() {
      dispatch(fetchPastOrders());
    },
  }
}

export default connect(mapState, mapDispatch)(PastOrders);
