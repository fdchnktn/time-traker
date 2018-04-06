import React, { Component } from 'react'
import './styles.css'
import Modal from '../../../controls/Modal/Modal'
import HoursPerDayForm from '../../../forms/HoursPerDayForm/HoursPerDayForm'
import DayPickerForm from '../../../forms/DayPickerForm/DayPickerForm'

export default class TimeTrackButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
       isOpen: false,
       date: String,
       hours: Number
      };

    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  handleSubmit() {
    this.setState({
      isOpen: !this.state.isOpen
    });
    console.log(`submit form`);
  }

  render() {
    return (
      <div>
        <button className="circle" onClick={this.toggleModal}>
          <span>+</span>
        </button>
        <Modal show={this.state.isOpen}
          onClose={this.toggleModal}
          onSumbit={this.handleSubmit}>
          <div>
            <h3>Track Time</h3>
            <DayPickerForm />
            <div className="hours-slider">
              <HoursPerDayForm />
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}
