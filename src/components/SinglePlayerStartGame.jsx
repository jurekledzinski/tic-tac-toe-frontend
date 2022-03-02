import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './SinglePlayerStartGame.scss';

import { signBtns } from '../utils/data';

import BackButton from './BackButton';
import LayoutOtherPages from './LayoutOtherPages';
import MeesageAlert from './MessageAlert';

import { StoreContext } from '../store/Store';
import {
  controlGameId,
  controlGameName1,
  controlGameSign1,
  controlGameSign2,
} from '../helpers/helpers-store';

import { redirectToPage } from '../helpers/helpers-redirect';
import { addSinglePlayerGame } from '../axios/sessions';
import useBack from '../customHooks/useBack';

const SinglePlayerStartGame = () => {
  useBack();
  const navigate = useNavigate();
  const { stateGame, dispatchGame } = useContext(StoreContext);
  const { difficulty, namePlayer2, option } = stateGame;
  const [btnIndex, setBtnIndex] = useState(0);
  const [btnValue, setBtnValue] = useState('x');
  const [email1, setEmail1] = useState('');
  const [nameValue, setNameValue] = useState('');
  const [message, setMessage] = useState('');
  const [placeValue1, setPlaceValue1] = useState('Your name ...');
  const [placeValue2, setPlaceValue2] = useState('Your email ...');
  const idTimeout1 = useRef(null);
  const idTimeout2 = useRef(null);

  const handleAddUpperCaseName = (name) => {
    const arr = name.split(' ');
    const change = arr.map(
      (item) => item.charAt(0).toUpperCase() + item.substring(1)
    );
    const changeName = change.toString().replace(/[,]/g, ' ');
    sessionStorage.setItem('name', JSON.stringify(changeName));
  };

  const handleStartGame = async (e) => {
    e.preventDefault();
    if (nameValue.match(/^\s*$/)) return;
    const url = '/play-game';
    const dataForm = {
      difficulty,
      email1,
      namePlayer1: nameValue,
      namePlayer2,
      option,
    };

    const { data, status } = await addSinglePlayerGame(dataForm);

    if (status === 200) {
      handleAddUpperCaseName(nameValue);
      const secondSign = btnValue === 'x' ? 'o' : 'x';
      controlGameId(data.result.id, dispatchGame);
      controlGameName1(data.result.namePlayer1, dispatchGame);
      controlGameSign1(btnValue, dispatchGame);
      controlGameSign2(secondSign, dispatchGame);
      redirectToPage(idTimeout1, url, navigate, 200);
      return;
    } else {
      setMessage(data.message1);
      idTimeout2.current = setTimeout(() => setMessage(''), 1000);
    }
  };

  const handleBtnValues = (e, index) => {
    e.preventDefault();
    setBtnValue(e.target.textContent);
    setBtnIndex(index);
  };

  useEffect(() => {
    return () => {
      clearTimeout(idTimeout1.current);
      clearTimeout(idTimeout2.current);
    };
  }, []);

  useEffect(() => {
    sessionStorage.setItem('GameState', JSON.stringify(stateGame));
  }, [stateGame]);

  return (
    <LayoutOtherPages>
      <div className="single-player-start-page">
        <BackButton />
        <h4 className="single-player-start-page__title">Add player</h4>
        <form onSubmit={handleStartGame}>
          {message && <MeesageAlert message={message} />}
          <input
            type="text"
            className="single-player-start-page__input"
            placeholder={placeValue1}
            onBlur={() => setPlaceValue1('Your name ...')}
            onFocus={() => setPlaceValue1('')}
            onChange={(e) => setNameValue(e.target.value)}
            value={nameValue}
          />
          <input
            type="text"
            className="single-player-start-page__input"
            placeholder={placeValue2}
            onBlur={() => setPlaceValue2('Your email ...')}
            onFocus={() => setPlaceValue2('')}
            onChange={(e) => setEmail1(e.target.value)}
            value={email1}
          />
          <h4 className="single-player-start-page__title single-player-start-page__title--second">
            Choose sign
          </h4>
          <div className="single-player-start-page__wrapper-btns">
            {signBtns.map((item, index) => (
              <button
                className={
                  index === btnIndex
                    ? 'single-player-start-page__btn single-player-start-page__btn--active'
                    : 'single-player-start-page__btn'
                }
                onClick={(e) => handleBtnValues(e, index)}
                key={index}
              >
                {item.option}
              </button>
            ))}
          </div>
          <button className="single-player-start-page__btn-start">
            Start game
          </button>
        </form>
      </div>
    </LayoutOtherPages>
  );
};

export default SinglePlayerStartGame;
