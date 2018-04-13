import React from 'react'
import { Switch, Route } from 'react-router-dom'
import SignUpForm from '../forms/SignUpForm/SignUpForm'
import SignInForm from '../forms/SignInForm/SignInForm'
import Home from '../pages/Home/Home'
import ReportsDashboard from '../pages/ReportsDashboard/ReportsDashboard'
 
const Router = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/signup' component={SignUpForm}/>
      <Route path='/signIn' component={SignInForm}/>
      <Route path='/reports' component={ReportsDashboard}/>
    </Switch>
  </main>
)

export default Router;
