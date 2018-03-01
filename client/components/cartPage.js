import React from 'react'
//import PropTypes from 'prop-types'
import {connect} from 'react-redux'
// import {Link, withRouter} from 'react-router-dom'
import { ProductSummary } from './index'

const CartPage = (props) => {
  console.log('props', props);
  let cartProducts;
  if (props.isLoggedIn){
    console.log('user is logged in. the cart should come from state')
    cartProducts = props.cart;
  }
  else {
    console.log('user is not logged in. the cart should come from localstorage')
    let keys = Object.keys(localStorage);
    cartProducts = props.products.filter(function(product){
      return keys.indexOf(product.id.toString()) !== -1
    })
  }

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


const mapState = (state, ownProps) => {
  //const categoryName = ownProps.match.params.name
  console.log(state)

  return {
    isLoggedIn: !!state.user.id,
    products: state.products,
    cart: state.cart
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
