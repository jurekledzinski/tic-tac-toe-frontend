import React, { createContext, useEffect, useReducer, useState } from 'react';
import { io } from 'socket.io-client';

import { boxes, win } from '../utils/data';

export const StoreContext = createContext(null);

import {
  asideReducer,
  boardGameReducer,
  gameControlReducer,
  gameReducer,
  gameResultReducer,
  gameValueSignReducer,
  modalReducer,
  onlinePlayersReducer,
  winGameBoardResultReducer,
  winSchemaReducer,
} from './Reducers';

const localGame = JSON.parse(sessionStorage.getItem('GameState'));

const playerGame = {
  option: '',
  difficulty: '',
  namePlayer1: '',
  namePlayer2: '',
  move: '',
  sign1: '',
  sign2: '',
  wins1: 0,
  wins2: 0,
  draws: 0,
  winner: '',
  loser: '',
  draw: false,
  email1: '',
  email2: '',
  id: '',
  idSocket: '',
};

const modalData = {
  draw: false,
  isPlay: null,
  lost: false,
  win: false,
  response: false,
  search: false,
};

const initialStateAside = false;
const deepCopyBoxes = JSON.parse(JSON.stringify(boxes));
const deepCopyWinSchema = JSON.parse(JSON.stringify(win));
const initialStateBoard = deepCopyBoxes;
const initialStateBoardResult = 0;
const initialStateGame = localGame || playerGame;
const initialStateGameControl = false;
const initialStateModal = modalData;
const initialStateOnlinePlayers = [];
const initialStateValueSign = true;
export const initialStateGameResults = [];
export const initialStateWinSchema = deepCopyWinSchema;

const StoreProvider = ({ children }) => {
  const [socket, setSocket] = useState();
  const [stateBoard, dispatchBoard] = useReducer(
    boardGameReducer,
    initialStateBoard
  );
  const [stateGame, dispatchGame] = useReducer(gameReducer, initialStateGame);
  const [stateGameControl, dispatchGameControl] = useReducer(
    gameControlReducer,
    initialStateGameControl
  );
  const [stateValueSign, dispatchValueSign] = useReducer(
    gameValueSignReducer,
    initialStateValueSign
  );

  const [stateModal, dispatchModal] = useReducer(
    modalReducer,
    initialStateModal
  );

  const [stateBoardResult, dispatchBoardResult] = useReducer(
    winGameBoardResultReducer,
    initialStateBoardResult
  );

  const [stateWinSchema, dispatchWinSchema] = useReducer(
    winSchemaReducer,
    initialStateWinSchema
  );

  const [stateAside, disptachAside] = useReducer(
    asideReducer,
    initialStateAside
  );

  const [stateResults, dispatchResults] = useReducer(
    gameResultReducer,
    initialStateGameResults
  );

  const [stateOnlinePlayers, dispatchOnlinePlayers] = useReducer(
    onlinePlayersReducer,
    initialStateOnlinePlayers
  );

  useEffect(() => {
    const createSocket = io(process.env.API_KEY, {
      withCredentials: true,
    });

    setSocket(createSocket);

    return () => createSocket.disconnect();
  }, []);

  return (
    <StoreContext.Provider
      value={{
        socket,
        stateAside,
        disptachAside,
        stateBoard,
        dispatchBoard,
        stateGame,
        dispatchGame,
        stateGameControl,
        dispatchGameControl,
        stateModal,
        dispatchModal,
        stateValueSign,
        dispatchValueSign,
        stateBoardResult,
        dispatchBoardResult,
        stateResults,
        dispatchResults,
        stateOnlinePlayers,
        dispatchOnlinePlayers,
        stateWinSchema,
        dispatchWinSchema,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
