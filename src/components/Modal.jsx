import React from 'react';

import './Modal.scss';

import {
  ModalContentDraw,
  ModalContentLost,
  ModalContentWin,
} from './ModalContent';

const Modal = ({ isDraw, isLost, isWin }) => {
  if (isDraw) {
    return (
      <div className="modal">
        <ModalContentDraw />
      </div>
    );
  } else if (isLost) {
    return (
      <div className="modal">
        <ModalContentLost />
      </div>
    );
  } else if (isWin) {
    return (
      <div className="modal">
        <ModalContentWin />
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default Modal;
