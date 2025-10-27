import React from 'react';

export default function RevealText({ text = 'Text Reveal', direction = 'x', className = '' }) {
  const cls = ['tfx-reveal', direction === 'y' ? 'y' : 'x', className].join(' ');
  return <span className={cls}>{text}</span>;
}

