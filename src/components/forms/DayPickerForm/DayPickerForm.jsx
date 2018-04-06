import React, { Component } from 'react'
import './styles.css'
import DayPicker from 'react-day-picker'
import 'react-day-picker/lib/style.css'

export default class DayPickerForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectDay: undefined
    };

    this.handleDayClick = this.handleDayClick.bind(this);
  }

  handleDayClick(day) {
    this.setState({ selectDay: day});
  }

  render() {
    return (
      <div className="date-input">
        <DayPicker
          onDayClick={this.handleDayClick}
          selectedDays={this.state.selectDay} />
      </div>
    )
  }
}
