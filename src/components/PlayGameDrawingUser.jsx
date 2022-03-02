import React, { useContext, useEffect, useRef } from 'react';

import { StoreContext } from '../store/Store';
import {
  controlStartGame,
  controlValueSignTrue,
  controlValueSignFalse,
} from '../helpers/helpers-store';

import SpinnerSearch from './SpinnerSearch';

const PlayGameDrawingUser = () => {
  const { dispatchGameControl, dispatchValueSign, stateGame, socket } =
    useContext(StoreContext);
  const { option } = stateGame;
  const idTimeout1 = useRef(null);
  const idTimeout2 = useRef(null);

  const drawWhoStartFirst = () => {
    const draw = Math.round(Math.random() * 1);
    draw
      ? controlValueSignTrue(dispatchValueSign)
      : controlValueSignFalse(dispatchValueSign);
  };

  const drawSignMultiplayer = async () => {
    const gameStatus = JSON.parse(sessionStorage.getItem('GameState'));
    const receiverId = gameStatus.idSocket;
    idTimeout2.current = setTimeout(
      () => socket?.emit('draw sign', receiverId),
      100
    );
  };

  useEffect(() => {
    if (option === 'multiplayer') drawSignMultiplayer();
    if (option !== 'multiplayer') drawWhoStartFirst();

    idTimeout1.current = setTimeout(() => {
      controlStartGame(dispatchGameControl);
      clearTimeout(idTimeout1.current);
      clearTimeout(idTimeout2.current);
    }, 1000);

    return () => clearTimeout(idTimeout1.current);
  }, []);

  return <SpinnerSearch />;
};

export default PlayGameDrawingUser;
