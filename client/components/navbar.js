import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({ handleClick, isLoggedIn }) => (
  <div className="navBar">

    <div id="navBarContainerTop">
      <h1>Snake Oil Supplies</h1>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link className="navBarTopButton" to="/home">
            Home
          </Link>
          <a href="#" className="navBarTopButton" onClick={handleClick}>
            Logout
          </a>
          <Link to="/settings">Settings</Link>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link className="navBarTopButton" to="/login">
            Login
          </Link>
          <Link className="navBarTopButton" to="/signup">
            Sign Up
          </Link>
        </div>
      )}
      <Link className="navBarTopButton" to="/cart">
        <span className="glyphicon glyphicon-shopping-cart" />Cart
      </Link>
    </div>
    <div id="navBarContainerBottom">
      <Link className="navBarBottomButton" to="/category/apparel">Apparel</Link>
      <Link className="navBarBottomButton" to="/category/health">Health/Supplements</Link>
      <Link className="navBarBottomButton" to="/category/miscellaneous">Miscellaneous</Link>
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





// <h1>Snake Oil Supplies</h1>
//     <nav>
//       {isLoggedIn ? (
//         <div>
//           {/* The navbar will show these links after you log in */}
//           <Link to="/home">Home</Link>
//           <a href="#" onClick={handleClick}>
//             Logout
//           </a>
//         </div>
//       ) : (
//         <div>
//           {/* The navbar will show these links before you log in */}
//           <Link to="/login">Login</Link>
//           <Link to="/signup">Sign Up</Link>

//         </div>
//       )}
//       <Link to="/category/apparel">Apparel</Link>
//       <Link to="/category/health">Health/Supplements</Link>
//       <Link to="/category/miscellaneous">Miscellaneous</Link>
//       <Link to="/cart">View Cart</Link>
//     </nav>
  //   <hr />
  // </div>
