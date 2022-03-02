import {
  ADD_BOARD,
  ADD_GAME_OPTION,
  ADD_GAME_DIFFICULTY,
  ADD_GAME_DRAW,
  ADD_GAME_DRAWS,
  ADD_GAME_STATE,
  ADD_ID_RESULT,
  REMOVE_GAME_DRAW,
  ADD_GAME_NAME_1,
  ADD_GAME_NAME_2,
  ADD_NEXT_MOVE,
  ADD_GAME_SIGN_1,
  ADD_GAME_SIGN_2,
  ADD_GAME_LOSER,
  ADD_GAME_WINS_1,
  ADD_GAME_WINS_2,
  ADD_GAME_WINNER,
  ADD_MORE_RESULTS,
  ADD_RESULTS,
  ADD_ONLINE_PLAYERS,
  ADD_WIN_RESULT,
  ADD_WIN_SCHEMA,
  ADD_VALUE_SIGN,
  CLEAR_BOARD,
  CLEAR_WIN_RESULT,
  CLEAR_WIN_SCHEMA,
  CLOSE_ASIDE,
  CLOSE_ASK_PLAY_MODAL,
  CLOSE_DRAW_MODAL,
  CLOSE_LOST_MODAL,
  CLOSE_RESPONSE_MODAL,
  CLOSE_WIN_MODAL,
  CLEAR_GAME,
  FINISH_GAME,
  OPEN_DRAW_MODAL,
  OPEN_LOST_MODAL,
  OPEN_WIN_MODAL,
  OPEN_CLOSE_ASIDE,
  OPEN_ASK_PLAY_MODAL,
  OPEN_RESPONSE_MODAL,
  REFRESH_GAME,
  REMOVE_ONLINE_PLAYERS,
  START_GAME,
  TURN_ON_DISABLE,
  TURN_OFF_DISABLE,
  VALUE_SIGN,
  VALUE_SIGN_TRUE,
  VALUE_SIGN_FALSE,
} from '../store/Constants';

export const controlAddGame = (dispatchGame, data) => {
  dispatchGame({ type: ADD_GAME_STATE, data });
};

export const controlGameId = (id, dispatchGame) => {
  dispatchGame({ type: ADD_ID_RESULT, id });
};

export const controlGameBoardAdd = (dispatchBoard, data) => {
  dispatchBoard({ type: ADD_BOARD, data });
};

export const controlGameBoardClear = (dispatchBoard) => {
  dispatchBoard({ type: CLEAR_BOARD });
};

export const controlGameRefresh = (dispatchGame) => {
  dispatchGame({ type: REFRESH_GAME });
};

export const controlGameDrawOn = (dispatchGame) => {
  dispatchGame({ type: ADD_GAME_DRAW });
};

export const controlGameDrawOff = (dispatchGame) => {
  //to remove
  dispatchGame({ type: REMOVE_GAME_DRAW });
};

export const controlClearGame = (dispatchGame) => {
  dispatchGame({
    type: CLEAR_GAME,
  });
};

export const controlGameOption = (option, dispatchGame) => {
  dispatchGame({
    type: ADD_GAME_OPTION,
    option: option,
  });
};

export const controlGameDifficulty = (level, dispatchGame) => {
  dispatchGame({
    type: ADD_GAME_DIFFICULTY,
    difficulty: level,
  });
};

export const controlGameName1 = (name1, dispatchGame) => {
  dispatchGame({
    type: ADD_GAME_NAME_1,
    name1,
  });
};

export const controlGameName2 = (name2, dispatchGame) => {
  dispatchGame({
    type: ADD_GAME_NAME_2,
    name2,
  });
};

export const controlGameMove = (move, dispatchGame) => {
  dispatchGame({ type: ADD_NEXT_MOVE, move });
};

export const controlGameSign1 = (sign1, dispatchGame) => {
  dispatchGame({
    type: ADD_GAME_SIGN_1,
    sign1,
  });
};

export const controlGameSign2 = (sign2, dispatchGame) => {
  dispatchGame({
    type: ADD_GAME_SIGN_2,
    sign2,
  });
};

export const controlGameLoser = (loser, dispatchGame) => {
  dispatchGame({
    type: ADD_GAME_LOSER,
    loser,
  });
};

export const controlGameWinner = (winner, dispatchGame) => {
  dispatchGame({
    type: ADD_GAME_WINNER,
    winner,
  });
};

export const controlStartGame = (dispatchGameControl) => {
  dispatchGameControl({
    type: START_GAME,
  });
};

export const controlFinishGame = (dispatchGameControl) => {
  dispatchGameControl({ type: FINISH_GAME });
};

export const controlValueSign = (dispatchValueSign) => {
  dispatchValueSign({ type: VALUE_SIGN });
};

export const controlValueSignTrue = (dispatchValueSign) => {
  dispatchValueSign({ type: VALUE_SIGN_TRUE });
};

export const controlValueSignFalse = (dispatchValueSign) => {
  dispatchValueSign({ type: VALUE_SIGN_FALSE });
};

export const controlModalDrawOpen = (dispatchModal) => {
  dispatchModal({ type: OPEN_DRAW_MODAL });
};

export const controlModalDrawClose = (dispatchModal) => {
  dispatchModal({ type: CLOSE_DRAW_MODAL });
};

export const controlModalLostOpen = (dispatchModal) => {
  dispatchModal({ type: OPEN_LOST_MODAL });
};

export const controlModalLostClose = (dispatchModal) => {
  dispatchModal({ type: CLOSE_LOST_MODAL });
};

export const controlModalWinOpen = (dispatchModal) => {
  dispatchModal({ type: OPEN_WIN_MODAL });
};

export const controlModalWinClose = (dispatchModal) => {
  dispatchModal({ type: CLOSE_WIN_MODAL });
};

export const controlWinResultBoardAdd = (dispatchBoardResult, data) => {
  dispatchBoardResult({
    type: ADD_WIN_RESULT,
    data,
  });
};

export const controlWinResultBoardClear = (dispatchBoardResult) => {
  dispatchBoardResult({
    type: CLEAR_WIN_RESULT,
  });
};

export const controlWinSchemaAdd = (dispatchWinSchema, data) => {
  dispatchWinSchema({ type: ADD_WIN_SCHEMA, data });
};

export const controlWinSchemaClear = (dispatchWinSchema) => {
  dispatchWinSchema({ type: CLEAR_WIN_SCHEMA });
};

export const controlWinsPlayer1 = (dispatchGame) => {
  dispatchGame({ type: ADD_GAME_WINS_1 });
};

export const controlWinsPlayer2 = (dispatchGame) => {
  dispatchGame({ type: ADD_GAME_WINS_2 });
};

export const controlDrawsPlayers = (dispatchGame) => {
  dispatchGame({ type: ADD_GAME_DRAWS });
};

export const controlOpenCloseAside = (disptachAside) => {
  disptachAside({ type: OPEN_CLOSE_ASIDE });
};

export const controlCloseAside = (disptachAside) => {
  disptachAside({ type: CLOSE_ASIDE });
};

export const controlAddResultsGame = (dispatchResults, data) => {
  dispatchResults({ type: ADD_RESULTS, data });
};

export const controlAddMoreResultsGame = (dispatchResults, data) => {
  dispatchResults({ type: ADD_MORE_RESULTS, data });
};

export const controlAddOnlinePlayers = (dispatchOnlinePlayers, data) => {
  dispatchOnlinePlayers({ type: ADD_ONLINE_PLAYERS, data });
};

export const controlOpenIsPlayModal = (dispatchModal) => {
  dispatchModal({ type: OPEN_ASK_PLAY_MODAL });
};

export const controlCloseIsPlayModal = (dispatchModal) => {
  dispatchModal({ type: CLOSE_ASK_PLAY_MODAL });
};

export const controlOpenResponseModal = (dispatchModal) => {
  dispatchModal({ type: OPEN_RESPONSE_MODAL });
};

export const controlCloseResponseModal = (dispatchModal) => {
  dispatchModal({ type: CLOSE_RESPONSE_MODAL });
};

export const controlAddValueSign = (dispatchValueSign, data) => {
  dispatchValueSign({ type: ADD_VALUE_SIGN, data });
};

export const controlRemoveOnlinePlayer = (dispatchOnlinePlayers, id) => {
  dispatchOnlinePlayers({ type: REMOVE_ONLINE_PLAYERS, id });
};

// TURN_ON_DISABLE

export const controlTurnOnDisablePlayer = (dispatchOnlinePlayers, id) => {
  dispatchOnlinePlayers({ type: TURN_ON_DISABLE, id });
};

// TURN_OFF_DISABLE
export const controlTurnOffDisablePlayer = (dispatchOnlinePlayers, id) => {
  dispatchOnlinePlayers({ type: TURN_OFF_DISABLE, id });
};
