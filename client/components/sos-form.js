import React from 'react'
import { connect } from 'react-redux'
import filterObj from 'filter-obj'

function booleanDropDown(key, val) {
  return (
    <React.Fragment>
      <label>{key}</label>
      <select name={key} defaultValue={val}>
        <option value="true" >True</option>
        <option value="false" >False</option>
      </select>
    </React.Fragment>
  )
}

function formfield(obj, key, {exclude = []}) {
  const hidden = exclude.includes(key) ? 'hidden' : undefined
  return (
    <React.Fragment>
      {!hidden && <label>{key}</label>}
      <input name ={key} defaultValue={obj[key]} type={hidden} />
    </React.Fragment>
  )
}


function SOSForm(props) {
  let obj = filterObj(props.obj, (key) => {
    return key !== 'createdAt' && key !== 'updatedAt'
  })
  let keys = Object.keys(obj)

  return (
    <div>
      <form onSubmit={props.handleSubmit}>
        <ul type="none">
          {
            keys.map(key => (
              <li key={key}>
                {typeof obj[key] === 'boolean'
                ? booleanDropDown(key, obj[key])
                : formfield(obj, key, props)
                }
              </li>
            ))
          }
        </ul>
        <button type="submit">Update</button>
      </form>
    </div>
  )

}

const mapState = null
const mapDispatch = null
export default connect(mapState, mapDispatch)(SOSForm);
