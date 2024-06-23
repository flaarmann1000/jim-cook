import React from 'react';
import '../styles/styles.css';

const RotatingEmoji = ({ emoji }) => {
  return (
    <div className="rotating-emoji">
      {emoji}
    </div>
  );
};

export default RotatingEmoji;
