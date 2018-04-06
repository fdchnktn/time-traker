import React, { Component } from 'react'
import './styles.css'
import Slider from 'react-rangeslider'
import 'react-rangeslider/lib/index.css'

export default class HoursPerDayForm extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      value: 8
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (value) => {
    this.setState({
      value: value
    })
  }

  render() {
    const { value } = this.state;
    return (
      <div>
        <div className='slider'>
          <Slider
            min={0}
            max={24}
            step={0.5}
            value={value}
            onChange={this.handleChange}
          />
        </div>
        <div className="working-hours">Working hours: {value}</div>
      </div>
    )
  }
}
