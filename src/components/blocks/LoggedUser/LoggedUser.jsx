import React, { Component } from 'react'
import './styles.css'
import '../../../styles/elements.css'

export default class LoggedUser extends Component {
  constructor(props) {
    super(props);

    this.onLogOut = this.onLogOut.bind(this);
  }

  onLogOut() {
    this.props.logOut();
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
