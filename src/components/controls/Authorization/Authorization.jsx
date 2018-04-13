import React, { Component } from 'react'
import { firebaseConnect, getVal } from 'react-redux-firebase'
import { connect } from 'react-redux'
import { compose } from 'redux'
import './styles.css'
import LoggedUser from '../../blocks/LoggedUser/LoggedUser'
import SignIn from '../../inputs/buttons/SignIn/SignIn'
import SignUp from '../../inputs/buttons/SignUp/SignUp'

class Authorization extends Component {
  render() { 
    const authorization = this.props.profile && this.props.profile.userName ? (
      <LoggedUser
        userName={this.props.profile.userName} />
    ) : (
      <div className="sign-buttons">
        <SignIn />
        <SignUp />
      </div>
    );

    return (
      <div id="sign-buttons">{ authorization }</div>
    )
  }
}

export default compose(
  firebaseConnect(),
  connect((state) => ({
    auth: getVal(state.firebase, 'auth'),
    profile: getVal(state.firebase, 'profile')
  }))
)(Authorization);
