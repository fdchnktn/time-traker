import React from 'react';
import PropTypes from 'prop-types';
import './styles.css'
import RaisedButton from 'material-ui/RaisedButton';

class Modal extends React.Component {
  render() {
    const style = {
      margin: 12,
    };

    if(!this.props.show) {
      return null;
    }

    const modalStyle = {
      backgroundColor: '#fff',
      borderRadius: 5,
      maxWidth: 500,
      minHeight: 300,
      margin: '0 auto',
      padding: 30
    };

    console.log(this.props.children);

    return (
      <div className="backdrop" >
        <div className="modal" style={modalStyle}>
          {this.props.children}
          
          <div className="footer">
            <RaisedButton label="Close" onClick={this.props.onClose}  style={style} />
            <RaisedButton label="Submit" onClick={this.props.onSumbit} style={style} />
          </div>
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node
};

export default Modal;
