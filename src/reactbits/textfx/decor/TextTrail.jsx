import React from 'react';

export default function TextTrail({ text = 'Text Trail Effect', className = '' }) {
  return <span className={['tfx-trail', className].join(' ')} data-text={text}>{text}</span>;
}

