import React, { Component } from 'react'
import { connect } from 'react-redux'

class singleProductPage extends Component {
  constructor(props) {
    super(props);

    this.addToCart = this.addToCart.bind(this);
  }

  addToCart(evt) {
    evt.preventDefault();

    let id = this.props.product.id,
        quantity = evt.target.quantity.value,
        keys = Object.keys(localStorage);

    if (keys.find((key) => +key === id)) {
      quantity = +localStorage.getItem(id) + +quantity
    }

    localStorage.setItem(id, quantity);

    console.log('localStorage.getItem(id)', localStorage.getItem(id));

  }

  render() {

    const { product } = this.props;
    console.log('this.props', this.props);
    return (

      !product ? null
        : (
          <div>
            <img src={product.imageUrl} width="50%" />
            <h1>{product.name}</h1>
            <h2>Price: {product.price}</h2>
            <h3>Rating: {product.rating}</h3>
            <p>Additional Info: {'Temporary description'}</p>
            <h3>Quantity:</h3>
            <form onSubmit={this.addToCart}>
              <input
                name="quantity"
                defaultValue="1"
                onChange={this.handleChange}
              />
              <button type="submit">Add To Cart</button>
            </form>
          </div>

        )


    )
  }
}

const mapState = ({ products, quantity }, ownProps) => {
  const paramId = Number(ownProps.match.params.id);
  console.log('ownProps', ownProps);

  return {
    product: products.find(product => product.id === paramId),
    quantity,
    products
  }
};
const mapDispatch = (/*dispatch*/) => () => ({});
export default connect(mapState, mapDispatch)(singleProductPage);
