import React from 'react'
//import PropTypes from 'prop-types'
import {connect} from 'react-redux'
// import {Link, withRouter} from 'react-router-dom'
import { ProductSummary } from './index'

const CartPage = (props) => {
  console.log('props', props);

  let keys = Object.keys(localStorage);
  console.log(keys)
  let cartProducts = props.products.filter(function(product){
    console.log("MADE IT TO FILTER")
    console.log(product.id)
    return keys.indexOf(product.id.toString()) !== -1
  })
  console.log(cartProducts)
  return (
    <div>
      <h1>In the cart page</h1>
      {
        cartProducts.map((product) => {
          return (
            <div key={product.id}>
              <img src={product.imageUrl} height="200px" width="200px" />
              <h3> {product.name} </h3>
              <h5> {product.price} </h5>
              <h2>QUANTITY : {localStorage.getItem(product.id.toString())}</h2>

              <hr />
            </div>

          )
        })
      }
    </div>
  )
}


const mapState = ({products}, ownProps) => {
  //const categoryName = ownProps.match.params.name
  console.log(ownProps)
  console.log(products)

  return {
    products
  }
};
const mapDispatch = (/*dispatch*/) => () => ({});
export default connect(mapState, mapDispatch)(CartPage);


// { props.selectedProducts.map((product) => {
//   return (
//     <div key={product.name}>
//       <ProductSummary product={product} />
//       <hr />
//     </div>
//   )
// })
// }
