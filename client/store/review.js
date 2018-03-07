import axios from 'axios'
import history from '../history'

//ACTION TYPES

const GET_REVIEWS = 'GET_REVIEWS';
const POST_REVIEW = 'POST_REVIEW';
const UPDATE_REVIEW = 'UPDATE_REVIEW';


//INITIAL STATE
const defaultReviews = [];

//ACTION CREATORS

const getAllReviews = reviews => ({ type: GET_REVIEWS, reviews })

const addNewReview = review => ({ type: POST_REVIEW, review })

const updateReview = review => ({type: UPDATE_REVIEW, review})

//THUNKS

export const fetchReviews = () => async (dispatch) => {
  try {
    const reviews = await axios.get(`/api/review`);
    dispatch(getAllReviews(reviews.data));
    return reviews
  }
  catch (err) {
    console.log(err)
  }
}

export const postReview = (review) => async (dispatch) => {
  try {
    const reviews = await axios.post(`/api/review`, review);
    dispatch(addNewReview(reviews.data));
    return reviews
  }
  catch (err) {
    console.log(err)
  }
}

export const putReview = (id, review) =>
async (dispatch) => {
  try {
    const updatedReview = await axios.put(`/api/review/${review.productId}`, review)
    dispatch(updateReview(updatedReview.data))
    return updatedReview;
  }
  catch (err) {
    console.log(err)
  }
}

//REDUCER

export default function (prevState = defaultReviews, action) {
  switch (action.type) {
    case GET_REVIEWS:
      return action.reviews.reverse();
    case POST_REVIEW:
      return [...prevState, action.review].reverse();
    case UPDATE_REVIEW:
      return prevState.map(review => {
        return (action.review.userId === review.userId && action.review.productId === review.productId) ? action.review : review
      })
    default:
      return prevState;
  }
}
