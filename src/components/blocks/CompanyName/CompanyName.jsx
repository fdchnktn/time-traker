import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import propTypes from 'prop-types'
import './styles.css'
import { initializeCompanyName } from '../../../actions/initializationActions'

class CompanyName extends Component {
  constructor(props){
    super(props);
  }

  componentWillMount() {
    const { onInitCompanyName } = this.props;
    onInitCompanyName();
  }

  render() {
    const companyName = this.props.companyName
     ? <span>{this.props.companyName}</span>
     : <span>No Company</span>

    return (
      <div className="home-link">
        <Link to='/dashboard'>{companyName}</Link>
      </div>
    )
  }
}

postMessage.propTypes = {
  onInitCompanyName: propTypes.func.isRequired,
  companyName: propTypes.string.isRequired
}

const mapStateToProps = (state) => ({
  companyName: state.initializationData.companyName.companyName
});

const mapDispatchToProps = (dispatch) => {
  return {
    onInitCompanyName: () => {
      dispatch(initializeCompanyName())
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CompanyName);