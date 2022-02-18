import React from 'react';

import './ModalOthers.scss';

import {
  ModalAskForPlay,
  ModalResponse,
  ModalUserLeftPage,
} from './ModalContent';

const ModalOthers = ({ isGamePage, isLeft, isPlay, isResponse, nameLeft }) => {
  if (isLeft) {
    return (
      <div className="modal-others modal-others--multiplayer">
        <ModalUserLeftPage nameLeft={nameLeft} />
      </div>
    );
  } else if (isPlay) {
    return (
      <div className="modal-others modal-others--multiplayer">
        <ModalAskForPlay isGamePage={isGamePage} />
      </div>
    );
  } else if (isResponse) {
    return (
      <div className="modal-others modal-others--multiplayer">
        <ModalResponse />
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default ModalOthers;
