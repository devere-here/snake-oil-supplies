import React from 'react'
//import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {ProductSummary} from './productSummary'

export const CategoryPage = (props) => {
  return (
    <div>
      {props.products.map((product) => {
        return (
          <Link key={product.name} path={`/category/${product.category}`}><ProductSummary product={props.product} /></Link>
        )
      })}
    </div>
  )
}

const mapState = () => {};
const mapDispatch = (/*dispatch*/) => () => {};
export default connect(mapState, mapDispatch)(CategoryPage);
