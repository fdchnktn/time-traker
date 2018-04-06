import React from 'react'
import { Switch, Route } from 'react-router-dom'
import SignUpForm from '../forms/SignUpForm/index'
import SignInForm from '../forms/SignInForm/SignInForm'
import Home from '../pages/Home/Home'
import TimeTrackingDashboard from '../pages/TimeTrankingDashboard/TimeTrankingDashboard'
 
const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/signup' component={SignUpForm}/>
      <Route path='/signIn' component={SignInForm}/>
      <Route path='/dashboard' component={TimeTrackingDashboard}/>
    </Switch>
  </main>
)

export default Main
