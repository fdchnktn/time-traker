import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firebaseConnect, isLoaded } from 'react-redux-firebase'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import AutoComplete from 'material-ui/AutoComplete'
import './styles.css'
import '../../../styles/elements.css'

class SignUpForm extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      userName: '',
      companyName: '',
      companyState: {
        isNew: true,
        key: ''
      },
      email: '',
      password: '',
      confirmPassword: '',
      formInvalid: true,
      errors: {
        userName: '',
        company: '',
        email: '',
        password: '',
        confirmPassword: ''
      }
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUpdateAutoComplete = this.handleUpdateAutoComplete.bind(this);
    this.hasErrors = this.hasErrors.bind(this);
    this.validateField = this.validateField.bind(this);
    this.handleNewRequest = this.handleNewRequest.bind(this);
    this.createNewUserAndSetCompany = this.createNewUserAndSetCompany.bind(this);
    this.addCompany = this.addCompany.bind(this);
  }

  handleUpdateAutoComplete(value) {
    this.setState({
      companyState: {
        isNew: true,
      }
    });
    this.setAndValidateFields('companyName', value);
  }

  handleNewRequest(company) {
    this.setState({
      companyState: {
        key: company.value,
        isNew: false
      }
    });
  }

  handleInputChange(event) {
    const value = event.target.value;
    const name = event.target.name;    
    this.setAndValidateFields(name, value);
  };

  setAndValidateFields(name, value) {
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
      case 'companyName':
        validationErrors.company = (value === '')
          ? ''
          : wrongCharacter(value) || shortField(value)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            || checkLettersInName();
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
        break;
      default:
        break;
    }

    this.setState(
      { errors: validationErrors },
      () => { this.hasErrors() }
    );

    function checkLettersInName() {
      return (value.match(/^[0-9_]+$/))
        ? 'Name must contain letters'
        : ''
    }

    function shortField(value) {
      return (value.length >= 4 && value.length <= 30)
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
    ( this.state.userName && !this.state.errors.userName && 
      this.state.email && !this.state.errors.email &&
      this.state.password && this.state.confirmPassword &&
      !this.state.errors.password && !this.state.errors.confirmPassword &&
      !this.state.errors.company && (this.state.companyName || this.state.companyState.key))
        ? this.setState({formInvalid: false})
        : this.setState({formInvalid: true});
  }

  handleSubmit(event) {
    this.createNewUserAndSetCompany(
      this.state.email,
      this.state.password,
      this.state.userName,
      this.state.companyName,
      this.state.companyState);

    this.setState({
      userName: '',
      companyName: '',
      companyState: {
        isNew: true,
        key: ''
      },
      email: '',
      password: '',
      confirmPassword: ''
    });

    event.preventDefault();
  }

  createNewUserAndSetCompany(email, password, userName, companyName, companyState) {
    console.log(`company state`, companyState);
    if (companyState.isNew){
      this.addCompany(companyName).then(companyKey => {
        this.createNewUser(email, password, userName, companyKey)
      })
    } else {
      this.createNewUser(email, password, userName, companyState.key);
    }
  }

  addCompany(name) {
    return this.props.firebase.push(`companies`, { name })
    .then(result => {
      return result.key;
    }).catch(err => {
      console.log(err);
    })
  }

  createNewUser(email, password, userName, companyKey) {
    this.props.firebase.createUser(
      { email, password },
      { userName, email, companyKey}
    ).then((createdUser) => {
      console.log(createdUser);
    }).catch(err => {
      console.log(err);
    })
  }

  createCompanyList(companies) {
    let companyList = [];
    for (const key in companies) {
      if (companies.hasOwnProperty(key)) {
        companyList.push({name: companies[key].name, value: key});
      }
    }
    return companyList;
  }

  render() {
    const companiesList = isLoaded(this.props.companies)
      ? this.createCompanyList(this.props.companies)
      : []
    
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
          <AutoComplete
            hintText="Company"
            name="companyName"
            searchText={this.state.companyName}
            value={this.state.companyName}
            floatingLabelText="Company"
            filter={AutoComplete.fuzzyFilter}
            dataSourceConfig={{ text: 'name', value: 'key' }}
            dataSource={companiesList}
            maxSearchResults={5}
            onUpdateInput={(value) => { this.handleUpdateAutoComplete(value) }}
            onNewRequest={this.handleNewRequest}
            errorText={this.state.errors.company} 
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

export default compose(
  firebaseConnect([
    'companies' 
  ]),
  connect((state) => ({
    companies: state.firebase.data.companies
  }))
)(SignUpForm);

