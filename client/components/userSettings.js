import React, { Component } from 'react';
import { connect } from 'react-redux';
import { putUser } from '../store'

class Settings extends Component {
  constructor(props){
    super(props)
    this.submitHandler = this.submitHandler.bind(this)
  }

  submitHandler(event) {
    event.preventDefault();
    let userInfo = {userId: this.props.user.id}
    for (let i = 0; i < event.target.length - 1; i++) {
      userInfo[event.target[i].name] = event.target[i].value
    }
    this.props.dispatchUpdateUser(userInfo);
  }


  render() {
    const user = this.props.user
    let userSections = []
    let credit = {},
        billing = {},
        shipping = {},
        profile = {}
    for (let detail in user){
      if (detail.startsWith('credit')){
        credit[detail] = user[detail]
      }
      if (detail.startsWith('billing')){
        billing[detail] = user[detail]
      }
      if (detail.startsWith('address')){
        shipping[detail] = user[detail]
      }
      if (detail === 'email' || detail === 'phone'){
        profile[detail] = user[detail]
      }

    }
    userSections = [{credit: credit}, {billing: billing}, {shipping: shipping}, {profile: profile}]
    return (
      <div>Edit Your Info
      {
        userSections.map(section => (
        <div key={Math.floor(Math.random() * 1000)}>
          <form name={Object.keys(section)[0]} onSubmit={this.submitHandler}>
            <ul>
              {
                Object.keys(section[Object.keys(section)[0]]).map(detail => (
                  <li key={detail}>
                    <label>{detail}</label>
                    <input name={detail} defaultValue={section[detail]} />
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
  dispatchUpdateUser: (user) => dispatch(putUser(user))
})

export default connect(mapState, mapDispatch)(Settings)
