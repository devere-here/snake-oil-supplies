import React, { Component } from 'react';
import { connect } from 'react-redux';

class Settings extends Component {
  constructor(props){
    super(props)
    this.submitHandler = this.submitHandler.bind(this)
  }

  submitHandler(event) {
    event.preventDefault();
    console.log('form length', event.target)
    let userInfo = {userId: this.props.user.id}
    Array.prototype.forEach( inputElem => {
      console.log('input element', inputElem)
      if (inputElem !== 'button') {
        userInfo[inputElem.name] = inputElem.value
      }
    }).call(event.target)
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
                    <input name={detail} label={detail} defaultValue={section[detail]} />
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

const mapState = (state) => ({user: state.user})
const mapDispatch = null

export default connect(mapState, mapDispatch)(Settings)
