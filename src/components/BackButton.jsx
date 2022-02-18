import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BackButton.scss';

const BackButton = ({ local }) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div
      className={local ? 'back-button back-button--local' : 'back-button'}
      onClick={handleGoBack}
    >
      <i className="fas fa-chevron-left"></i>
    </div>
  );
};

export default BackButton;
