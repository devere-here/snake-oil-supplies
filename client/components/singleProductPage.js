import React from 'react'
import {connect} from 'react-redux'

class singleProductPage extends Component {
  constructor () {
    super ();
    this.state = {
      quantity: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.addToCart = this.addToCart.bind(this);
  }
  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }
  addToCart() {
    //package cart item and send to localStorage
  }

  const {product} = this.props;
  return (
    <div>
      <img src={product.imageUrl} />
      <h1>{product.name}</h1>
      <h2>Price: {product.price}</h2>
      <h3>Rating: {product.rating}</h3>
      <p>Additional Info: {'Temporary description'}</p>
      <h3>Quantity:</h3>
      <input
        name="quantity"
        defaultValue="1"
        value={this.state.quantity}
        onChange={this.handleChange}
      />
      <button onClick={this.addToCart}>Add To Cart</button>
    </div>
  )
}

const mapState = () => {};
const mapDispatch = (/*dispatch*/) => () => {};
export default connect(mapState, mapDispatch)(singleProductPage);
