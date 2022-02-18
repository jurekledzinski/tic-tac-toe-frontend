import React from 'react';

import './MessageAlert.scss';

const MessageAlert = ({ message }) => {
  return <p className="message-alert">{message}</p>;
};

export default MessageAlert;
