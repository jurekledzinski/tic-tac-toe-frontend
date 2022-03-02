import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './MultiplayerAddName.scss';

import { StoreContext } from '../store/Store';

import BackButton from './BackButton';
import LayoutOtherPages from './LayoutOtherPages';
import MessageAlert from './MessageAlert';

import { addMultiPlayerGame } from '../axios/sessions';

import useBack from '../customHooks/useBack';

const MultiplayerAddName = () => {
  useBack();
  const navigate = useNavigate();
  const { stateGame, socket } = useContext(StoreContext);
  const [email1, setEmail1] = useState('');
  const [namePlayer1, setNamePlayer1] = useState('');
  const [message, setMessage] = useState('');
  const [placeValue1, setPlaceValue1] = useState('Your name ...');
  const [placeValue2, setPlaceValue2] = useState('Your email ...');
  const idTimeout1 = useRef(null);
  const isMount = useRef(true);

  const handleSearchUsers = async () => {
    if (namePlayer1.match(/^\s*$/)) return;

    const dataForm = {
      email: email1,
      name: namePlayer1,
      option: stateGame.option,
      idSocket: socket.id,
    };

    const { data, status } = await addMultiPlayerGame(dataForm);

    if (status === 200) {
      socket?.emit('join', data.result.id);
      sessionStorage.setItem('id', JSON.stringify(data.result.id));
      sessionStorage.setItem('name', JSON.stringify(data.result.name));
      navigate('/players-online');
    } else {
      setMessage(data.message);
      idTimeout1.current = setTimeout(() => setMessage(''), 1000);
    }
  };

  useEffect(() => {
    return () => {
      clearTimeout(idTimeout1.current);
      isMount.current = false;
    };
  }, []);

  useEffect(() => {
    socket?.on('disconnect', () => {
      socket?.connect();
    });
  }, [socket]);

  return (
    <LayoutOtherPages>
      <div className="multiplayer-name-page">
        <BackButton />
        <div className="multiplayer-name-page__wrapper">
          <h4 className="multiplayer-name-page__title">Add player</h4>
          {message && <MessageAlert message={message} />}
          <input
            type="text"
            className="multiplayer-name-page__input"
            placeholder={placeValue1}
            onBlur={() => setPlaceValue1('Your name ...')}
            onFocus={() => setPlaceValue1('')}
            onChange={(e) => setNamePlayer1(e.target.value)}
            value={namePlayer1}
          />
          <input
            type="text"
            className="multiplayer-name-page__input"
            placeholder={placeValue2}
            onBlur={() => setPlaceValue2('Your email ...')}
            onFocus={() => setPlaceValue2('')}
            onChange={(e) => setEmail1(e.target.value)}
            value={email1}
          />
          <button
            className="multiplayer-name-page__search"
            onClick={handleSearchUsers}
          >
            Search players
          </button>
        </div>
      </div>
    </LayoutOtherPages>
  );
};
export default MultiplayerAddName;
