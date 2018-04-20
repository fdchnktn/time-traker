import React, { Component } from 'react'
import CompanyName from  'components/blocks/CompanyName/CompanyName'
import Authorization from 'components/controls/Authorization/Authorization'
import './Navbar.scss'

class Navbar extends Component {
  render() {
    return (
      <div className="navbar-container">
        <CompanyName /> 
        <Authorization />
      </div>
    )
  }
}

export default Navbar;
