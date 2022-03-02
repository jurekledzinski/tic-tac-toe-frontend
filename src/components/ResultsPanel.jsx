import React, { useEffect, useContext, useRef, useState } from 'react';

import './ResultsPanel.scss';

import { StoreContext } from '../store/Store';

import { homeBtns, sortData } from '../utils/data';

import { getResults } from '../axios/sessions';

import {
  controlAddResultsGame,
  controlAddMoreResultsGame,
} from '../helpers/helpers-store';

import SpinnerResults from './SpinnerResults';

const ResultsPanel = () => {
  const { dispatchResults, stateAside, stateResults } =
    useContext(StoreContext);
  const [sortActive, setSortActive] = useState(false);
  const [btnIndex, setBtnIndex] = useState(0);
  const [count, setCount] = useState(0);
  const [isFetch, setIsFetch] = useState(false);
  const [valueName, setValueName] = useState('default');
  const [valueSort, setValueSort] = useState('default');
  const [isSpin, setIsSpin] = useState(false);
  const [centerSpin, setCenterSpin] = useState(false);
  const container = useRef(null);
  const idTimeout1 = useRef(null);
  const idTimeout2 = useRef(null);
  const num = useRef(0);
  const numItems = useRef(8);
  const optionGame = useRef('single player');
  const isMounted = useRef(true);

  const handleSortResults = async (e) => {
    const gameOption = optionGame.current;
    const sortValue = e.target.value.split(',')[0];
    const sortName = e.target.value.split(',')[1];
    setValueName(sortName);
    setValueSort(sortValue);
    setSortActive(false);

    const { data, status } = await getResults(
      gameOption,
      0,
      numItems.current,
      sortValue,
      sortName
    );
    if (status === 200) {
      controlAddResultsGame(dispatchResults, data.result);
      num.current = 0;
      setIsFetch(false);
    }
  };

  const handleOpenSort = (e) => {
    e.preventDefault();
    setSortActive((prevValue) => !prevValue);
  };

  const handleCheckResults = async (e, gameOption, index) => {
    e.stopPropagation();
    setBtnIndex(index);
    setSortActive(false);
    optionGame.current = gameOption.toLowerCase();
    setIsSpin(true);
    setCenterSpin(false);

    const { data, status } = await getResults(gameOption.toLowerCase(), 0);

    if (status === 200) {
      idTimeout1.current = setTimeout(() => setCenterSpin(true), 300);
      num.current = 0;
      setCount(data.count);
      setIsFetch(false);
      controlAddResultsGame(dispatchResults, data.result);
    }
  };

  const fetchResultsOnScroll = async () => {
    const { data, status } = await getResults(
      optionGame.current,
      num.current,
      numItems.current,
      valueSort,
      valueName
    );

    setIsSpin(false);

    if (status === 200) {
      idTimeout2.current = setTimeout(() => setIsSpin(true), 500);
      return controlAddMoreResultsGame(dispatchResults, data.result);
    }
  };

  const handleScroll = () => {
    const condition =
      container.current.scrollHeight - container.current.scrollTop ===
      container.current.clientHeight;

    if (condition) {
      setIsFetch(true);
    }
  };

  useEffect(() => {
    if (Boolean(container.current)) {
      container.current.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (Boolean(container.current)) {
        container.current.removeAddEventListener('scroll', handleScroll);
      }
      clearTimeout(idTimeout1.current);
      clearTimeout(idTimeout2.current);
    };
  }, []);

  useEffect(() => {
    if (!isFetch) return;
    num.current = num.current + 1;

    if (
      num.current === 0 ||
      num.current <= Math.floor(count / numItems.current)
    ) {
      fetchResultsOnScroll();
      setIsFetch(false);
    }
  }, [isFetch]);

  useEffect(() => {
    const fetchData = async () => {
      const { data, status } = await getResults(
        'single player',
        0,
        numItems.current
      );

      if (status === 200 && isMounted.current) {
        controlAddResultsGame(dispatchResults, data.result);
        setCount(data.count);
        setCenterSpin(true);
      }
    };
    fetchData();
    setIsSpin(true);
    return () => (isMounted.current = false);
  }, []);

  return (
    <aside
      className={
        stateAside ? 'result-panel result-panel--active' : 'result-panel'
      }
      onClick={(e) => e.stopPropagation()}
    >
      <div className="result-panel__btns">
        {homeBtns.map((item, index) => (
          <button
            className={
              btnIndex === index
                ? 'result-panel__btn result-panel__btn--active'
                : 'result-panel__btn'
            }
            key={index}
            onClick={(e) => handleCheckResults(e, item.option, index)}
          >
            {item.option}
          </button>
        ))}
      </div>
      <div className="result-panel__wrapper-sort">
        <button
          className={
            sortActive
              ? 'result-panel__btn-sort result-panel__btn-sort--active'
              : 'result-panel__btn-sort'
          }
          onClick={handleOpenSort}
        >
          Sort results
        </button>
        <div
          className={
            sortActive
              ? 'result-panel__sort result-panel__sort--active'
              : 'result-panel__sort'
          }
        >
          {sortData.map((item, index) => (
            <div className="result-panel__option" key={index}>
              <label className="result-panel__label-option" htmlFor={item.id}>
                {item.text}
                <span className="result-panel__icon">
                  <i className={item.icon}></i>
                </span>
                <input
                  type="radio"
                  className="result-panel__radio"
                  id={item.id}
                  name="sort"
                  onChange={handleSortResults}
                  value={item.value}
                />
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className="result-panel__container" ref={container}>
        {stateResults.map((item, index) => (
          <div className="result-panel__box" key={index}>
            <div className="result-panel__names">
              <p className="result-panel__name">{item.namePlayer1}</p>
              <p className="result-panel__name">{item.namePlayer2}</p>
            </div>
            <div className="result-panel__scores">
              <p className="result-panel__score">Wins: {item.wins1}</p>
              <p className="result-panel__score">Draws: {item.draws}</p>
              <p className="result-panel__score">Wins: {item.wins2}</p>
            </div>
          </div>
        ))}
        {!isSpin && <SpinnerResults />}
        {!centerSpin && (
          <SpinnerResults
            style={{
              position: 'absolute',
              top: '50%',
              left: 'calc(50% - 16px)',
              transfrom: 'translate(-50%,-50%)',
            }}
          />
        )}
      </div>
    </aside>
  );
};

export default ResultsPanel;
