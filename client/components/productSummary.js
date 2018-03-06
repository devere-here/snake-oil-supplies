import React from 'react'
// import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'


const ProductSummary = (props) => {
  const { product } = props;
  return (
    <div>
      <Link to={`/category/${product.category}/${product.id}`}>
        <div id={product.id} className="visible">
          <img src={product.imageUrl} height="200px" width="200px" />
          <h3>{product.name}</h3>
          <h5>${product.price}</h5>
        </div>
      </Link>
      {
        !props.isAdmin ? null :
          <Link to={`/products/admin/${product.id}`}><button>Edit</button></Link>
      }
      <hr />
    </div>
  )
}

const mapState = (state) => ({
  isAdmin: !!state.user.isAdmin,
});
const mapDispatch = (/*dispatch*/) => () => ({});
export default connect(mapState, mapDispatch)(ProductSummary);
