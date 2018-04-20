import React, { Component } from 'react'
import DayPicker from 'react-day-picker'
import Weekday from 'components/pages/Calendar/Weekday/Weekday'
import 'react-day-picker/lib/style.css'
import './styles.scss'


class Calendar extends Component {
  constructor(props) {
    super(props);

    this.handleMonthChange = this.handleMonthChange.bind(this);
    this.renderDay = this.renderDay.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    console.log(`nextProps`, nextProps);
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

    const getHoursByDate = (date) => {
      let hours = 0;
      if (this.props.reports) { 
        hours = this.props.reports.find((report, index) => {
          return (report.date === date)
            ? true
            : false;
        });
      }
      
      return hours;
    }

    const getHoursByDay = (day) => {
      const report = this.props.reports.find((report, index) => {
        return report.day === day
          ? true
          : false;
      })

      return report
        ? report.hours
        : 0;
    }

    const hours = getHoursByDay(date);

    return (
      <div className="cell">
        <div className="date">
          {date}
        </div>
        <div className={ getClassForHours(hours) }>
          {hours}
        </div>        
      </div>
    );
  }  
    
  render() {
    return (
      <div>
         <DayPicker
          weekdayElement={ <Weekday /> }
          renderDay={this.renderDay}
          onMonthChange={this.handleMonthChange}
          month={this.props.currentDate} />
      </div>
    )
  }
}


export default Calendar;

