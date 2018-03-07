import React, {Component} from 'react'
// import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {SOSForm} from './index'
import { fetchProducts } from '../store'
import axios from 'axios'

class ProductEdit extends Component {
  constructor () {
    super()
    this.editProduct = this.editProduct.bind(this)
    this.deleteProduct = this.deleteProduct.bind(this)
  }

  async editProduct(event) {
    event.preventDefault()
    const product = {};
    for (let field of event.target) {
      if (field.value) product[field.name] = field.value
    }

    try {
      await axios.put(`/api/products/admin/${product.id}`, product)
      this.props.fetchProducts()
    }
    catch (err) {
      console.log(err)
    }
    this.props.history.push('/products/admin')
  }

  async deleteProduct(id) {
    event.preventDefault()

    try {
      await axios.delete(`/api/products/admin/${id}`)
      this.props.fetchProducts()
    }
    catch (err) {
      console.log(err)
    }
    this.props.history.push('/products/admin')
  }

  render() {
    const productId = +this.props.match.params.id
    const product = this.props.products.find((productInstance) => {
      return productInstance.id === productId
    })

    return (
      <div id={productId} className="visible">
        <h3>Edit {product.name}</h3>
        <SOSForm obj={product} handleSubmit={this.editProduct} />
        <button onClick={ () => this.deleteProduct(product.id)}>Delete</button>
      </div>
    )
  }
}

const mapState = (state) => ({
  products: state.products
});
const mapDispatch = (dispatch) => () => ({
  fetchProducts() {
    dispatch(fetchProducts())
  }
});
export default connect(mapState, mapDispatch)(ProductEdit);
