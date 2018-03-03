import React, {Component} from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom';
import filterObj from 'filter-obj';



class UserSettings extends Component {
  constructor(props) {
    super(props)
    this
  }
  render() {
    const user = this.props.user
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
          <h3>
            {userSectionsMap.get(userSection)}
          </h3>
            <form onSubmit={this.submitHandler}>
              <ul type="none">
                {
                  Object.keys(userSection).map(detail => (
                    <li key={detail}>
                    <label>{detail.charAt(0).toUpperCase() + detail.replace(/([A-Z])/g, ' $1').trim().slice(1)}</label>
                      <h3>{userSection[detail]}</h3>
                    </li>
                  ))
                }
              </ul>
            </form>
          </div>
          ))
        }
        <Link to="/settings/updateSettings">
          <button>Update Information</button>
        </Link>
      </div>
    )

  }
}

const mapState = state => ({user: state.user})
const mapDispatch = null
export default connect(mapState, mapDispatch)(UserSettings);
