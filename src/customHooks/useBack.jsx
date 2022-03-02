import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { StoreContext } from '../store/Store';
import {
  controlGameDifficulty,
  controlGameName2,
  controlGameOption,
} from '../helpers/helpers-store';

const useBack = () => {
  const { dispatchGame } = useContext(StoreContext);
  const location = useLocation();

  useEffect(() => {
    const handleChangeRoute = () => {
      switch (location.pathname) {
        case '/difficulty':
          controlGameOption('', dispatchGame);
          break;
        case '/single-player-start-game':
          controlGameDifficulty('', dispatchGame);
          controlGameName2('', dispatchGame);
          break;
        case '/localmultiplayer-start-game':
          controlGameOption('', dispatchGame);
          break;
        case '/multiplayer':
          controlGameOption('', dispatchGame);
          break;
        default:
          controlGameOption('', dispatchGame);
          break;
      }
    };

    window.addEventListener('popstate', handleChangeRoute);

    return () => window.removeEventListener('popstate', handleChangeRoute);
  }, []);
};

export default useBack;
