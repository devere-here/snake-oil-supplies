import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
// import filterObj from 'filter-obj';



function SOSForm(obj) {
  let keyValuePairs = new Map;
  let keyValueArr = [];

  for (let key in obj) {
    keyValueArr.push({ key: obj[key] }) //actual key/value arr for iteration
    keyValuePairs.set({ key: obj[key] }, key) //map for exposing key name ---saves use from using Object.keys(obj)[0]
  }

  return (
    <div>
      <h1>User Information</h1>

      <ul type="none">
        {
          keyValueArr.map(pair => (
            <li key={pair[keyValuePairs.get(pair)]}>
              <h3>key{keyValuePairs.get(pair)}</h3>
              <p>value{pair[keyValuePairs.get(pair)]}</p>
            </li>
          ))
        }
      </ul>

    </div>
  )

}

const mapState = state => ({ user: state.user })
const mapDispatch = null
export default connect(mapState, mapDispatch)(SOSForm);
