import React from 'react';

export default function HoverText({ text = 'Text Hover Effect', className = '' }) {
  return <span className={['tfx-hover', className].join(' ')}>{text}</span>;
}

