import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './HomePage.scss';

import LayoutPage from './LayoutPage';

import { logoData, homeBtns } from '../utils/data';

import { StoreContext } from '../store/Store';
import { controlGameOption, controlClearGame } from '../helpers/helpers-store';
import { redirectToPage } from '../helpers/helpers-redirect';

const HomePage = () => {
  const { dispatchGame, stateGame } = useContext(StoreContext);
  const navigate = useNavigate();
  const [btnIndex, setBtnIndex] = useState(0);
  const idTimeout = useRef(0);

  const handleChooseOption = (e, index, url) => {
    const option = e.target.textContent.toLowerCase();
    controlClearGame(dispatchGame);
    controlGameOption(option, dispatchGame);
    setBtnIndex(index);
    redirectToPage(idTimeout, url, navigate, 200);
  };

  useEffect(() => {
    sessionStorage.setItem('GameState', JSON.stringify(stateGame));
  }, [stateGame]);

  useEffect(() => {
    return () => clearTimeout(idTimeout.current);
  }, []);

  return (
    <LayoutPage>
      <div className="home-page">
        <div className="home-page__logo">
          {logoData.map((item, index) => (
            <div className="home-page__logo-box" key={index}>
              <p className="home-page__logo-letter">{item.letter}</p>
            </div>
          ))}
        </div>
        <div className="home-page__btns-wrapper">
          {homeBtns.map((item, index) => (
            <button
              className={
                btnIndex === index
                  ? 'home-page__btn home-page__btn--active'
                  : 'home-page__btn'
              }
              key={index}
              onClick={(e) => handleChooseOption(e, index, item.url)}
            >
              {item.option}
            </button>
          ))}
        </div>
      </div>
    </LayoutPage>
  );
};

export default HomePage;
