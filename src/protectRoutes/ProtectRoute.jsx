import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';

import { StoreContext } from '../store/Store';

export const ProtectRouteOne = ({ children }) => {
  const { stateGame } = useContext(StoreContext);
  const { option } = stateGame;
  return option === 'single player' ? children : <Navigate to="/" replace />;
};

export const ProtectRouteTWo = ({ children }) => {
  const { stateGame } = useContext(StoreContext);
  const { option } = stateGame;
  return option === 'multiplayer' ? children : <Navigate to="/" replace />;
};

export const ProtectRouteThree = ({ children }) => {
  const { stateGame } = useContext(StoreContext);
  const { option } = stateGame;
  return option === 'local multiplayer' ? (
    children
  ) : (
    <Navigate to="/" replace />
  );
};

export const ProtectRouteFour = ({ children }) => {
  const { stateGame } = useContext(StoreContext);
  const { difficulty, option } = stateGame;
  const cond1 =
    difficulty === 'Easy' || difficulty === 'Medium' || difficulty === 'Hard';
  const cond2 = option === 'single player';
  return cond1 && cond2 ? children : <Navigate to="/" replace />;
};

export const ProtectRouteFive = ({ children }) => {
  const { stateGame } = useContext(StoreContext);
  const { option } = stateGame;
  const cond1 =
    option === 'single player' ||
    option === 'multiplayer' ||
    option === 'local multiplayer';
  return cond1 ? children : <Navigate to="/" replace />;
};
