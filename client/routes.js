import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Login, Signup, UserHome, Category, SingleProductPage, CartPage} from './components'
import {me, fetchProducts, fetchCart} from './store'


/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount () {
    console.log('in routes.js loadInitialData()')
    this.props.loadInitialData()
    this.props.loadUsersCart(this.props.userId)
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.userId !== this.props.user) {
      this.props.loadUsersCart(nextProps.userId)
    }
  }

  render () {
    const {isLoggedIn} = this.props;
    console.log('routes', this.props)
    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/cart" component={CartPage} />
        <Route exact path="/category/:name" component={Category} />
        <Route path="/category/:name/:id" component={SingleProductPage} />
        {
          isLoggedIn &&
            <Switch>
              {/* Routes placed here are only available after logging in */}
              <Route path="/home" component={UserHome} />
            </Switch>
        }
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  console.log('state in routes.js', state);
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    userId: state.user.id
    
  }
}

const mapDispatch = (dispatch) => {
  console.log('about to update store');
  return {
    loadInitialData () {
      dispatch(me());
      dispatch(fetchProducts());
    },
    loadUsersCart(userId) {
      dispatch(fetchCart(userId))
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
