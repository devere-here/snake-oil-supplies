import React from 'react'
//import PropTypes from 'prop-types'
import {connect} from 'react-redux'
// import {Link, withRouter} from 'react-router-dom'
import ProductSummary from './productSummary'

const CategoryPage = (props) => {

  return (
    <div className="thumbnail-container">
      { props.selectedProducts.map((product) => {
        return (
          <div className="thumbnail" key={product.name}>
            <ProductSummary product={product} />
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
