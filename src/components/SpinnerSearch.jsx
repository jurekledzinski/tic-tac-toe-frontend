import React from 'react';

import './SpinnerSearch.scss';

const SpinnerSearch = () => {
  return (
    <div className="spinner-search">
      <svg className="spinner-search__svg" viewBox="0 0 50 50">
        <circle
          className="spinner-search__path"
          cx="25"
          cy="25"
          r="20"
        ></circle>
      </svg>
    </div>
  );
};

export default SpinnerSearch;
