import React from 'react';

import './SpinnerResults.scss';

const SpinnerResults = ({ style }) => {
  return (
    <div className="spinner-results" style={style}>
      <svg viewBox="-10 -10 140 140">
        <circle cx="60" cy="10" r="3" opacity="0.2" />
        <circle cx="95" cy="25" r="4" opacity="0.3" />
        <circle cx="110" cy="60" r="5" opacity="0.4" />
        <circle cx="95" cy="95" r="6" opacity="0.5" />
        <circle cx="60" cy="110" r="7" opacity="0.6" />
        <circle cx="25" cy="95" r="8" opacity="0.7" />
        <circle cx="10" cy="60" r="9" opacity="0.8" />
        <circle cx="25" cy="25" r="10" opacity="1.0" />
      </svg>
    </div>
  );
};

export default SpinnerResults;
