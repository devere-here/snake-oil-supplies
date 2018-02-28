import React from 'react'
//import PropTypes from 'prop-types'
import {connect} from 'react-redux'
// import {Link, withRouter} from 'react-router-dom'

const CartPage = (props) => {
  console.log('props', props);
  return (
    <div>
      <h1>In the cart page</h1>
    </div>
  )
}

const mapState = ({products}, ownProps) => {
  //const categoryName = ownProps.match.params.name
  console.log(ownProps)
  console.log(products)

  return {
    //selectedProducts: products.filter(product => product.category === categoryName)
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
