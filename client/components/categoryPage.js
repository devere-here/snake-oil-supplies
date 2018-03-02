import React from 'react'
//import PropTypes from 'prop-types'
import {connect} from 'react-redux'
// import {Link, withRouter} from 'react-router-dom'
import ProductSummary from './productSummary'

const CategoryPage = (props) => {

  return (
    <div>
      <h1>Words</h1>
      { props.selectedProducts.map((product) => {
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

const mapState = ({products}, ownProps) => {
  const categoryName = ownProps.match.params.name
  return {
    selectedProducts: products.filter(product => product.category === categoryName)
    }
};
const mapDispatch = (/*dispatch*/) => () => ({});
export default connect(mapState, mapDispatch)(CategoryPage);
