import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './LocalMultiplayerStartGame.scss';

import BackButton from './BackButton';
import LayoutOtherPages from './LayoutOtherPages';
import MessageAlert from './MessageAlert';

import { signBtns } from '../utils/data';

import { StoreContext } from '../store/Store';

import {
  controlGameName1,
  controlGameName2,
  controlGameSign1,
  controlGameSign2,
  controlGameId,
} from '../helpers/helpers-store';

import { addPlayerGame } from '../axios/sessions';
import useBack from '../customHooks/useBack';

const LocalMultiplayerStartGame = () => {
  useBack();
  const { stateGame, dispatchGame } = useContext(StoreContext);
  const navigate = useNavigate();
  const [btnIndex1, setBtnIndex1] = useState(0);
  const [btnIndex2, setBtnIndex2] = useState(1);
  const [btnValue1, setBtnValue1] = useState('x');
  const [btnValue2, setBtnValue2] = useState('o');
  const [nameValue1, setNameValue1] = useState('');
  const [nameValue2, setNameValue2] = useState('');
  const [email1, setEmail1] = useState('');
  const [email2, setEmail2] = useState('');
  const [placeValue1, setPlaceValue1] = useState('Your name ...');
  const [placeValue2, setPlaceValue2] = useState('Your name ...');
  const [placeValue3, setPlaceValue3] = useState('Your email ...');
  const [placeValue4, setPlaceValue4] = useState('Your email ...');
  const [message1, setMessage1] = useState('');
  const [message2, setMessage2] = useState('');
  const idTimeout = useRef(null);

  const checkIsEmptyInput = () => {
    const inputs = [nameValue1, nameValue2, email1, email2];
    const check = inputs.some((item) => item.match(/^\s*$/));
    return check;
  };

  const checkDuplicates = () => {
    const checkNames = nameValue1 === nameValue2;
    const checkEmails = email1 === email2;
    return checkNames || checkEmails;
  };

  const clearMessage = () => {
    idTimeout.current = setTimeout(() => {
      setMessage1('');
      setMessage2('');
    }, 2000);
  };

  const handleStartGame = async (e) => {
    e.preventDefault();
    const check = checkIsEmptyInput();
    const checkDups = checkDuplicates();
    if (check) return;
    if (checkDups) {
      setMessage1('Both players have to be different');
      clearMessage();
      return;
    }

    const dataForm = {
      email1,
      email2,
      namePlayer1: nameValue1,
      namePlayer2: nameValue2,
      option: stateGame.option,
    };

    const { data, status } = await addPlayerGame(dataForm);

    if (data.message1) setMessage1(data.message1);
    if (data.message2) setMessage2(data.message2);

    clearMessage();

    if (status === 200) {
      controlGameId(data.result.id, dispatchGame);
      controlGameName1(data.result.namePlayer1, dispatchGame);
      controlGameName2(data.result.namePlayer2, dispatchGame);
      controlGameSign1(btnValue1, dispatchGame);
      controlGameSign2(btnValue2, dispatchGame);
      navigate('/play-game');
    }
  };

  const handleBtnValues1 = (e, index) => {
    e.preventDefault();
    setBtnValue1(e.target.textContent);
    setBtnIndex1(index);

    if (index === 1) {
      setBtnValue2('x');
      setBtnIndex2(0);
    } else {
      setBtnValue2('o');
      setBtnIndex2(1);
    }
  };

  const handleBtnValues2 = (e, index) => {
    e.preventDefault();
    setBtnValue2(e.target.textContent);
    setBtnIndex2(index);

    if (index === 0) {
      setBtnValue1('o');
      setBtnIndex1(1);
    } else {
      setBtnValue1('x');
      setBtnIndex1(0);
    }
  };

  useEffect(() => {
    sessionStorage.setItem('GameState', JSON.stringify(stateGame));
  }, [stateGame]);

  useEffect(() => {
    return () => clearTimeout(idTimeout.current);
  }, []);

  return (
    <LayoutOtherPages>
      <div className="localMultiplayer-start">
        <BackButton local={true} />
        <form onSubmit={handleStartGame}>
          <div className="localMultiplayer-start__top">
            <h4 className="localMultiplayer-start__title">Add player 1</h4>
            {message1 && (
              <MessageAlert message={message1 ? message1 : message2} />
            )}
            <input
              type="text"
              className="localMultiplayer-start__input"
              placeholder={placeValue1}
              onBlur={() => setPlaceValue1('Your name ...')}
              onFocus={() => setPlaceValue1('')}
              onChange={(e) => setNameValue1(e.target.value)}
              value={nameValue1}
            />
            <input
              type="text"
              className="localMultiplayer-start__input"
              placeholder={placeValue3}
              onBlur={() => setPlaceValue3('Your email ...')}
              onFocus={() => setPlaceValue3('')}
              onChange={(e) => setEmail1(e.target.value)}
              value={email1}
            />
            <h4 className="localMultiplayer-start__title-sign">Choose sign</h4>
            <div className="localMultiplayer-start__wrapper-btns">
              {signBtns.map((item, index) => (
                <button
                  className={
                    index === btnIndex1
                      ? 'localMultiplayer-start__btn localMultiplayer-start__btn--active'
                      : 'localMultiplayer-start__btn'
                  }
                  onClick={(e) => handleBtnValues1(e, index)}
                  key={index}
                >
                  {item.option}
                </button>
              ))}
            </div>
          </div>
          <div className="localMultiplayer-start__down">
            <h4 className="localMultiplayer-start__title">Add player 2</h4>
            {message2 && (
              <MessageAlert message={message1 ? message1 : message2} />
            )}
            <input
              type="text"
              className="localMultiplayer-start__input"
              placeholder={placeValue2}
              onBlur={() => setPlaceValue2('Your name ...')}
              onFocus={() => setPlaceValue2('')}
              onChange={(e) => setNameValue2(e.target.value)}
              value={nameValue2}
            />
            <input
              type="text"
              className="localMultiplayer-start__input"
              placeholder={placeValue4}
              onBlur={() => setPlaceValue4('Your email ...')}
              onFocus={() => setPlaceValue4('')}
              onChange={(e) => setEmail2(e.target.value)}
              value={email2}
            />
            <h4 className="localMultiplayer-start__title-sign">Choose sign</h4>
            <div className="localMultiplayer-start__wrapper-btns">
              {signBtns.map((item, index) => (
                <button
                  className={
                    index === btnIndex2
                      ? 'localMultiplayer-start__btn localMultiplayer-start__btn--active'
                      : 'localMultiplayer-start__btn'
                  }
                  onClick={(e) => handleBtnValues2(e, index)}
                  key={index}
                >
                  {item.option}
                </button>
              ))}
            </div>
          </div>
          <button className="localMultiplayer-start__btn-start">
            Start game
          </button>
        </form>
      </div>
    </LayoutOtherPages>
  );
};

export default LocalMultiplayerStartGame;
