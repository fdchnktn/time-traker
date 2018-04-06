import React, { Component } from 'react'
import './styles.css';
import CompanyName from '../../blocks/CompanyName/CompanyName'
import Authorization from '../../../components/controls/Authorization/Authorization'

class Navbar extends Component {
  render() {
    return (
      <div className="Navbar">
        <CompanyName />
        <Authorization />
      </div>
    )
  }
}

export default Navbar;
