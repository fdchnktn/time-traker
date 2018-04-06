import React, { Component } from 'react'
import DayPicker from 'react-day-picker'
import 'react-day-picker/lib/style.css'
import './styles.css'
import * as workingHours from './mock.json'

function Weekday({ weekday, className, localeUtils, locale }) {
  const weekdayName = localeUtils.formatWeekdayLong(weekday, locale);
  return (
    <div className={className} title={weekdayName}>
      {weekdayName.slice(0, 1)}
    </div>
  )
}

function renderDay(day) {
    const date = day.getDate();
    const dateStyle = {
      position: 'absolute',
      fontSize: 20
    };
    
    const brigthdayStyle = { fontSize: '0.8em', textAlign: 'left'};
    const cellStyle = {
      height: 70,
      width: 70,
      position: 'relative'
    };

    function getClassForHours(hours) {
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
      <div style={cellStyle}>
        <div style={dateStyle}>{date}</div>
        {workingHours[date] &&
        workingHours[date].map((hours, i) => (
          <div className={getClassForHours(hours)} key={i} style={brigthdayStyle}>
            {hours}
          </div>
        ))}
      </div>
    );
  }  

export default function CalendarContainer() {
    return (
      <DayPicker
        renderDay={renderDay}
        weekdayElement={ <Weekday /> } />
    )
  }


