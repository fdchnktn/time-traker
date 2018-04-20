import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firebaseConnect, getVal } from 'react-redux-firebase'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import DatePicker from 'material-ui/DatePicker'
import Slider from 'material-ui/Slider'
import { sendReportDateToCalendar } from '../../../../actions/reportsAction'
import styles from 'theme.js'
import './styles.scss'



class MakeReport extends Component {
  constructor(props){
    super(props);

    const defaultDate = new Date();

    this.state = {
      open: false,
      date: defaultDate,
      hours: 8
    };

    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeHours = this.onChangeHours.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleSubmit = () => {
    this.setState({open: false});
    this.props.firebase.push(`reports/${this.props.auth.uid}`, this.newReport(this.state.date, this.state.hours));
    this.props.sendReportDateToCalendar(this.state.date);
  }

  newReport(date, hours) {
    return {
      date: date.getTime(),
      hours
    }
  }

  onChangeDate(param, date) {
    this.setState({
      date: date
    })
  }

  onChangeHours(event, newValue) {
    this.setState({
      hours: newValue
    })
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleSubmit}
      />,
    ];

    return (
      <div>
        <button className="circle" onClick={this.handleOpen}>
          <span>+</span>
        </button>
        <Dialog
          title="Make Report"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose} 
          contentStyle={styles.dialogStyle}
          >
          <form >
            <p>Date: </p>
            <DatePicker 
              hintText="Date Picker"
              onChange={this.onChangeDate}
              defaultDate={this.state.date} />
            <p>Hours: {this.state.hours}</p>
            <div className="slider">
              <Slider 
                name="Hours"
                max={24}
                step={0.5}
                value={this.state.hours}
                onChange={this.onChangeHours} />
            </div>
          </form>
        </Dialog>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    auth: getVal(state.firebase, 'auth')
  } 
};

const mapDispatchToProps = dispatch => {
  return {
    sendReportDateToCalendar: (date) => {
      dispatch(sendReportDateToCalendar(date))
    }
  }
}

export default compose(
  firebaseConnect([ 'reports' ]),
  connect(mapStateToProps, mapDispatchToProps))(MakeReport);