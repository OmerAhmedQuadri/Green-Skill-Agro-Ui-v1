import React from 'react';
import logoImg from '../assets/logo.png';

export const Logo = ({ height = 36, className = '', style = {} }) => {
  return (
    <div 
      className={`logo-container ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        padding: '2px 6px',
        borderRadius: '6px',
        boxShadow: '0 1px 4px rgba(0, 0, 0, 0.12)',
        flexShrink: 0,
        maxWidth: '100%',
        boxSizing: 'border-box',
        overflow: 'hidden',
        ...style
      }}
    >
      <img
        src={logoImg}
        alt="Green Skill Agro"
        style={{
          height: `${height}px`,
          width: 'auto',
          maxWidth: '100%',
          objectFit: 'cover',
          display: 'block',
          clipPath: 'inset(14% 15% 14% 15%)',
          transform: 'scale(1.35)',
          transformOrigin: 'center'
        }}
      />
    </div>
  );
};

