import React, {Component} from 'react'
import {connect} from 'react-redux'
import {SOSForm} from './index'
import { fetchProducts } from '../store'
import axios from 'axios'

class AddProduct extends Component {
  constructor () {
    super()
    this.addProduct = this.addProduct.bind(this)
  }

  async addProduct(event) {
    event.preventDefault()
    const product = {};
    for (let field of event.target) {
      if (field.value) product[field.name] = field.value
    }
    let newProduct = {}
    try {
      newProduct = await axios.post(`/api/products/admin`, product)
    }
    catch (err) {
      console.log(err)
    }
    console.log(newProduct.data)
    await this.props.fetchProducts()
    this.props.history.push(`/products/admin/`)
  }

  render() {
    const product = {
      name: '',
      category: '',
      description: '',
      price: '',
      imageUrl: '',
      rating: '',
    }
    return (
      <div className="visible">
        <h3>Add New Product</h3>
        <SOSForm obj={product} handleSubmit={this.addProduct} />
      </div>
    )
  }
}

const mapState = (state) => ({
  products: state.products
})
const mapDispatch = (dispatch) => () => ({
  fetchProducts() {
    dispatch(fetchProducts())
  }
})
export default connect(mapState, mapDispatch)(AddProduct);
