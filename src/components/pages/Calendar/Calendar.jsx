import React, { Component } from 'react'
import DayPicker from 'react-day-picker'
import Weekday from './Weekday/Weekday'
import 'react-day-picker/lib/style.css'
import './styles.css'


class Calendar extends Component {
  constructor(props) {
    super(props);

    this.handleMonthChange = this.handleMonthChange.bind(this);
    this.renderDay = this.renderDay.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
  }

  handleMonthChange(date){
    this.props.onMonthChange(date);  
  }

  renderDay(day) {
    const date = day.getDate();
  
    const getClassForHours = (hours) => {
      let hoursClass = "hours ";
  
      if (hours === 0) {
        hoursClass += "hours-none"
      } else if (hours < 4) {
        hoursClass += "hours-small"
      } else if(hours > 8) {
        hoursClass += "hours-lagre" 
      } else {
        hoursClass += "hourse-medium"
      }
  
      return hoursClass;
    }

    const getHoursByDay = (date) => {
      let hours = 0;
      this.props.reports &&
      this.props.reports.map((report) => {
          if (report.date === date) {
            hours = report.hours;
          }
        })

      return hours;
    }

    console.log(this.props.reports)
    const hours = getHoursByDay(date);
    console.log(hours);

  
    return (
      <div className="cell">
        <div className="date">
          {date}
        </div>
        <div className={ getClassForHours(hours) } >
          {hours}
        </div>
      </div>
    );
  }  
    
  render() {
    return (
      <DayPicker
        weekdayElement={ <Weekday /> }
        renderDay={this.renderDay}
        onMonthChange={this.handleMonthChange} />
    )
  }
}


export default Calendar;

