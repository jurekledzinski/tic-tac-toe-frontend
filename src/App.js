import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './components/HomePage';
import DifficultyPage from './components/DifficultyPage';
import SinglePlayer from './components/SinglePlayerStartGame';
import PlayGamePage from './components/PlayGamePage';
import LocalMulti from './components/LocalMultiplayerStartGame';
import MultiplayerAddName from './components/MultiplayerAddName';
import PlayersOnline from './components/PlayersOnline';
import NotFoundPage from './components/NotFoundPage';
import {
  ProtectRouteOne,
  ProtectRouteTWo,
  ProtectRouteThree,
  ProtectRouteFour,
  ProtectRouteFive,
} from './protectRoutes/ProtectRoute';

const MainPage = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="difficulty"
          element={
            <ProtectRouteOne>
              <DifficultyPage />
            </ProtectRouteOne>
          }
        />
        <Route
          path="localmultiplayer-start-game"
          element={
            <ProtectRouteThree>
              <LocalMulti />
            </ProtectRouteThree>
          }
        />
        <Route
          path="multiplayer"
          element={
            <ProtectRouteTWo>
              <MultiplayerAddName />
            </ProtectRouteTWo>
          }
        />
        <Route
          path="play-game"
          element={
            <ProtectRouteFive>
              <PlayGamePage />
            </ProtectRouteFive>
          }
        />
        <Route
          path="players-online"
          element={
            <ProtectRouteTWo>
              <PlayersOnline />
            </ProtectRouteTWo>
          }
        />
        <Route
          path="single-player-start-game"
          element={
            <ProtectRouteFour>
              <SinglePlayer />
            </ProtectRouteFour>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default MainPage;
