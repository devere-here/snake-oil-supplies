import React, { Component } from 'react';
import { connect } from 'react-redux';
import { putUser } from '../store';
import filterObj from 'filter-obj';

class UpdateUserSettings extends Component {
  constructor(props){
    super(props)
    this.submitHandler = this.submitHandler.bind(this)
  }

  submitHandler(event) {
    event.preventDefault();
    const user = this.props.user
    let updatedUser = Object.assign({}, user)
    for (let i = 0; i < event.target.length - 1; i++) {
      updatedUser[event.target[i].name] = event.target[i].value
    }
    this.props.dispatchUpdateUser(user.id, updatedUser);
    this.props.history.push('/settings')
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
      <h1>Edit Your Info</h1>
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
                    <input name={detail} defaultValue={userSection[detail]} />
                  </li>
                ))
              }
            </ul>
            <button type="submit">Submit Edit</button>
          </form>
        </div>
        ))
      }
      </div>
    )
  }
}

const mapState = state => ({user: state.user})
const mapDispatch = dispatch => ({
  dispatchUpdateUser: (id, user) => dispatch(putUser(id, user))
})

export default connect(mapState, mapDispatch)(UpdateUserSettings)
