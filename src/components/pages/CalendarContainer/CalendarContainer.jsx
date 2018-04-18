import React, { Component } from 'react'
import { connect } from 'react-redux'
import { isLoaded, getVal } from 'react-redux-firebase'
import Calendar from '../Calendar/Calendar'
import { getReportsForOneMonth } from '../../../actions/reportsAction'
import * as reports from './mock.json'


class CalendarContainer extends Component {
  constructor(props) {
    super(props);

    const date = new Date();

    this.state = {
      timePeriod: this.getTimePeriodForCurrentMonth(date)  
    };
  }

  getTimePeriodForCurrentMonth(date) {
    const year = date.getFullYear()
    const month = date.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
  
    return {
      start: firstDay.getTime(),
      end: lastDay.getTime() 
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth !== this.props.auth) {
      const { dispatch, auth } = nextProps;
      auth.uid && this.props.getReports(auth.uid, this.state.timePeriod.start, this.state.timePeriod.end)
    }
  }

  changeMonth(date) {
    console.log( `change month`, date);
  }

  createReports(reports) {
    let reportsList = [];
    for (const key in reports) {
      if (reports.hasOwnProperty(key)) {
        const report = reports[key];
        const date = new Date(report.date);
        reportsList.push({day: date.getDay(), hours: report.hours})
      }
    }

    console.log(reportsList);
    return reportsList;
  }

  render() {
    const reports = isLoaded(this.props.reports) 
      ? this.createReports(this.props.reports)
      : [];

    return (
      <div>
        <Calendar
          reports={reports}
          onMonthChange={this.changeMonth} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: getVal(state.firebase, 'auth'),
    reports: state.reports.data.reports
  } 
};

const mapDispatchToProps = dispatch => {
  return {
    getReports: (userId, startDate, endDate) => {
      dispatch(getReportsForOneMonth(userId, startDate, endDate))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CalendarContainer)

/*
export default compose(
  firebaseConnect(
    (props, store) => {
      const { firebase: { auth } } = store.getState()
      console.log('auth', auth)
      return [{ 
        path: `reports/${auth.uid || ''}`/*,
        queryParams: [ 
          `orderByChild=added`,
          `startAt=${this.state.start}`,
          `endAt=${this.state.end}` ]
        }]
    }
  ),
  connect((state) => ({
    reports: state.firebase.data
  }))
)(CalendarContainer);*/