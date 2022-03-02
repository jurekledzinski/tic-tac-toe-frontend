import React, {
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';

import './PlayersOnline.scss';

import Modal from './Modal';
import ModalOthers from './ModalOthers';
import LayoutOtherPages from './LayoutOtherPages';
import SpinnerSearch from './SpinnerSearch';

import { StoreContext } from '../store/Store';

import {
  controlAddGame,
  controlAddOnlinePlayers,
  controlOpenIsPlayModal,
  controlOpenResponseModal,
  controlCloseResponseModal,
  controlRemoveOnlinePlayer,
  controlTurnOnDisablePlayer,
  controlTurnOffDisablePlayer,
} from '../helpers/helpers-store';

const PlayersOnline = () => {
  const navigate = useNavigate();
  const {
    dispatchGame,
    dispatchModal,
    dispatchOnlinePlayers,
    stateModal,
    stateOnlinePlayers,
    socket,
  } = useContext(StoreContext);
  const [userOnline, setUserOnline] = useState([]);
  const idTimeout1 = useRef(null);
  const idTimeout2 = useRef(null);
  const idTimeout3 = useRef(null);
  const [checkOnline, setCheckOnline] = useState();
  const [showSearch, setShowSearch] = useState(true);
  const isMount = useRef(true);

  const handleChangeUserOnline = (e) => {
    const data = e.target.value.split(',');
    setUserOnline(data);
  };

  const handleAskForGame = () => {
    if (!Boolean(userOnline.length)) return;
    const modalIsPlay = { isPlay: true };
    const sender = socket.id;
    const receiver = userOnline[0];
    const flag = true;
    socket.emit('private message', receiver, modalIsPlay);
    socket.emit('player disable', receiver, sender, flag);
  };

  const handleBackToSearch = () => {
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('name');
    sessionStorage.removeItem('refresh');
    socket.disconnect();
    navigate('/multiplayer');
  };

  useEffect(() => {
    if (sessionStorage.getItem('refresh')) {
      sessionStorage.removeItem('refresh');
      sessionStorage.removeItem('name');
      sessionStorage.removeItem('id');
      return navigate('/multiplayer');
    }
    setTimeout(() => {
      sessionStorage.setItem('refresh', '1');
    }, 100);
  }, []);

  useEffect(() => {
    const idUserOnline = JSON.parse(sessionStorage.getItem('id'));

    socket?.on('join', (msg) => {
      const arrUsersOnline = msg.filter((item) => item._id !== idUserOnline);
      controlAddOnlinePlayers(dispatchOnlinePlayers, arrUsersOnline);
    });

    socket?.on('private message', (msg) => {
      if (msg.isPlay) controlOpenIsPlayModal(dispatchModal);
      if (!msg.isPlay && msg.isPlay !== null) {
        controlOpenResponseModal(dispatchModal);
        idTimeout1.current = setTimeout(
          () => controlCloseResponseModal(dispatchModal),
          3000
        );
      }
    });

    socket?.on('start game', (data, msg) => {
      if (msg) {
        controlAddGame(dispatchGame, data);
        sessionStorage.setItem('GameState', JSON.stringify(data));
        idTimeout3.current = setTimeout(() => navigate('/play-game'), 500);
      }
    });

    socket?.on('player remove list', (msg) => {
      controlRemoveOnlinePlayer(dispatchOnlinePlayers, msg);
    });

    socket?.on('player disable', (msg1, msg2, flag) => {
      if (flag) {
        controlTurnOnDisablePlayer(dispatchOnlinePlayers, msg1);
        controlTurnOnDisablePlayer(dispatchOnlinePlayers, msg2);
      } else {
        controlTurnOffDisablePlayer(dispatchOnlinePlayers, msg1);
        controlTurnOffDisablePlayer(dispatchOnlinePlayers, msg2);
      }
    });

    socket?.on('leave', (msg) => {
      const idUserOnline = JSON.parse(sessionStorage.getItem('id'));
      const arrUsersOnline = msg.filter((item) => item._id !== idUserOnline);
      controlAddOnlinePlayers(dispatchOnlinePlayers, arrUsersOnline);
    });
  }, [socket]);

  useEffect(() => {
    if (isMount.current)
      idTimeout2.current = setTimeout(() => {
        setShowSearch(false);
      }, 1500);

    return () => {
      clearTimeout(idTimeout1.current);
      clearTimeout(idTimeout2.current);
      clearTimeout(idTimeout3.current);
      isMount.current = false;
    };
  }, []);

  useEffect(() => {
    const check = stateOnlinePlayers.filter((item) => item.available).length;
    setCheckOnline(check);
  }, [stateOnlinePlayers]);

  return (
    <LayoutOtherPages>
      <ModalOthers
        isGamePage={false}
        isLeft={false}
        isPlay={stateModal.isPlay}
        isResponse={stateModal.response}
        nameLeft={''}
      />
      <Modal isDraw={false} isLost={false} isWin={false} />
      {showSearch ? (
        <SpinnerSearch />
      ) : (
        <div className="players-online">
          <div className="players-online__wrapper">
            <h4 className="players-online__title">Choose player online</h4>
            <div className="players-online__list">
              {Boolean(checkOnline) ? (
                stateOnlinePlayers.map((item, index) => (
                  <Fragment key={index}>
                    {item.available && (
                      <label className="players-online__label" htmlFor={index}>
                        <input
                          checked={item.name === userOnline[1]}
                          className="players-online__input"
                          id={index}
                          name="online"
                          type="radio"
                          value={[item.idSocket, item.name]}
                          onChange={handleChangeUserOnline}
                          disabled={item.disable}
                        />
                        {item.name}{' '}
                        {item.disable && (
                          <span className="players-online__ask">
                            Unavailabel
                          </span>
                        )}
                      </label>
                    )}
                  </Fragment>
                ))
              ) : (
                <p className="players-online__no-players">No players online</p>
              )}
            </div>
            {Boolean(stateOnlinePlayers.length) && (
              <button
                className="players-online__btn-start"
                onClick={handleAskForGame}
              >
                Ask for game
              </button>
            )}
            <button
              className="players-online__btn-start"
              onClick={handleBackToSearch}
            >
              Back to search
            </button>
          </div>
        </div>
      )}
    </LayoutOtherPages>
  );
};

export default PlayersOnline;
