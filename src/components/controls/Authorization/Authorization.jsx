import React, { Component } from 'react'
import { firebaseConnect, getVal } from 'react-redux-firebase'
import { connect } from 'react-redux'
import { compose } from 'redux'
import LoggedUser from 'components/blocks/LoggedUser/LoggedUser'
import SignIn from 'components/inputs/buttons/SignIn/SignIn'
import SignUp from 'components/inputs/buttons/SignUp/SignUp'
import './styles.scss'

class Authorization extends Component {
  render() { 
    const authorization = this.props.profile && this.props.profile.userName ? (
      <LoggedUser
        userName={this.props.profile.userName} />
    ) : (
      <div className="flex-row">
        <SignIn />
        <SignUp />
      </div>
    );

    return (
      <div className="authorization">
        {authorization}
      </div>
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
