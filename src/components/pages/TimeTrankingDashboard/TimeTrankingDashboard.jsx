import React, { Component } from 'react'
import './styles.css'
import TimeTrackButton from '../../inputs/buttons/TimeTrackButtom/TimeTrackButton'
import CalendarContainer from '../CalendarContainer/CalendarContainer'

export default class TimeTrackingDashboard extends Component {
  render() {
    return (
      <div className="container">
        <div className="dashboard">
          <CalendarContainer />
          <TimeTrackButton />
        </div>
      </div>
    )
  }
}
