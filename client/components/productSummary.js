import React from 'react'
// import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'


const ProductSummary = (props) => {

  return (
    <div>
      <img src={props.product.imgUrl} />
      <h3> {props.product.name} </h3>
      <h5> {props.product.price} </h5>
      <button>Add to Cart</button>
    </div>
  )
}

const mapState = () => {};
const mapDispatch = dispatch => () => {};
export default connect(mapState, mapDispatch)(ProductSummary);
