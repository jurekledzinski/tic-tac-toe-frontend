import {
  ADD_BOARD,
  ADD_GAME_OPTION,
  ADD_GAME_DIFFICULTY,
  ADD_GAME_STATE,
  ADD_GAME_NAME_1,
  ADD_GAME_NAME_2,
  ADD_NEXT_MOVE,
  ADD_GAME_SIGN_1,
  ADD_GAME_SIGN_2,
  ADD_GAME_WINS_1,
  ADD_GAME_WINS_2,
  ADD_GAME_DRAW,
  ADD_GAME_DRAWS,
  ADD_GAME_LOSER,
  ADD_GAME_WINNER,
  ADD_ID_RESULT,
  ADD_MORE_RESULTS,
  ADD_ONLINE_PLAYERS,
  ADD_RESULTS,
  ADD_WIN_RESULT,
  ADD_WIN_SCHEMA,
  ADD_VALUE_SIGN,
  CLEAR_BOARD,
  CANCEL_GAME,
  CLEAR_GAME,
  CLOSE_ASIDE,
  CLOSE_ASK_PLAY_MODAL,
  CLOSE_DRAW_MODAL,
  CLOSE_LOST_MODAL,
  CLOSE_RESPONSE_MODAL,
  CLEAR_WIN_RESULT,
  CLEAR_WIN_SCHEMA,
  CLOSE_WIN_MODAL,
  FINISH_GAME,
  OPEN_CLOSE_ASIDE,
  OPEN_DRAW_MODAL,
  OPEN_LOST_MODAL,
  OPEN_WIN_MODAL,
  OPEN_ASK_PLAY_MODAL,
  OPEN_RESPONSE_MODAL,
  REFRESH_GAME,
  REMOVE_GAME_DRAW,
  REMOVE_ONLINE_PLAYERS,
  START_GAME,
  TURN_ON_DISABLE,
  TURN_OFF_DISABLE,
  VALUE_SIGN,
  VALUE_SIGN_TRUE,
  VALUE_SIGN_FALSE,
} from './Constants';

import { boxes, win } from '../utils/data';
const deepCopyBoxes = JSON.parse(JSON.stringify(boxes));
const deepCopyWinSchema = JSON.parse(JSON.stringify(win));
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
};

export const gameReducer = (state, action) => {
  switch (action.type) {
    case ADD_GAME_STATE:
      return action.data;
    case ADD_GAME_OPTION:
      return { ...state, option: action.option };
    case ADD_GAME_DIFFICULTY:
      return { ...state, difficulty: action.difficulty };
    case ADD_GAME_NAME_1:
      return { ...state, namePlayer1: action.name1 };
    case ADD_GAME_NAME_2:
      return { ...state, namePlayer2: action.name2 };
    case ADD_GAME_SIGN_1:
      return { ...state, sign1: action.sign1 };
    case ADD_GAME_SIGN_2:
      return { ...state, sign2: action.sign2 };
    case ADD_GAME_WINS_1:
      return { ...state, wins1: state.wins1 + 1 };
    case ADD_GAME_WINS_2:
      return { ...state, wins2: state.wins2 + 1 };
    case ADD_GAME_DRAW:
      return { ...state, draw: true };
    case ADD_GAME_DRAWS:
      return { ...state, draws: state.draws + 1 };
    case ADD_GAME_WINNER:
      return { ...state, winner: action.winner };
    case ADD_GAME_LOSER:
      return { ...state, loser: action.loser };
    case ADD_ID_RESULT:
      return { ...state, id: action.id };
    case ADD_NEXT_MOVE:
      return { ...state, move: action.move };
    case REFRESH_GAME:
      return { ...state, draw: false, move: '', loser: '', winner: '' };
    case REMOVE_GAME_DRAW:
      return { ...state, draw: false };
    case CLEAR_GAME:
      return playerGame;
    default:
      return state;
  }
};

export const gameControlReducer = (state, action) => {
  switch (action.type) {
    case CANCEL_GAME:
      return false;
    case FINISH_GAME:
      return false;
    case START_GAME:
      return true;
    default:
      return state;
  }
};

export const gameValueSignReducer = (state, action) => {
  switch (action.type) {
    case ADD_VALUE_SIGN:
      return action.data;
    case VALUE_SIGN:
      return !state;
    case VALUE_SIGN_TRUE:
      return true;
    case VALUE_SIGN_FALSE:
      return false;
    default:
      return state;
  }
};

export const modalReducer = (state, action) => {
  switch (action.type) {
    case OPEN_DRAW_MODAL:
      return { ...state, draw: true };
    case CLOSE_DRAW_MODAL:
      return { ...state, draw: false };
    case OPEN_LOST_MODAL:
      return { ...state, lost: true };
    case CLOSE_LOST_MODAL:
      return { ...state, lost: false };
    case OPEN_WIN_MODAL:
      return { ...state, win: true };
    case CLOSE_WIN_MODAL:
      return { ...state, win: false };
    case OPEN_ASK_PLAY_MODAL:
      return { ...state, isPlay: true };
    case CLOSE_ASK_PLAY_MODAL:
      return { ...state, isPlay: false };
    case OPEN_RESPONSE_MODAL:
      return { ...state, response: true };
    case CLOSE_RESPONSE_MODAL:
      return { ...state, response: false };
    default:
      return state;
  }
};

export const boardGameReducer = (state, action) => {
  switch (action.type) {
    case ADD_BOARD:
      return action.data;
    case CLEAR_BOARD:
      return deepCopyBoxes;
    default:
      return state;
  }
};

export const winGameBoardResultReducer = (state, action) => {
  switch (action.type) {
    case ADD_WIN_RESULT:
      return action.data;
    case CLEAR_WIN_RESULT:
      return 0;
    default:
      return state;
  }
};

export const winSchemaReducer = (state, action) => {
  switch (action.type) {
    case ADD_WIN_SCHEMA:
      return action.data;
    case CLEAR_WIN_SCHEMA:
      return deepCopyWinSchema;
    default:
      return state;
  }
};

export const gameResultReducer = (state, action) => {
  switch (action.type) {
    case ADD_RESULTS:
      return [...action.data];
    case ADD_MORE_RESULTS:
      return [...state, ...action.data];
    default:
      return state;
  }
};

export const asideReducer = (state, action) => {
  switch (action.type) {
    case OPEN_CLOSE_ASIDE:
      return !state;
    case CLOSE_ASIDE:
      return false;
    default:
      return state;
  }
};

export const onlinePlayersReducer = (state, action) => {
  switch (action.type) {
    case ADD_ONLINE_PLAYERS:
      return [...action.data];
    case REMOVE_ONLINE_PLAYERS:
      return state.filter((item) => item._id !== action.id);
    case TURN_ON_DISABLE:
      return state.map((item) => ({
        ...item,
        disable: item.idSocket === action.id ? true : item.disable,
      }));
    case TURN_OFF_DISABLE:
      return state.map((item) => ({
        ...item,
        disable: item.idSocket === action.id ? false : item.disable,
      }));
    default:
      return state;
  }
};
