import React from 'react'
// import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {ProductSummary} from './index'

const AllProducts = (props) => {

  return (
    <div>
    { props.products.map( product => {
      return (
        <div key={product.name}>
          <ProductSummary product={product} />
        </div>
      )
    })}
  </div>
  )
}

  const mapState = state => ({products: state.products})
  const mapDispatch = (/*dispatch*/) => () => ({})
  export default connect(mapState, mapDispatch)(AllProducts)
