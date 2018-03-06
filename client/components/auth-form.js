import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'

/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div id="formPage">
      <form id="loginSignupForm" onSubmit={handleSubmit} name={name}>
        <h2>Welcome Guest!</h2>
        <h3>Please {displayName} Below</h3>
        <div className="loginSignupInputContainer">
          <label htmlFor="email">Email</label>
          <input name="email" type="text" />
        </div>
        <div className="loginSignupInputContainer">
          <label htmlFor="password">Password</label>
          <input name="password" type="password" required />
        </div>
        <div id="loginSignupButtonContainer">
          <button type="submit">{displayName}</button>
          <a href="/auth/google">with Google</a>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>

    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = (state) => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleSubmit (evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
