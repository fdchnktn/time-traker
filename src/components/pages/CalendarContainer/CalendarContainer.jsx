import React, { Component } from 'react'
import { connect } from 'react-redux'
import { isLoaded, getVal } from 'react-redux-firebase'
import Loader from 'react-loader-spinner'
import Calendar from 'components/pages/Calendar/Calendar'
import { getReportsForOneMonth } from 'actions/reportsAction'


class CalendarContainer extends Component {
  constructor(props) {
    super(props);

    const date = new Date();

    const { firstDayOfMonth, lastDayOfMonth } = this.getMonthRanges(date);

    this.state = {
      start: firstDayOfMonth,
      end: lastDayOfMonth,
      currentDate: date 
    };

    this.getMonthRanges = this.getMonthRanges.bind(this);
    this.changeMonthAndGetReports = this.changeMonthAndGetReports.bind(this);
  }

  getMonthRanges(date) {
    const year = date.getFullYear()
    const month = date.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
  
    console.log(`first day`, firstDay)
    console.log(`last day`, lastDay)

    return {
      firstDayOfMonth: firstDay.getTime(),
      lastDayOfMonth: lastDay.getTime() 
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth !== this.props.auth) {
      const { dispatch, auth } = nextProps;
      const { start, end } = this.state;

      auth.uid && this.props.getReports(auth.uid, start, end)
    }

    if (nextProps.reportDate !== this.props.reportDate) {
      const reportDate = nextProps.reportDate;

      this.changeMonthAndGetReports(reportDate);
    }
  }

  changeMonthAndGetReports(date) {
    const { firstDayOfMonth, lastDayOfMonth } = this.getMonthRanges(date);
    const { dispatch, auth } = this.props;

    this.setState({
      start: firstDayOfMonth,
      end: lastDayOfMonth,
      currentDate: date
    });
    
    this.props.getReports(auth.uid, firstDayOfMonth, lastDayOfMonth);
  }

  modifyReportsList(reports) {
    let reportsList = [];
    for (const key in reports) {
      if (reports.hasOwnProperty(key)) {
        const report = reports[key];
        const date = new Date(report.date);
        reportsList.push({day: date.getDate(), hours: report.hours})
      }
    }

    return reportsList;
  }

  render() {
    const reports = isLoaded(this.props.reports) 
    ? this.modifyReportsList(this.props.reports)
    : [];

    

    const content = isLoaded(this.props.reports)
      ? (
        <Calendar
          reports={reports}
          onMonthChange={this.changeMonthAndGetReports}
          currentDate={this.state.currentDate} />
      ) : (
        <Loader
          type="Puff"
          color="#00BFFF"
          height="100"
          width="100" />
      )

    return (
      <div>
        {content}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: getVal(state.firebase, 'auth'),
    reports: state.reports.data.reports,
    reportDate: state.reports.reportDate
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
