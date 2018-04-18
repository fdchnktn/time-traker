import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { isLoaded, getVal, isEmpty } from 'react-redux-firebase'
import './styles.css'
import { defaultName } from '../../../constants'
import { getUserCompany } from '../../../actions/companyAction'

class CompanyName extends Component {

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile !== this.props.profile) {
      const { dispatch, profile } = nextProps;
      profile.company && this.props.getUserCompany(profile.company);
    }
  }

  render() {
    const companyName = isLoaded(this.props.companyName) && !isEmpty(this.props.profile)
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
    companyName: state.company.name
  } 
};


const mapDispatchToProps = dispatch => {
  return {
    getUserCompany: (companyKey) => dispatch(getUserCompany(companyKey))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CompanyName)