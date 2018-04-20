import React, { Component } from 'react'
import { firebaseConnect } from 'react-redux-firebase'
import './styles.scss'

class LoggedUser extends Component {
  constructor(props) {
    super(props);

    this.onLogOut = this.onLogOut.bind(this);
  }

  onLogOut() {
    this.props.firebase.logout();
  }

  render() {
    return (
      <div className="flex-row-center">
        <div>
          <p className="userName">
            {this.props.userName}
          </p>
        </div>
        <div>
          <input 
            className="nav-button"
            type="submit"
            value="Log out"
            onClick={ this.onLogOut } />
        </div>
      </div>
    )
  }
}

export default firebaseConnect()(LoggedUser)