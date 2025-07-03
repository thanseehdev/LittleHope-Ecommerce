

import React from 'react';
import PropTypes from 'prop-types'; 

const Notification = ({ message, onClose }) => {
  return (
    <div className="notification-box">
      <span className="green-tick">&#10004;</span>
      <span className="message">{message}</span>
      <button className="close-btn" onClick={onClose}>X</button>
    </div>
  );
};

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Notification;

