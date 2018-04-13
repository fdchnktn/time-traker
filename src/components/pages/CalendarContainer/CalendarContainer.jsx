import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firebaseConnect, getVal, isLoaded } from 'react-redux-firebase'
import Calendar from '../Calendar/Calendar'
import * as workingHours from './mock.json'


class CalendarContainer extends Component {
  constructor(props) {
    super(props);

    const date = new Date(), y = date.getFullYear(), m = date.getMonth();
    const firstDay = new Date(y, m, 1);
    const lastDay = new Date(y, m + 1, 0);
    console.log('first day', firstDay, 'last day', lastDay);
    console.log(this.props.reports);

    this.state = {
      start: firstDay,
      end: lastDay
    };
  }

  changeMonth(date) {
    console.log( `change month`, date);
  }

  render() {
    isLoaded(this.props.reports) 
      ? console.log('reports loaded', this.props.reports)
      : console.log('reports not loaded');


    return (
      <div>
        <Calendar
          workingHours={workingHours}
          onMonthChange={this.changeMonth} />
      </div>
    )
  }
}

export default compose(
  firebaseConnect(
    (props, store) => {
      const { firebase: { auth } } = store.getState()
      return [{ 
        path: `reports/${auth.uid || ''}`/*,
        queryParams: [ 
          `orderByChild=added`,
          `startAt=${this.state.start}`,
          `endAt=${this.state.end}` ]*/
        }]
    }
  ),
  connect((state) => ({
    reports: state.firebase.data
  }))
)(CalendarContainer);

