import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import firebase from 'firebase'
import 'firebase/database'
import './styles.css'
import '../../../styles/elements.css'
import { firebaseConfig } from '../../../firebaseConfig'

firebase.initializeApp(firebaseConfig);

export default class SignUPForm extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      userName: '',
      email: '',
      password: '',
      confirmPassword: '',
      formInvalid: true,
      errors: {
        userName: '',
        email: '',
        password: '',
        confirmPassword: ''
      }
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.hasErrors = this.hasErrors.bind(this);
    this.validateField = this.validateField.bind(this);
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
    let validationErrors = this.state.errors;

    switch(fieldName) {
      case 'userName':
        validationErrors.userName = (value === '')
          ? '' 
          : wrongCharacter(value) || shortField(value) || checkLettersInName();
        break;
      case 'email':
        validationErrors.email = (value === '')
          ? '' 
          : wrongCharacter(value) || shortField(value) || wrongEmail(value);
       break;
      case 'password':
        validationErrors.password = (value === '')
          ? ''
          : shortField(value);
        break;
      case 'confirmPassword':
        validationErrors.confirmPassword = (this.state.password === value) 
          ? ''
          : 'Passwords doesn\'t match';
      default:
        break;
    }

    this.setState({
      errors: validationErrors
    },
    () => { this.hasErrors() });

    function checkLettersInName() {
      return (value.match(/^[0-9_]+$/))
        ? 'Name must contain letters'
        : ''
    }

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
    (this.state.userName && this.state.email &&
     this.state.password && this.state.confirmPassword &&
     !this.state.errors.userName && !this.state.errors.email &&
     !this.state.errors.password && !this.state.errors.confirmPassword)
      ? this.setState({formInvalid: false})
      : this.setState({formInvalid: true});
  }

  handleSubmit(event) {
    this.createNewUser();

    this.setState({
      userName: '',
      email: '',
      password: '',
      confirmPassword: ''
    });

    event.preventDefault();
  }

  createNewUser() {
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((data) => {
        alert(`Successfully sign up!`);
        console.log(`Success `, data);
        const userName = this.state.userName;
        const email = this.state.email;
        this.writeUserData(userName, email);
      }).catch(function(error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode == 'auth/weak-password') {
          alert('The password is too weak.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
        // [END_EXCLUDE]
    });
  }

  writeUserData(name, email) {
    firebase.database().ref('users/').push({
      username: name,
      email: email
    });
  }

  render() {
    return (
      <div className="form-container">
        <form onSubmit={this.handleSubmit}>
          <h4>Sign In</h4>
          <TextField
            hintText="User name"
            name="userName"
            floatingLabelText="User name"
            value={this.state.userName}
            onChange={this.handleInputChange}
            errorText={this.state.errors.userName} 
          /><br />
          <TextField
            hintText="Email"
            name="email"
            floatingLabelText="Email"
            value={this.state.email}
            onChange={this.handleInputChange} 
            errorText={this.state.errors.email}
          /><br />
          <TextField
            hintText="Password"
            name="password"
            floatingLabelText="Password"
            type="password"
            value={this.state.password}
            onChange={this.handleInputChange}
            errorText={this.state.errors.password} 
          /><br />
          <TextField
            hintText="Confirm password"
            name="confirmPassword"
            floatingLabelText="Confirm password"
            type="password"
            value={this.state.confirmPassword}
            onChange={this.handleInputChange}
            errorText={this.state.errors.confirmPassword} 
          /><br />
          <div className="submit-button">
            <RaisedButton label="Sumbit" primary={true} onClick={this.handleSubmit} disabled={this.state.formInvalid}/>
          </div>
        </form>
      </div>
    )
  }
}
