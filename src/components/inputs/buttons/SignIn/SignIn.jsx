import React from 'react'
import { Link } from 'react-router-dom'
import './styles.css'
import '../../../../styles/elements.css'

const SignIn = () => {
  return (
    <div className="nav-button">
      <Link to='/signIn'>Log In</Link>
    </div>
  )
}

export default SignIn;
