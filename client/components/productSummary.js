import React from 'react'
// import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'


const ProductSummary = (props) => {
  const {product} = props;
  return (
    <Link path={`/categories/${product.category}/${product.id}`}>
      <div>
        <img src={product.imgUrl} />
        <h3> {product.name} </h3>
        <h5> {product.price} </h5>
        <button>Add to Cart</button>
      </div>
    </Link>
  )
}

const mapState = () => {};
const mapDispatch = (/*dispatch*/) => () => {};
export default connect(mapState, mapDispatch)(ProductSummary);
