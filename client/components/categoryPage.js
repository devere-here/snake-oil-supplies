import React from 'react'
//import PropTypes from 'prop-types'
import {connect} from 'react-redux'
// import {Link, withRouter} from 'react-router-dom'
import ProductSummary from './productSummary'

const CategoryPage = (props) => {
  console.log('props', props);
  return (
    <div>
      <h1>Words</h1>
      { props.products.map((product) => {
        return (
          <div key={product.name}>
            <ProductSummary product={product} />
            <hr />
          </div>
        )
      })
    }
    </div>
  )
}

const mapState = (state) => ({
  products: state.products
});
const mapDispatch = (/*dispatch*/) => () => ({});
export default connect(mapState, mapDispatch)(CategoryPage);


// {props.products && props.products.map((product) => {
//   return (
//     <Link key={product.name} path={`/category/${product.category}`}><ProductSummary product={props.product} /></Link>
//   )
// })}
