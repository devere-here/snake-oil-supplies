import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateCart, postReview, putReview } from '../store';
import axios from 'axios';

class singleProductPage extends Component {
  constructor(props) {
    super(props);

    this.addToCart = this.addToCart.bind(this);
    this.submitReview = this.submitReview.bind(this);
    this.validationQuantity = 0;
  }

  async addToCart(evt) {
    evt.preventDefault();

    this.validationQuantity = +evt.target.quantity.value;

    let id = this.props.product.id,
      addedProduct = this.props.product,
      quantity = evt.target.quantity.value;

    if (quantity < 1) {
      quantity = 1;
    } else if (Number.isInteger() === false) {
      quantity = Math.ceil(quantity);
    }

    let localCart = this.props.cart;
    let index = localCart.indexOf(addedProduct);

    if (index !== -1) {
      localCart[index].quantity += +quantity;
      if (this.props.isLoggedIn) {

        let putObj = {
          quantity: localCart[index].quantity,
          productId: localCart[index].id,
          orderId: this.props.orderId
        }
        await axios.put(`/api/orderDetails/${putObj.orderId}`, putObj)

      }
    } else {
      addedProduct.quantity = quantity;
      localCart.push(addedProduct);
      if (this.props.isLoggedIn) {

        let postObj = {
          quantity: quantity,
          productId: addedProduct.id,
          orderId: this.props.orderId
        }
        await axios.post('/api/orderDetails', { orderDetailsArray: [postObj] });
      }
    }

    if (!this.props.isLoggedIn) {
      localStorage.setItem(id, quantity);

    }

    this.props.dispatchUpdateCart(localCart);

    this.props.history.push('/cart');
  }

  submitReview(evt) {

    let reviewData = {
      emailAddress: this.props.user.email,
      productId: this.props.product.id,
      userId: this.props.user.id,
      rating: +evt.target[1].value,
      reviewText: evt.target[0].value
    };

    let arrayOfUserIds = []
    this.props.review.forEach(review => {
      arrayOfUserIds.push(review.userId)
    })

    if (arrayOfUserIds.indexOf(this.props.user.id) === -1) {
      this.props.addReview(reviewData)
    } else {
      this.props.updateReview(this.props.productId, reviewData)
    }


  }

  render() {

    console.log('PROPS OVA HERE', this.props)
    const { product, review } = this.props;

    return (

      !product ? null
        : (
          <div id="productPageBackground">
            <div id="productPageContainer">
              <div id="productPageContainerTop">
                <img id="productPageMainPhoto" src={product.imageUrl} width="50%" />
                <div id="productPageInfoContainer">
                  <h1>{product.name}</h1>
                  <h2>Price: ${product.price}</h2>
                  <h4>Additional Info:</h4>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vel vulputate nulla, ac blandit sapien. Vivamus vel ligula at erat ultricies aliquet. Vestibulum feugiat, neque ac pharetra tempor, est tellus imperdiet tellus, eget lacinia mi augue a ante. Etiam et orci a justo lobortis lacinia in vel leo. Vestibulum suscipit massa eget tempor vehicula. Vivamus eget euismod lectus, eget faucibus nulla. Maecenas lobortis sollicitudin leo. Aenean interdum rutrum leo sit amet vestibulum. Nullam sollicitudin non massa id tincidunt.

            Phasellus viverra consectetur nulla eget suscipit. Praesent vulputate tristique dui, auctor bibendum orci scelerisque nec. Pellentesque mauris nisl, molestie ac ex in, fringilla elementum ligula.</p>
                  <form id="productPageFormContainer" onSubmit={this.addToCart}>
                    <label>Quantity:</label>
                    <input
                      name="quantity"
                      defaultValue="1"
                      onChange={this.handleChange}
                      min="0"
                      step="1"
                      size="15"
                    />
                    <button type="submit">Add To Cart</button>
                  </form>
                </div>
              </div>
              <div>
                <h2>Previous Reviews:</h2>
                <div className="productPageReviewBox">
                  {
                    review.map((singleReview, index) => (
                      <div className="review-box" key={index}>
                        <h5>Rating: {singleReview.rating}</h5>
                        <p>{singleReview.reviewText}</p>
                        <h5>by: {singleReview.emailAddress}</h5>
                      </div>
                    ))
                  }
                </div>
              </div>
              <div id="productPageReviewFormContainer">
                <h3>Write a review for this Product</h3>

                <form onSubmit={this.submitReview}>
                  <textarea rows="5" cols="60" name="textRating" />
                  <select name="numberRating">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                  <input type="submit" />
                </form>
              </div>

            </div>
          </div>


        )


    )
  }
}

const mapState = ({ products, quantity, cart, user, review }, ownProps) => {
  const paramId = Number(ownProps.match.params.id);

  return {
    product: products.find(product => product.id === paramId),
    quantity,
    products,
    cart,
    orderId: cart.id,
    isLoggedIn: !!user.id,
    review: review.filter(singleReview => singleReview.productId === paramId),
    user
  }
};

const mapDispatch = (dispatch) => ({
  dispatchUpdateCart(arr) {
    dispatch(updateCart(arr))
  },
  addReview(review) {
    dispatch(postReview(review))
  },
  updateReview(id, review) {
    dispatch(putReview(id, review))
  }

});

export default connect(mapState, mapDispatch)(singleProductPage);
