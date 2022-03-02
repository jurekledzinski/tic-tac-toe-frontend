import React, { useContext } from 'react';

import './HamburgerMenu.scss';

import { StoreContext } from '../store/Store';

import { controlOpenCloseAside } from '../helpers/helpers-store';

const HamburgerMenu = () => {
  const { disptachAside } = useContext(StoreContext);

  const handleControlAside = (e) => {
    e.stopPropagation();
    controlOpenCloseAside(disptachAside);
  };

  return (
    <div className="hamburger-menu" onClick={handleControlAside}>
      <span className="hamburger-menu__line"></span>
      <span className="hamburger-menu__line"></span>
      <span className="hamburger-menu__line"></span>
    </div>
  );
};

export default HamburgerMenu;
