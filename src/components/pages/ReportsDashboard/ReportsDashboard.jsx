import React, { Component } from 'react'
import MakeReport from 'components/inputs/buttons/MakeReport/MakeReport'
import CalendarContainer from 'components/pages/CalendarContainer/CalendarContainer'
import './styles.scss'

export default class ReportsDashboard extends Component {
  render() {
    return (
      <div className="page-container">
        <div className="dashboard" >
          <CalendarContainer />
          <MakeReport />
        </div>
      </div>
    )
  }
}
