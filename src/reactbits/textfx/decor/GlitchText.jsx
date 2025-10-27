import React from 'react';

export default function GlitchText({ text = 'Glitch Text', className = '' }) {
  return (
    <span className={['tfx-glitch', className].join(' ')} data-text={text}>{text}</span>
  );
}

