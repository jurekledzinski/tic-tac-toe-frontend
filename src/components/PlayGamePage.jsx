import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './PlayGamePage.scss';

import { StoreContext } from '../store/Store';

import LayoutOtherPages from './LayoutOtherPages';
import Modal from './Modal';
import ModalOthers from './ModalOthers';
import PlayGameDrawingUser from './PlayGameDrawingUser';

import { useGame } from '../customHooks/useGame';
import {
  controlAddGame,
  controlClearGame,
  controlGameBoardClear,
  controlGameRefresh,
  controlFinishGame,
  controlOpenIsPlayModal,
  controlOpenResponseModal,
  controlCloseResponseModal,
  controlModalDrawClose,
  controlModalLostClose,
  controlModalWinClose,
  controlWinResultBoardClear,
  controlWinSchemaClear,
} from '../helpers/helpers-store';

const PlayGamePage = () => {
  const { handleCLickBox } = useGame();
  const {
    dispatchBoard,
    dispatchBoardResult,
    dispatchGame,
    dispatchGameControl,
    dispatchModal,
    dispatchWinSchema,
    socket,
    stateBoard,
    stateGame,
    stateGameControl,
    stateModal,
  } = useContext(StoreContext);
  const { move, option } = stateGame;
  const idTimeout1 = useRef(null);
  const idTimeout2 = useRef(null);
  const idTimeout3 = useRef(null);
  const isMount = useRef(true);
  let num = 1;
  let botMove = ['Tick bot', 'Tac bot', 'Toe bot'];
  let checkMove = botMove.includes(stateGame?.move);
  const name = JSON.parse(sessionStorage.getItem('name'));
  const checkMulti = move !== name && option !== 'local multiplayer';
  const [playerLeft, setPlayerLeft] = useState(false);
  const [nameLeft, setNameLeft] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    socket?.on('play again', (msg) => {
      if (msg.isPlay && isMount.current) controlOpenIsPlayModal(dispatchModal);
      if (!msg.isPlay && msg.isPlay !== null && isMount.current) {
        controlOpenResponseModal(dispatchModal);
        idTimeout1.current = setTimeout(
          () => controlCloseResponseModal(dispatchModal),
          3000
        );
      }
    });

    socket?.on('start again', (data, msg) => {
      if (msg && isMount.current) {
        sessionStorage.setItem('GameState', JSON.stringify(data));
        controlModalDrawClose(dispatchModal);
        controlModalLostClose(dispatchModal);
        controlModalWinClose(dispatchModal);
        controlGameBoardClear(dispatchBoard);
        controlGameRefresh(dispatchGame);
        controlFinishGame(dispatchGameControl);
        controlWinResultBoardClear(dispatchBoardResult);
        controlWinSchemaClear(dispatchWinSchema);
        controlAddGame(dispatchGame, data);
      }
    });
  }, [socket]);

  const handleLeftPlayer = () => {
    controlModalDrawClose(dispatchModal);
    controlModalLostClose(dispatchModal);
    controlModalWinClose(dispatchModal);
    controlClearGame(dispatchGame);
    controlGameBoardClear(dispatchBoard);
    controlGameRefresh(dispatchGame);
    controlFinishGame(dispatchGameControl);
    controlWinResultBoardClear(dispatchBoardResult);
    controlWinSchemaClear(dispatchWinSchema);
    sessionStorage.removeItem('GameState');
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('name');
    sessionStorage.removeItem('refresh');
    sessionStorage.removeItem('refresh_play');
    socket?.disconnect();
    navigate('/');
  };

  useEffect(() => {
    if (sessionStorage.getItem('refresh_play') && isMount.current) {
      const game = JSON.parse(sessionStorage.getItem('GameState'));
      socket?.emit('player left', game.idSocket, name);
      idTimeout2.current = setTimeout(() => handleLeftPlayer(), 300);
    }

    socket?.on('player left', (msg1, msg2) => {
      if (msg1 && isMount.current) {
        setPlayerLeft(msg1);
        setNameLeft(msg2);
        idTimeout3.current = setTimeout(() => {
          setPlayerLeft(false);
          handleLeftPlayer();
        }, 2000);
      }
    });

    sessionStorage.setItem('refresh_play', '1');
  }, [socket]);

  useEffect(() => {
    const handleChangeRoute = (e) => {
      const arrUrls = [
        'multiplayer',
        'players-online',
        'play-game',
        'single-player-start-game',
        'localmultiplayer-start-game',
      ];

      const check = arrUrls.find((item) =>
        document.location.href.includes(item)
      );

      if (check && isMount.current) {
        const game = JSON.parse(sessionStorage.getItem('GameState'));
        socket?.emit('player left', game.idSocket, name);
        handleLeftPlayer();
      }
    };
    window.addEventListener('popstate', handleChangeRoute);
    return () => window.removeEventListener('popstate', handleChangeRoute);
  }, []);

  useEffect(() => {
    return () => {
      clearTimeout(idTimeout1.current);
      clearTimeout(idTimeout2.current);
      clearTimeout(idTimeout3.current);
      isMount.current = false;
    };
  }, []);

  return (
    <LayoutOtherPages>
      <ModalOthers
        isGamePage={true}
        isLeft={playerLeft}
        isPlay={stateModal.isPlay}
        isResponse={stateModal.response}
        nameLeft={nameLeft}
      />
      <Modal
        isDraw={stateModal.draw}
        isLost={stateModal.lost}
        isWin={stateModal.win}
      />
      {stateGameControl ? (
        <div className="play-game">
          <div className="play_game__result-wrapper">
            <div className="play-game__users">
              <p className="play-game__user">{stateGame.namePlayer1}</p>
              <p className="play-game__user">Vs.</p>
              <p className="play-game__user">{stateGame.namePlayer2}</p>
            </div>
            <div className="play-game__signs">
              <p
                className={
                  stateGame.sign1 === 'x'
                    ? 'play-game__sign play-game__sign--x'
                    : 'play-game__sign play-game__sign--o'
                }
              >
                {stateGame.sign1}
              </p>
              <p
                className={
                  stateGame.sign2 === 'x'
                    ? 'play-game__sign play-game__sign--x'
                    : 'play-game__sign play-game__sign--o'
                }
              >
                {stateGame.sign2}
              </p>
            </div>
            <div className="play-game__wins">
              <p className="play-game__win">Wins: {stateGame.wins1}</p>
              <p className="play-game__win">Draws: {stateGame.draws}</p>
              <p className="play-game__win">Wins: {stateGame.wins2}</p>
            </div>
          </div>
          <div className="play-game__board-game">
            <p className="play-game__move">
              {!stateGame.winner && !stateGame.loser && !stateGame.draw
                ? `Next move: ${stateGame.move}`
                : ''}
            </p>
            <div className="play-game__board-wrapper">
              <div className="play-game__board">
                {stateBoard.map((item, index) => (
                  <button
                    disabled={Boolean(item.value) || checkMulti || checkMove}
                    key={index}
                    className={
                      item.win
                        ? `play-game__box play-game__box--active-${num++}`
                        : 'play-game__box'
                    }
                    onClick={() => handleCLickBox(index)}
                  >
                    <span
                      className={
                        item.value === 'x'
                          ? 'play-game__box-value'
                          : 'play-game__box-value play-game__box-value--o'
                      }
                    >
                      {item.value}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <PlayGameDrawingUser />
      )}
    </LayoutOtherPages>
  );
};

export default PlayGamePage;
