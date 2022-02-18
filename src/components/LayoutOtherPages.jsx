import React, { useContext } from 'react';

import './LayoutOtherPages.scss';

import { StoreContext } from '../store/Store';

import HamburgerMenu from './HamburgerMenu';
import Footer from './Footer';
import ResultsPanel from './ResultsPanel';

import { controlCloseAside } from '../helpers/helpers-store';

const LayoutOtherPages = ({ children }) => {
  const { disptachAside, stateAside } = useContext(StoreContext);

  const handleCloseAside = (e) => {
    if (stateAside) controlCloseAside(disptachAside);
  };

  return (
    <div className="layout-other" onClick={handleCloseAside}>
      <HamburgerMenu />
      <ResultsPanel />
      <div className="layout-other__other-pages">{children}</div>
      <Footer />
    </div>
  );
};

export default LayoutOtherPages;
