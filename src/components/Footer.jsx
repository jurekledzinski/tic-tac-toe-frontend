import React from 'react';

const styles = {
  position: 'absolute',
  bottom: '20px',
  color: '#e1e1e1',
  fontSize: '1.4rem',
};

const Footer = () => {
  return (
    <p className="footer" style={styles}>
      Tic Tac Toe &copy; {new Date().getFullYear()}
    </p>
  );
};

export default Footer;
