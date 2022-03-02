import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import { StoreContext } from '../store/Store';

import {
  controlAddValueSign,
  controlGameBoardAdd,
  controlGameDrawOn,
  controlGameMove,
  controlGameLoser,
  controlGameWinner,
  controlModalDrawOpen,
  controlModalLostOpen,
  controlModalWinOpen,
  controlValueSign,
  controlValueSignTrue,
  controlWinSchemaAdd,
  controlWinResultBoardAdd,
  controlWinsPlayer1,
  controlWinsPlayer2,
  controlDrawsPlayers,
  controlGameSign1,
  controlGameSign2,
} from '../helpers/helpers-store';

import { addResultGame, updatePlayerOnlineAvailable } from '../axios/sessions';

export const useGame = () => {
  const {
    dispatchBoardResult,
    dispatchBoard,
    dispatchGame,
    dispatchModal,
    dispatchWinSchema,
    dispatchValueSign,
    stateBoard,
    stateBoardResult,
    stateGame,
    stateGameControl,
    stateValueSign,
    stateWinSchema,
    socket,
  } = useContext(StoreContext);
  const {
    difficulty,
    move,
    namePlayer1,
    namePlayer2,
    option,
    sign1,
    sign2,
    winner,
    loser,
    draw,
  } = stateGame;
  const checkWin = useRef(false);
  const isMount = useRef(true);
  const idTimeout1 = useRef(null);
  const idTimeout2 = useRef(null);
  const numberBox = useRef(null);
  const [isFullBoard, setIsFullBoard] = useState(false);
  const [playerMove, setPlayerMove] = useState(null);

  const timeClose = (fn) => {
    idTimeout1.current = setTimeout(() => {
      fn(dispatchModal);
    }, 1200);
  };

  const handleAddResult = async (draw, win1, win2) => {
    const resultDate = {
      draws: draw,
      name1: stateGame.namePlayer1,
      wins1: win1,
      wins2: win2,
    };
    const idResult = stateGame.id;
    await addResultGame(idResult, resultDate);
  };

  const checkWinnerSinglePlayer = (winSign) => {
    const winner = sign1 === winSign && namePlayer1;
    const looser = sign1 !== winSign && namePlayer1;

    if (sign1 === winSign) {
      controlWinsPlayer1(dispatchGame);
      handleAddResult(0, 1, 0);
    } else {
      controlWinsPlayer2(dispatchGame);
      handleAddResult(0, 0, 1);
    }

    if (winner) {
      controlValueSignTrue(dispatchValueSign);
      controlGameMove('', dispatchGame);
      controlGameWinner(winner, dispatchGame);
      timeClose(controlModalWinOpen);
      return;
    }

    controlValueSignTrue(dispatchValueSign);
    controlGameMove('', dispatchGame);
    controlGameLoser(looser, dispatchGame);
    timeClose(controlModalLostOpen);
  };

  const checkWinnerMultiplayer = (winSign) => {
    const gameStatus = JSON.parse(sessionStorage.getItem('GameState'));
    const winner = sign1 === winSign ? namePlayer1 : namePlayer2;
    const looser = sign1 !== winSign ? namePlayer1 : namePlayer2;

    if (sign1 === winSign) {
      controlWinsPlayer1(dispatchGame);
      handleAddResult(0, 1, 0);
      const win1 = true;
      socket.emit('game win', gameStatus.idSocket, true, win1);
    } else {
      handleAddResult(0, 0, 1);
      const win2 = false;
      controlWinsPlayer2(dispatchGame);
      socket.emit('game win', gameStatus.idSocket, true, win2);
    }

    controlValueSignTrue(dispatchValueSign);
    controlGameMove('', dispatchGame);
    controlGameWinner(winner, dispatchGame);
    timeClose(controlModalWinOpen);

    socket.emit('game lost', gameStatus.idSocket, looser);
  };

  const checkWinnerLocalMultiplayer = (winSign) => {
    const winner = sign1 === winSign ? namePlayer1 : namePlayer2;

    if (sign1 === winSign) {
      controlWinsPlayer1(dispatchGame);
      handleAddResult(0, 1, 0);
    } else {
      controlWinsPlayer2(dispatchGame);
      handleAddResult(0, 0, 1);
    }

    controlValueSignTrue(dispatchValueSign);
    controlGameMove('', dispatchGame);
    controlGameWinner(winner, dispatchGame);
    timeClose(controlModalWinOpen);
  };

  const checkWinner = (winSign) => {
    switch (option) {
      case 'single player':
        checkWinnerSinglePlayer(winSign);
        break;
      case 'multiplayer':
        checkWinnerMultiplayer(winSign);
        break;
      case 'local multiplayer':
        checkWinnerLocalMultiplayer(winSign);
        break;
      default:
        break;
    }
  };

  const checkIsDraw = useCallback(() => {
    const isAllBoard = stateBoard.every((item) => Boolean(item.value) === true);
    setIsFullBoard(isAllBoard);
    const cond1 = isAllBoard && stateBoardResult < 3;
    const cond2 = checkWin.current && option === 'multiplayer';

    if (cond1 && cond2) {
      return timeClose(controlModalLostOpen);
    }

    if (isAllBoard && stateBoardResult < 3) {
      handleAddResult(1, 0, 0);
      controlGameDrawOn(dispatchGame);
      controlGameMove('', dispatchGame);
      controlDrawsPlayers(dispatchGame);
      timeClose(controlModalDrawOpen);
    }
  }, [stateBoard]);

  const controlWinner = (btnIndex, btnSign) => {
    numberBox.current = btnIndex;
    if (option !== 'multiplayer') controlValueSign(dispatchValueSign);

    const updateBox = stateBoard.map((item, index) => ({
      ...item,
      value: btnIndex === index ? btnSign : item.value,
      i: btnIndex === index ? btnIndex : item.i,
    }));

    let deepCopy = JSON.parse(JSON.stringify(stateWinSchema));

    const update = deepCopy.map((itemWin) => {
      return itemWin.map((item) => ({
        ...item,
        value: item.i === btnIndex ? (stateValueSign ? 'x' : 'o') : item.value,
        win: item.i === btnIndex ? true : item.win,
      }));
    });

    controlWinSchemaAdd(dispatchWinSchema, update);

    const addWinFields = (resultWin) => {
      checkWinner(resultWin[0].value);
      const addWin = updateBox.map((itemBox) => {
        const singleBox = resultWin.find((itemWin) => itemBox.i === itemWin.i);
        if (itemBox.i === singleBox?.i) {
          return {
            ...itemBox,
            win: singleBox?.win,
          };
        }
        return itemBox;
      });

      if (option !== 'multiplayer') {
        return controlGameBoardAdd(dispatchBoard, addWin);
      }

      const gameStatus = JSON.parse(sessionStorage.getItem('GameState'));
      socket?.emit('game board', gameStatus.idSocket, addWin);
      return controlGameBoardAdd(dispatchBoard, addWin);
    };

    let checkerWin = [];

    update.forEach((item) => {
      const resultX = item.filter(
        (item1) => item1.value === 'x' && item1.win === true
      );

      const resultO = item.filter(
        (item1) => item1.value === 'o' && item1.win === true
      );

      if (resultX.length === 3) {
        controlWinResultBoardAdd(dispatchBoardResult, resultX.length);
        addWinFields(resultX);
        checkerWin = [...resultX];
      }

      if (resultO.length === 3) {
        controlWinResultBoardAdd(dispatchBoardResult, resultO.length);
        addWinFields(resultO);
        checkerWin = [...resultO];
      }
    });

    if (!checkerWin.length && option === 'multiplayer') {
      const gameStatus = JSON.parse(sessionStorage.getItem('GameState'));
      socket?.emit('game board', gameStatus.idSocket, updateBox);
    }

    !checkerWin.length && controlGameBoardAdd(dispatchBoard, updateBox);
  };

  const updateBoard = (indexNum) => {
    controlWinner(indexNum, sign2);
  };

  const handleBotPlay = (arr) => {
    if (arr.length > 0) {
      const drawNum = arr[Math.round(Math.random() * (arr.length - 1))];
      return setTimeout(() => updateBoard(drawNum), 1500);
    }
  };

  const handleEasyDifficulty = () => {
    const fIndexes = stateBoard.map((item, index) => item.i === null && index);
    const restIndexes = fIndexes.filter((item) => item !== false);
    handleBotPlay(restIndexes);
  };

  const handleMediumHardDifficulty = () => {
    if (numberBox.current === null) {
      return handleEasyDifficulty();
    }

    const clickNums = stateBoard.map((item, index) => item.i !== null && index);
    const leftBoxes = clickNums
      .map((item, index) => item === false && index)
      .filter((item) => item);

    let numberCheckX = [];
    let numberCheckO = [];

    stateWinSchema.forEach((item1) => {
      const xxValues = item1.filter((item) => item.value === sign1);
      const oovalues = item1.filter((item) => item.value === sign2);

      if (oovalues.length === 2 && difficulty === 'Hard') {
        const nums = item1.filter((item) => item.value === '');
        if (nums.length > 0) {
          const indexBlock = nums.map((item) => item.i);
          numberCheckO.push(...indexBlock);
        }
      }

      if (xxValues.length === 2) {
        const nums = item1.filter((item) => item.value === '');
        if (nums.length > 0) {
          const indexBlock = nums.map((item) => item.i);
          numberCheckX.push(...indexBlock);
        }
      }
    });

    if (numberCheckX.length > 0) {
      return handleBotPlay(numberCheckX);
    } else if (numberCheckO.length > 0 && difficulty === 'Hard') {
      return handleBotPlay(numberCheckO);
    }

    const arrWinIndexes = stateWinSchema.reduce((acc, item1) => {
      const single = item1.filter((item2) => item2.i !== numberBox.current);
      if (single.length === 2) {
        const noDuplicates = single.filter((item3) => item3.value === '');
        const indexesWins = noDuplicates.map((item4) => item4.i);
        return (acc = [...acc, ...indexesWins]);
      }
      return acc;
    }, []);

    if (arrWinIndexes.length > 0) {
      return handleBotPlay(arrWinIndexes);
    } else {
      handleBotPlay(leftBoxes);
    }
  };

  const botMoveDifficulty = () => {
    switch (difficulty) {
      case 'Easy':
        handleEasyDifficulty();
        break;
      case 'Medium':
        handleMediumHardDifficulty();
        break;
      case 'Hard':
        handleMediumHardDifficulty();
        break;
      default:
        break;
    }
  };

  const handleCLickBox = (indexBox) => {
    const status = winner || loser || draw;
    if (isFullBoard) return;
    if (status) return;

    const move = stateValueSign ? 'x' : 'o';

    if (option !== 'multiplayer') {
      return controlWinner(indexBox, move);
    }

    const gameStatus = JSON.parse(sessionStorage.getItem('GameState'));
    const receiverSocketId = gameStatus.idSocket;

    setPlayerMove((prevValue) => !prevValue);

    const flag = playerMove;
    socket?.emit('game move', receiverSocketId, !flag);
    const next = !flag ? namePlayer1 : namePlayer2;

    controlGameMove(next, dispatchGame);
    controlWinner(indexBox, move);
  };

  useEffect(() => {
    if (isMount.current) checkIsDraw();
  }, [checkIsDraw]);

  useEffect(() => {
    const status = !winner && !loser && !draw;
    if (stateGameControl) {
      const move = stateValueSign ? 'x' : 'o';
      const next = sign1 === move ? namePlayer1 : namePlayer2;

      if (option !== 'multiplayer') {
        return status && controlGameMove(next, dispatchGame);
      }
    }
  }, [stateGameControl, stateValueSign]);

  useEffect(() => {
    const checkName = ['Tic bot', 'Tac bot', 'Toe bot'].includes(move);
    const status = option === 'single player' && !winner && !loser && !draw;
    if (checkName && status) botMoveDifficulty();
  }, [move]);

  useEffect(() => {
    return () => {
      clearTimeout(idTimeout1.current);
      clearTimeout(idTimeout2.current);
    };
  }, []);

  const getNamesPlayers = () => {
    const game = JSON.parse(sessionStorage.getItem('GameState'));
    return {
      name1: game.namePlayer1,
      name2: game.namePlayer2,
      idReceiver: game.idSocket,
    };
  };

  useEffect(() => {
    if (option === 'multiplayer') {
      socket?.on('draw sign', (msg1, msg2) => {
        if (isMount.current) {
          const { name1, name2 } = getNamesPlayers();
          const name = JSON.parse(sessionStorage.getItem('name'));
          const s1 = msg1.sign1 ? 'x' : 'o';
          const s2 = msg1.sign2 ? 'x' : 'o';
          controlGameSign1(s1, dispatchGame);
          controlGameSign2(s2, dispatchGame);
          if (name === name1) {
            controlAddValueSign(dispatchValueSign, msg1.sign1);
          } else {
            controlAddValueSign(dispatchValueSign, msg1.sign2);
          }
          setPlayerMove(msg2);
          const next = msg2 ? name1 : name2;
          controlGameMove(next, dispatchGame);
          checkWin.current = false;
        }
      });

      socket?.on('game move', (msg) => {
        if (isMount.current) {
          const { name1, name2 } = getNamesPlayers();
          const moveClick = msg ? name1 : name2;
          controlGameMove(moveClick, dispatchGame);
          setPlayerMove(msg);
        }
      });

      socket?.on('game board', (msg) => {
        if (isMount.current) {
          controlGameBoardAdd(dispatchBoard, msg);
        }
      });

      socket?.on('game win', (msg1, msg2) => {
        if (msg2 && isMount.current) {
          controlWinsPlayer1(dispatchGame);
        } else {
          controlWinsPlayer2(dispatchGame);
        }
        checkWin.current = msg1;
      });

      socket?.on('game lost', (msg) => {
        if (isMount.current) {
          controlGameLoser(msg, dispatchGame);
          timeClose(controlModalLostOpen);
        }
      });
    }
  }, [socket]);

  useEffect(() => {
    sessionStorage.setItem('GameState', JSON.stringify(stateGame));
  }, [stateGame]);

  useEffect(() => {
    const updateOnline = async () => {
      const id = JSON.parse(sessionStorage.getItem('id'));
      const { data, status } = await updatePlayerOnlineAvailable(id, '0');
      if (status === 200 && data.result && isMount.current) {
        socket?.emit('player remove list', data.result._id);
      }
    };
    if (option === 'multiplayer') updateOnline();

    return () => (isMount.current = false);
  }, []);

  return {
    handleCLickBox,
  };
};
