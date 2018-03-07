import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const AdminPage = (props) => {
  return (
    <div>
      <h1>Admin Page</h1>
      <Link to="/orders/admin">
        <button>All Orders</button>
      </Link>
      <Link to="/users/admin">
        <button>All Customers</button>
      </Link>
      <Link to="/products/admin">
        <button>All Products</button>
      </Link>
      {
        !props.isAdmin ? null :
          <Link to={`/products/admin/add-product`}><button>Add Product</button></Link>
      }
    </div>
  )
}

const mapState = (state) => ({
  isAdmin: !!state.user.isAdmin,
})

const mapDispatch = null;

export default connect(mapState, mapDispatch)(AdminPage);
