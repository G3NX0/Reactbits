import React from 'react';

export default function LineShadowText({ text = 'Line Shadow Text', className = '' }) {
  return <span className={['tfx-lineshadow', className].join(' ')}>{text}</span>;
}

