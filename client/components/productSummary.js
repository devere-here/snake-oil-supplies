import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const ProductSummary = (props) => {
  const { product } = props
  return (
    <div>
      <Link to={`/category/${product.category}/${product.id}`}>
        <div id={product.id} className="projectSummary">
          <h3>{product.name}</h3>
          <img className="thumbNailImage" src={product.imageUrl} height="200px" width="200px" />
          <h4>${product.price}</h4>
        </div>
        <button>Add To Cart</button>
      </Link>
      {
        !props.isAdmin ? null :
          <Link to={`/products/admin/${product.id}`}><button>Edit</button></Link>
      }
    </div>
  )
}

const mapState = (state) => ({
  isAdmin: !!state.user.isAdmin,
})
const mapDispatch = null
export default connect(mapState, mapDispatch)(ProductSummary)
