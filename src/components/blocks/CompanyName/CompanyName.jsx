import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firebaseConnect, isLoaded, getVal } from 'react-redux-firebase'
import './styles.css'
import { defaultName, defaultCompanyKey } from '../../../constants'

class CompanyName extends Component {
  componentWillUpdate() {
    const companyKey = this.props.profile.companyKey;
    if (companyKey) {
      this.props.onGetUserCompany(companyKey);
    }
  }

  render() {
    /*isLoaded(this.props.company)
    ? console.log(this.props.company)
    : console.log(`companies not loaded`); */

    const companyName = this.props.companyName
     ? <span>{this.props.companyName}</span>
     : <span>{defaultName}</span>

    return (
      <div className="home-link">
        <Link to='/reports'>{companyName}</Link>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    profile: getVal(state.firebase, 'profile'),
  } 
};


const mapDispatchToProps = dispatch => {
  getUserCompany: (companyKey) => dispatch(getUserCompany(companyKey))
}

export default compose(
  firebaseConnect(() => ([
   // `companies`
  ])),
  connect(mapStateToProps)
)(CompanyName)