import React from 'react'
//import PropTypes from 'prop-types'
import {connect} from 'react-redux'
// import {Link, withRouter} from 'react-router-dom'
import {ProductSummary} from './index'

const CategoryPage = (props) => {
  let title = props.match.params.name;
  title = title[0].toUpperCase() + title.slice(1);

  return (
    <div>
      <div className={`titleAndSearchBarContainer ${props.match.params.name}`}>
        <div className="titleAndSearchBar">
          <h1>{title}</h1>
          <span>Filter By Name:</span>
          <input onChange={event => {
            props.selectedProducts.map( product => {
              let productElem = document.getElementById(product.id)
              if (event.target.value === '') {
                productElem.parentElement.parentElement.classList.remove('hidden');
              } else if (!product.name.includes(event.target.value)) {
                productElem.parentElement.parentElement.classList.add('hidden');
              }
            })
          } } />
        </div>
      </div>
      <div className="thumbnail-container">
        { props.selectedProducts.map((product) => {
          return (
            <div className="thumbnail" key={product.name}>
              <ProductSummary product={product} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

const mapState = ({products}, ownProps) => {
  const categoryName = ownProps.match.params.name
  let selectedProducts = categoryName === 'all' ? products : products.filter(product => product.category === categoryName);

  return {
    selectedProducts
  }

};
const mapDispatch = (/*dispatch*/) => () => ({});
export default connect(mapState, mapDispatch)(CategoryPage);
