import React from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom';
import filterObj from 'filter-obj';

function UserSettings(props) {
  console.log('user settings')
  const user = props.user
  let userSections = []
  const sections = ['credit', 'billing', 'address', 'profile']
  for (let section of sections) {
    if (section !== 'profile') {
      userSections.push(filterObj(user, key => key.startsWith(section)));
    } else {
      userSections.push(filterObj(user, key => key === 'email' || key === 'phone'));
    }
  }
  const userSectionsMap = new Map()
  for (let j = 0; j < sections.length; j++) {
    userSectionsMap.set(userSections[j], sections[j])
  }

  return (
    <div>
      <h1>Your Information</h1>
      {
        userSections.map(userSection => (
        <div key={Math.floor(Math.random() * 1000)}>
        <h2>
          {userSectionsMap.get(userSection)}
        </h2>
          <div>
            <ul type="none">
              {
                Object.keys(userSection).map(detail => (
                  <li key={detail}>
                  <h3>{detail.charAt(0).toUpperCase() + detail.replace(/([A-Z])/g, ' $1').trim().slice(1)}</h3>
                    <p>{userSection[detail]}</p>
                  </li>
                ))
              }
            </ul>
          </div>
        </div>
        ))
      }
      <Link to="/settings/updateSettings">
        <button>Update Information</button>
      </Link>
    </div>
  )

}

const mapState = state => ({user: state.user})
const mapDispatch = null
export default connect(mapState, mapDispatch)(UserSettings);
