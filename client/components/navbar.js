import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({ handleClick, isLoggedIn }) => (
  <div className="navBar">

    <div id="navBarTopSection">
      <h1>
        <img className="navBarSnakeIcon"src="https://png.icons8.com/android/200/year-of-snake.png" />
      Snake Oil Supplies
      </h1>

      <div id={isLoggedIn ? 'navBarTopSectionUserLinkContainer' : 'navBarTopSectionGuestLinkContainer'}>
        {isLoggedIn ? (
          <span>
            {/* The navbar will show these links after you log in */}
            <Link className="navBarTopLink" to="/home">
              Home
            </Link>
            <a href="#" className="navBarTopLink" onClick={handleClick}>
              Logout
            </a>
            <Link className="navBarTopLink" to="/settings">Settings</Link>
          </span>
        ) : (
          <span>
            {/* The navbar will show these links before you log in */}
            <Link className="navBarTopLink" to="/login">
              Login
            </Link>
            <Link className="navBarTopLink" to="/signup">
              Sign Up
            </Link>
          </span>
        )}
        <Link className="navBarTopLink" to="/cart">
          Cart
        </Link>
        <Link className="navBarTopLink" to="/admin">
          Admin
        </Link>
      </div>
    </div>

    <div id="navBarBottomSection">
      <Link className="navBarBottomLink" to="/category/all">All Products</Link>
      <Link className="navBarBottomLink" to="/category/apparel">Apparel</Link>
      <Link className="navBarBottomLink" to="/category/health">Health/Supplements</Link>
      <Link className="navBarBottomLink" to="/category/miscellaneous">Miscellaneous</Link>
    </div>
  </div>

)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(Navbar))

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}

