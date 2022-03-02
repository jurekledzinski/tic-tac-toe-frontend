import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './DifficultyPage.scss';

import { botNames, difficultyBtns } from '../utils/data';

import BackButton from './BackButton';
import LayoutOtherPages from './LayoutOtherPages';

import { StoreContext } from '../store/Store';
import {
  controlGameDifficulty,
  controlGameName2,
} from '../helpers/helpers-store';
import { redirectToPage } from '../helpers/helpers-redirect';
import useBack from '../customHooks/useBack';

const DifficultyPage = () => {
  useBack();
  const navigate = useNavigate();
  const { stateGame, dispatchGame } = useContext(StoreContext);
  const [btnIndex, setBtnIndex] = useState(0);
  const [level, setLevel] = useState({ level: 'Easy', name2: 'Tic bot' });
  const idTimeout = useRef(null);

  const handleChooseDifficulty = (e, index) => {
    const bot = botNames.find((item) => item.lvl === e.target.textContent);

    setLevel({ level: e.target.textContent, name2: bot.bot });
    setBtnIndex(index);
  };

  const handleGoAddNamePlayer = () => {
    controlGameDifficulty(level.level, dispatchGame);
    controlGameName2(level.name2, dispatchGame);
    const url = '/single-player-start-game';
    redirectToPage(idTimeout, url, navigate, 200);
  };

  useEffect(() => {
    sessionStorage.setItem('GameState', JSON.stringify(stateGame));
  }, [stateGame]);

  useEffect(() => {
    return () => clearTimeout(idTimeout.current);
  }, []);

  return (
    <LayoutOtherPages>
      <div className="difficulty-page">
        <BackButton />
        <h4 className="difficulty-page__title">Choose difficulty</h4>
        <div className="difficulty-page__btns-wrapper">
          {difficultyBtns.map((item, index) => (
            <button
              className={
                btnIndex === index
                  ? 'difficulty-page__btn difficulty-page__btn--active'
                  : 'difficulty-page__btn'
              }
              key={index}
              onClick={(e) => handleChooseDifficulty(e, index)}
            >
              {item.option}
            </button>
          ))}
          <button
            className="difficulty-page__btn"
            onClick={handleGoAddNamePlayer}
          >
            Go to add your name
          </button>
        </div>
      </div>
    </LayoutOtherPages>
  );
};

export default DifficultyPage;
