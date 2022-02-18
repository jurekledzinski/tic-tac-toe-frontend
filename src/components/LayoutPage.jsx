import React, { useContext } from 'react';

import './LayoutPage.scss';

import { StoreContext } from '../store/Store';

import HamburgerMenu from './HamburgerMenu';
import ResultsPanel from './ResultsPanel';

import { controlCloseAside } from '../helpers/helpers-store';

const LayoutPage = ({ children }) => {
  const { disptachAside, stateAside } = useContext(StoreContext);

  const handleCloseAside = (e) => {
    if (stateAside) controlCloseAside(disptachAside);
  };

  return (
    <div className="layout" onClick={handleCloseAside}>
      <HamburgerMenu />
      <ResultsPanel />
      <div className="layout__home-page">{children}</div>
    </div>
  );
};
export default LayoutPage;
