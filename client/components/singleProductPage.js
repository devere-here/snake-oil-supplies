import React from 'react'
import {connect} from 'react-redux'

const singleProductPage = (props) => {
  const {product} = props;
  return (
    <div>
      <img src={product.imageUrl} />
      <h1>{product.name}</h1>
      <h2>Price: {product.price}</h2>
      <h3>Rating: {product.rating}</h3>
      <p>Additional Info: {'Temporary description'}</p>
      <h3>Quantity:</h3>
      <input name="quantity" defaultValue="1" />
    </div>
  )
}

const mapState = () => {};
const mapDispatch = (/*dispatch*/) => () => {};
export default connect(mapState, mapDispatch)(singleProductPage);
