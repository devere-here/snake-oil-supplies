import React from 'react'
// import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'


const ProductSummary = (props) => {
  const {product} = props;
  console.log(product);
  return (
    <Link to={`/category/${product.category}/${product.id}`}>
      <div>
        <img src={product.imageUrl} height="200px" width="200px" />
        <h3> {product.name} </h3>
        <h5> {product.price} </h5>
        <button>Add to Cart</button>
      </div>
    </Link>
  )
}

const mapState = () => ({});
const mapDispatch = (/*dispatch*/) => () => ({});
export default connect(mapState, mapDispatch)(ProductSummary);
