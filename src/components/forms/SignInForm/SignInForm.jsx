import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import cookie from 'react-cookies'
import Loader from 'react-loader-spinner'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import firebase from 'firebase'
import 'firebase/database'
import './styles.css'
import '../../../styles/elements.css'
import * as mockUsers from './mock.json'
import { changeCookies } from '../../../events'

export default class signInForm extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      email: '',
      password: '',
      userName: '',
      isError: false,
      isLoading: false,
      error: '',
      redirect: false,
      formInvalid: true
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.signInUser = this.signInUser.bind(this);
  }

  onSignIn(userName) {
    this.triggerEvent();
  }

  triggerEvent() {
    const event = new Event('Event');
    event.initEvent(changeCookies);

    const signInControlElem = document.getElementById('signIn-control');
    signInControlElem.dispatchEvent(event);
  }

  handleInputChange(event) {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({
      [name]: value
    },
    () => {this.validateField(name, value)});
  }

  validateField(fieldName, value) {
    let validationErrors = this.state.error;

    switch(fieldName) {
      case 'email':
        validationErrors = (value === '')
          ? '' 
          : wrongCharacter(value) || shortField(value) || wrongEmail(value);
        break;
      default:
        break;
    }

    this.setState({
      error: validationErrors
    }, 
    () => { this.hasErrors(); });

    function shortField(value) {
      return (value.length >= 6 && value.length <= 30)
        ? ''
        : 'Please use between 6 and 30 character';
    }

    function wrongCharacter(value) {
      return (value.match(/^[a-zA-Z0-9@.]+$/))
        ? ''
        : 'You can use letters, digits and periods'
    }

    function wrongEmail(value) {
      return value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
        ? ''
        : 'Please, enter email in correct format'
    }
  }

  hasErrors() {
    if (!this.state.error && this.state.email && this.state.password) {
      this.setState({formInvalid: false});
    }
  }

  handleSubmit(event) {
    this.signInUser(this.state.email, this.state.password);
    
    this.setState({ isLoading : true });
    this.getUserNameIfUserExist().then(userName => {
      this.setState({
        isError : false,
        isLoading: false,
        redirect: true
      });
      this.onsignIn(userName);
    }).catch(() => {
      this.setState({
        isError : true,
        isLoading: false
      });
    });

    event.preventDefault();
  }

  signInUser(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((data) => {
        console.log(`You logged In`, data);
      })
      .catch(function(error) {
        const errorCode = error.code;
        const errorMessage = error.message;

        if (errorCode === 'auth/wrong-password') {
          alert('Wrong password.');
        } else {
          alert(errorMessage);
        }
        
        console.log(error);
    });
  }

  getUserNameIfUserExist() {
    return new Promise((resolve, reject) => {
      let userName = '';
      mockUsers.map(user => {
        if (user.email === this.state.email && user.password === this.state.password) {
          return userName = user.userName;
        } 
      });
      
      userName
        ? resolve(userName)
        : reject();
    });
  }

  render() {
    const errorMessage = this.state.isError ? (
      "signIn or password incorrect"
    ) : (
      null
    );

    const renderRedirect = this.state.redirect ? (
      <Redirect to='/dashboard' />
    ) : (
      null
    );

    const content = this.state.isLoading ? (
      <Loader 
        type="Puff"
        color="#00BFFF"
        height="100"	
        width="100"
      />   
    ) : (
      <div className="form-container">
        <form id="form" onSubmit={this.handleSubmit}> 
        {renderRedirect}
        <h3 className="form-header">Log In</h3>
          <TextField
            hintText="Email"
            name="email"
            type="text"
            floatingLabelText="Email"
            value={this.state.email}
            onChange={this.handleInputChange} 
            errorText={this.state.error}
          /><br />
          <TextField
            hintText="Password"
            name="password"
            floatingLabelText="Password"
            type="password"
            value={this.state.password}
            onChange={this.handleInputChange}
          /><br />
          <div className="submit-button">
            <RaisedButton label="Sumbit" primary={true} onClick={this.handleSubmit} disabled={this.state.formInvalid} />
          </div>
        </form> 
      </div>
    );

    return (
      <div>
        {content}
      </div>
    )
  }
}
