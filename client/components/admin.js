import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

function AdminPage() {

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
    </div>
  )
}

const mapState = null;
const mapDispatch = null;

export default connect(mapState, mapDispatch)(AdminPage);
