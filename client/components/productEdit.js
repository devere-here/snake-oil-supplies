import React, {Component} from 'react'
// import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {SOSForm} from './index'
import { fetchProducts } from '../store'
import axios from 'axios'


class ProductEdit extends Component {
  constructor () {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async handleSubmit(event) {
    event.preventDefault()
    const product = {};
    for (let field of event.target) {
      if (field.value) product[field.name] = field.value
    }
    console.log('product', product)
    try {
      await axios.put(`/api/products/${product.id}`, product)
      console.log('fetch products')
      this.props.fetchProducts()
    }
    catch (err) {
      console.log(err)
    }
    console.log('redirect to /admin')
    this.props.history.push('/admin')
  }

  render() {
    const product = this.props.products.find((productInstance) => {
      return productInstance.id === +this.props.match.params.id
    })
    console.log('product', product)
    return (
      <div id={product.id} className="visible">
        <h3>Edit {product.name}</h3>
        <SOSForm obj={product} handleSubmit={this.handleSubmit} />
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
