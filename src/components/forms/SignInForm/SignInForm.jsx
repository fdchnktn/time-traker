import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import Loader from 'react-loader-spinner'
import { withFirebase } from 'react-redux-firebase'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import './styles.scss'

class SignInForm extends Component {
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

  handleInputChange(event) {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({
      [name]: value
    },
      () => { this.validateField(name, value) });
  }

  validateField(fieldName, value) {
    let validationErrors = this.state.error;

    switch (fieldName) {
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
      this.setState({ formInvalid: false });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    
    this.setState({ 
      isLoading: true 
    });

    this.signInUser(this.state.email, this.state.password);
  }


  signInUser(email, password) {
    this.props.firebase.login({ 
      email,
      password 
    }).then((data) => {
      console.log(`User with id : ${data.user.uid} just signed`);

      this.setState({
        isError : false,
        isLoading: false,
        redirect: true
      }); 
    }).catch(err => {
      console.log(err);

      this.setState({
        isError : true,
        isLoading: false
      });
    })
  }

  render() {
    const renderRedirect = this.state.redirect ? (
      <Redirect to='/reports' />
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
          <form onSubmit={this.handleSubmit}>
            {renderRedirect}
            <div className="form-container">
            <div className="form-header">
              <h3 >Log In</h3>
            </div>
            <div className="form-body">
              <TextField
                  hintText="Email"
                  name="email"
                  type="text"
                  floatingLabelText="Email"
                  value={this.state.email}
                  onChange={this.handleInputChange}
                  errorText={this.state.error} /><br />
                <TextField
                  hintText="Password"
                  name="password"
                  floatingLabelText="Password"
                  type="password"
                  value={this.state.password}
                  onChange={this.handleInputChange} /><br />
            </div>
            <div className="form-footer">
              <RaisedButton
                label="Sumbit"
                primary={true} 
                disabled={this.state.formInvalid}
                onClick={this.handleSubmit} />
            </div>
          </div>
        </form>
      );

    return (
      <div>
        {content}
      </div>
    )
  }
}

export default withFirebase(SignInForm)