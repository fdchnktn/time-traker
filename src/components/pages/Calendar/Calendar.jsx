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
  
    return (
      <div className="cell">
        <div className="date">
          {date}
        </div>
        { this.props.workingHours[date] &&
          this.props.workingHours[date].map((hours, i) => (
            <div className={ getClassForHours(hours) } key={ i } >
              {hours}
            </div>
          ))
        }
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

