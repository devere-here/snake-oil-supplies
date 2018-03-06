import React from 'react'
import { connect } from 'react-redux'
import filterObj from 'filter-obj'

function SOSForm(props) {
  let obj = filterObj(props.obj, (key) => {
    return key !== 'createdAt' && key !== 'updatedAt'
  })
  let keys = Object.keys(obj)

  return (
    <div>
      <h1>User Information</h1>
      <form onSubmit={props.handleSubmit}>
        <ul type="none">
          {
            keys.map(key => (
              <li key={key}>
                <label>{key}</label>
                <input name ={key} defaultValue={obj[key]} />
              </li>
            ))
          }
        </ul>
        <button type="submit">Update</button>
      </form>
    </div>
  )

}

const mapState = state => ({ user: state.user })
const mapDispatch = null
export default connect(mapState, mapDispatch)(SOSForm);
