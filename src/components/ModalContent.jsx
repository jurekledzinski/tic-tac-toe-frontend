import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './ModalContent.scss';

import { StoreContext } from '../store/Store';

import { addPlayerGame } from '../axios/sessions';

import {
  controlAddGame,
  controlCloseIsPlayModal,
  controlClearGame,
  controlFinishGame,
  controlGameBoardClear,
  controlModalDrawClose,
  controlModalWinClose,
  controlModalLostClose,
  controlGameRefresh,
  controlWinSchemaClear,
  controlWinResultBoardClear,
} from '../helpers/helpers-store';

const clearLocalStorage = () => {
  sessionStorage.removeItem('GameState');
};

export const ModalContentDraw = () => {
  const {
    dispatchBoard,
    dispatchGame,
    dispatchGameControl,
    dispatchModal,
    dispatchBoardResult,
    dispatchWinSchema,
    stateGame,
    socket,
  } = useContext(StoreContext);
  const { option } = stateGame;
  const navigate = useNavigate();

  const handlePlayAgain = () => {
    if (option !== 'multiplayer') {
      controlModalDrawClose(dispatchModal);
      controlGameRefresh(dispatchGame);
      controlFinishGame(dispatchGameControl);
      controlGameBoardClear(dispatchBoard);
      controlWinResultBoardClear(dispatchBoardResult);
      controlWinSchemaClear(dispatchWinSchema);
    } else {
      const gameStatus = JSON.parse(sessionStorage.getItem('GameState'));
      const receiverSocketId = gameStatus.idSocket;
      const modalIsPlay = { isPlay: true };
      socket.emit('play again', receiverSocketId, modalIsPlay);
    }
    sessionStorage.removeItem('refresh');
    sessionStorage.removeItem('refresh_play');
  };

  const handleFinishGame = () => {
    if (option === 'multiplayer') {
      const game = JSON.parse(sessionStorage.getItem('GameState'));
      const name = JSON.parse(sessionStorage.getItem('name'));
      socket?.emit('player left', game.idSocket, name);
    }
    controlModalDrawClose(dispatchModal);
    controlGameBoardClear(dispatchBoard);
    controlClearGame(dispatchGame);
    controlFinishGame(dispatchGameControl);
    controlWinResultBoardClear(dispatchBoardResult);
    controlWinSchemaClear(dispatchWinSchema);
    clearLocalStorage();

    sessionStorage.removeItem('refresh_play');
    sessionStorage.removeItem('refresh');
    sessionStorage.removeItem('name');
    sessionStorage.removeItem('id');

    socket.disconnect();
    navigate('/');
  };

  return (
    <div className="modal__wrapper">
      <h2 className="modal__title">Draw</h2>
      <div className="modal__icon">
        <img
          className="modal__img"
          src="https://ik.imagekit.io/mdklwracd5rti/Tic_tac_toe/Handshake_icon_w1NFFLXss.png"
          alt="hand shake"
          className="modal__img"
          crossOrigin="anonymous"
        />
        <button className="modal__play-again" onClick={handlePlayAgain}>
          <img
            src="https://ik.imagekit.io/mdklwracd5rti/Tic_tac_toe/Refresh_icon_vZTelBnHY.png"
            alt="Refresh icon"
            className="modal__refresh-img"
            crossOrigin="anonymous"
          />
        </button>
        <button className="modal__finish-game" onClick={handleFinishGame}>
          Finish game
        </button>
      </div>
    </div>
  );
};

export const ModalContentLost = () => {
  const {
    dispatchBoard,
    dispatchBoardResult,
    dispatchGame,
    dispatchGameControl,
    dispatchModal,
    dispatchWinSchema,
    stateGame,
    socket,
  } = useContext(StoreContext);
  const { option } = stateGame;
  const navigate = useNavigate();

  const handlePlayAgain = () => {
    if (option !== 'multiplayer') {
      controlModalLostClose(dispatchModal);
      controlGameRefresh(dispatchGame);
      controlFinishGame(dispatchGameControl);
      controlGameBoardClear(dispatchBoard);
      controlWinResultBoardClear(dispatchBoardResult);
      controlWinSchemaClear(dispatchWinSchema);
    } else {
      const gameStatus = JSON.parse(sessionStorage.getItem('GameState'));
      const receiverSocketId = gameStatus.idSocket;
      const modalIsPlay = { isPlay: true };
      socket.emit('play again', receiverSocketId, modalIsPlay);
    }
    sessionStorage.removeItem('refresh');
    sessionStorage.removeItem('refresh_play');
  };

  const handleFinishGame = () => {
    if (option === 'multiplayer') {
      const game = JSON.parse(sessionStorage.getItem('GameState'));
      const name = JSON.parse(sessionStorage.getItem('name'));
      socket?.emit('player left', game.idSocket, name);
    }
    controlModalLostClose(dispatchModal);
    controlGameBoardClear(dispatchBoard);
    controlClearGame(dispatchGame);
    controlFinishGame(dispatchGameControl);
    controlWinResultBoardClear(dispatchBoardResult);
    controlWinSchemaClear(dispatchWinSchema);
    clearLocalStorage();
    sessionStorage.removeItem('refresh_play');
    sessionStorage.removeItem('refresh');
    sessionStorage.removeItem('name');
    sessionStorage.removeItem('id');
    socket.disconnect();
    navigate('/');
  };

  return (
    <div className="modal__wrapper">
      <h2 className="modal__title">You lost {stateGame.loser}</h2>
      <div className="modal__icon">
        <img
          className="modal__img"
          src="https://ik.imagekit.io/mdklwracd5rti/Tic_tac_toe/Lost_icon_Qe1uwkUXS.png"
          alt="hand shake"
          className="modal__img"
          crossOrigin="anonymous"
        />
        <button className="modal__play-again" onClick={handlePlayAgain}>
          <img
            src="https://ik.imagekit.io/mdklwracd5rti/Tic_tac_toe/Refresh_icon_vZTelBnHY.png"
            alt="Refresh icon"
            className="modal__refresh-img"
            crossOrigin="anonymous"
          />
        </button>
        <button className="modal__finish-game" onClick={handleFinishGame}>
          Finish game
        </button>
      </div>
    </div>
  );
};

export const ModalContentWin = () => {
  const {
    dispatchBoardResult,
    dispatchBoard,
    dispatchGame,
    dispatchGameControl,
    dispatchModal,
    dispatchWinSchema,
    stateGame,
    socket,
  } = useContext(StoreContext);
  const { option } = stateGame;
  const navigate = useNavigate();

  const handlePlayAgain = () => {
    if (option !== 'multiplayer') {
      controlModalWinClose(dispatchModal);
      controlGameBoardClear(dispatchBoard);
      controlGameRefresh(dispatchGame);
      controlFinishGame(dispatchGameControl);
      controlWinResultBoardClear(dispatchBoardResult);
      controlWinSchemaClear(dispatchWinSchema);
    } else {
      const gameStatus = JSON.parse(sessionStorage.getItem('GameState'));
      const receiverSocketId = gameStatus.idSocket;
      const modalIsPlay = { isPlay: true };
      socket.emit('play again', receiverSocketId, modalIsPlay);
    }
    sessionStorage.removeItem('refresh');
    sessionStorage.removeItem('refresh_play');
  };

  const handleFinishGame = () => {
    if (option === 'multiplayer') {
      const game = JSON.parse(sessionStorage.getItem('GameState'));
      const name = JSON.parse(sessionStorage.getItem('name'));
      socket?.emit('player left', game.idSocket, name);
    }
    controlModalWinClose(dispatchModal);
    controlGameBoardClear(dispatchBoard);
    controlClearGame(dispatchGame);
    controlFinishGame(dispatchGameControl);
    controlWinResultBoardClear(dispatchBoardResult);
    controlWinSchemaClear(dispatchWinSchema);
    clearLocalStorage();
    sessionStorage.removeItem('refresh_play');
    sessionStorage.removeItem('refresh');
    sessionStorage.removeItem('name');
    sessionStorage.removeItem('id');
    socket.disconnect();
    navigate('/');
  };

  return (
    <div className="modal__wrapper">
      <h2 className="modal__title">You won {stateGame.winner}</h2>
      <div className="modal__icon">
        <img
          className="modal__img"
          src="https://ik.imagekit.io/mdklwracd5rti/Tic_tac_toe/Win_icon_D9OHZvdtBT.png"
          alt="hand shake"
          className="modal__img"
          crossOrigin="anonymous"
        />
        <button className="modal__play-again" onClick={handlePlayAgain}>
          <img
            src="https://ik.imagekit.io/mdklwracd5rti/Tic_tac_toe/Refresh_icon_vZTelBnHY.png"
            alt="Refresh icon"
            className="modal__refresh-img"
            crossOrigin="anonymous"
          />
        </button>
        <button className="modal__finish-game" onClick={handleFinishGame}>
          Finish game
        </button>
      </div>
    </div>
  );
};

export const ModalAskForPlay = ({ isGamePage }) => {
  const navigate = useNavigate();
  const {
    dispatchBoard,
    dispatchBoardResult,
    dispatchGame,
    dispatchGameControl,
    dispatchModal,
    dispatchWinSchema,
    stateGame,
    socket,
  } = useContext(StoreContext);
  const { namePlayer1, option, wins1, wins2 } = stateGame;
  const [players, setPlayers] = useState({});
  const isMount = useRef(true);
  const idTimeout = useRef(null);

  const handleDisagreeToPlay = () => {
    const modalIsPlay = { isPlay: false };
    if (isMount.current && option !== 'multiplayer') {
      controlCloseIsPlayModal(dispatchModal);
    } else {
      controlCloseIsPlayModal(dispatchModal);
      const flag = false;
      socket?.emit('private message', players.idSocket1, modalIsPlay);
      socket.emit('player disable', players.idSocket1, players.idSocket2, flag);
      socket?.emit('play again', players.idSocket1, modalIsPlay);
    }
  };

  const handleAgreeToPlay = async () => {
    const { data, status } = await addPlayerGame(players);
    const cond1 =
      namePlayer1 && namePlayer1 === players.namePlayer1 ? wins1 : wins2;
    const cond2 =
      namePlayer1 && namePlayer1 === players.namePlayer1 ? wins2 : wins1;
    if (status === 200 && isMount.current) {
      const sender = { ...players };
      const toSenderId = sender.idSocket1;
      sender.idSocket = sender.idSocket2;
      sender.id = data.result.id;
      sender.wins1 = cond1;
      sender.wins2 = cond2;
      sender.draws = stateGame.draws;
      delete sender.idSocket1;
      delete sender.idSocket2;
      const receiver = { ...players };
      receiver.idSocket = receiver.idSocket1;
      receiver.id = data.result.id;
      receiver.wins1 = cond1;
      receiver.wins2 = cond2;
      receiver.draws = stateGame.draws;
      delete receiver.idSocket1;
      delete receiver.idSocket2;
      controlCloseIsPlayModal(dispatchModal);
      sessionStorage.setItem('GameState', JSON.stringify(receiver));
      controlAddGame(dispatchGame, receiver);
      idTimeout.current = setTimeout(() => navigate('/play-game'), 500);
      const isStart = true;

      if (isGamePage) {
        socket?.emit('start again', toSenderId, sender, isStart);
        controlModalDrawClose(dispatchModal);
        controlModalLostClose(dispatchModal);
        controlModalWinClose(dispatchModal);
        controlGameBoardClear(dispatchBoard);
        controlGameRefresh(dispatchGame);
        controlFinishGame(dispatchGameControl);
        controlWinResultBoardClear(dispatchBoardResult);
        controlWinSchemaClear(dispatchWinSchema);
      } else {
        socket?.emit('start game', toSenderId, sender, isStart);
      }
    }
  };

  useEffect(() => {
    socket?.on('private modal', (data) => {
      if (isMount.current) {
        setPlayers(data);
      }
    });
  }, [socket]);

  useEffect(() => {
    return () => {
      isMount.current = false;
      clearTimeout(idTimeout.current);
    };
  }, []);

  return (
    <>
      {players?.namePlayer1 && (
        <div className="modal__wrapper modal__wrapper--multiplayer">
          <div className="modal__inner-wrapper">
            <h2 className="modal__title modal__title--multiplayer">
              {players.namePlayer1} ask you to play?
            </h2>
            <div className="modal__btns-wrapper">
              <button
                className="modal__finish-game modal__finish-game--multiplayer"
                onClick={handleAgreeToPlay}
              >
                Yes
              </button>
              <button
                className="modal__finish-game modal__finish-game--multiplayer"
                onClick={handleDisagreeToPlay}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export const ModalResponse = () => {
  const { socket } = useContext(StoreContext);
  const [sender, setSender] = useState({ idSocket: '', name: '' });
  const isMount = useRef(true);

  useEffect(() => {
    socket?.on('private modal', (data) => {
      if (isMount.current) {
        setSender({ idSocket: data.idSocket2, name: data.namePlayer1 });
      }
    });
  }, [socket]);

  useEffect(() => {
    return () => {
      isMount.current = false;
    };
  }, []);

  return (
    <>
      {sender?.name && (
        <div className="modal__wrapper modal__wrapper--multiplayer">
          <h2 className="modal__title modal__title--multiplayer">
            {sender.name} not accept play with you.
          </h2>
        </div>
      )}
    </>
  );
};

export const ModalUserLeftPage = ({ nameLeft }) => {
  return (
    <div className="modal__wrapper modal__wrapper--multiplayer">
      <h2 className="modal__title modal__title--multiplayer">
        {nameLeft} left game. You will be redirect to home page.
      </h2>
    </div>
  );
};
