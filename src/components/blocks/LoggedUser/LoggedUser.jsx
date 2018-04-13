import React, { Component } from 'react'
import { firebaseConnect } from 'react-redux-firebase'
import './styles.css'
import '../../../styles/elements.css'

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
      <div className="logged-user">
        <p className="userName">{ this.props.userName }</p>
        <input 
          className="nav-button"
          type="submit"
          value="Log out"
          onClick={ this.onLogOut }/>
      </div>
    )
  }
}

export default firebaseConnect()(LoggedUser)