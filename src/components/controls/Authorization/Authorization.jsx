import React, { Component } from 'react'
import cookie from 'react-cookies'
import './styles.css'
import LoggedUser from '../../blocks/LoggedUser/LoggedUser'
import SignIn from '../../inputs/buttons/SignIn/SignIn'
import SignUp from '../../inputs/buttons/SignUp/SignUp'
import { changeCookies } from '../../../events'

export default class Authorization extends Component {
  constructor(props) {
    super(props);

    this.logOut = this.logOut.bind(this);
    this.onTriggerEvent = this.onTriggerEvent.bind(this);
  }

  componentDidMount() {
    const signInControlElem = document.getElementById('signIn-control');
    signInControlElem.addEventListener(changeCookies, this.onTriggerEvent.bind(this));
  }

  onTriggerEvent() {
    this.setState({userName: cookie.load('userName')});  
  }

  logOut() {
    this.setState({userName: ''});
    cookie.remove('userName');
  }

  render() {
    const signInControl = this.state && this.state.userName ? (
      <LoggedUser
        userName={this.state.userName} 
        logOut={this.logOut}/>
    ) : (
      <div className="signIn-control">
        <SignIn />
        <SignUp />
      </div>
    );

    return (
      <div id="signIn-control">{ signInControl }</div>
    )
  }
}
