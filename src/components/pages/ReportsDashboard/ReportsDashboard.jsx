import React, { Component } from 'react'
import './styles.css'
import MakeReport from '../../inputs/buttons/MakeReport/MakeReport'
import CalendarContainer from '../CalendarContainer/CalendarContainer'

export default class ReportsDashboard extends Component {
  render() {
    return (
      <div className="container">
        <div className="dashboard">
          <CalendarContainer />
          <MakeReport />
        </div>
      </div>
    )
  }
}
