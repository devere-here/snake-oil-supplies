import React from 'react'
//import PropTypes from 'prop-types'
import {connect} from 'react-redux'
// import {Link, withRouter} from 'react-router-dom'
import {ProductSummary} from './index'

const CategoryPage = (props) => {

  return (
    <div className="thumbnail-container">
      <h1>Words</h1>
      <label>Filter By Name</label>
      <input onChange={event => {
        props.selectedProducts.map( product => {
          let productElem = document.getElementById(product.id)
          if (event.target.value === '') {
            productElem.className = 'active'
          } else if (!product.name.includes(event.target.value)) {
            productElem.className = 'hidden'
          }
        })
      } } />
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
