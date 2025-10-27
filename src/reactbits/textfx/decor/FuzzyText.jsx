import React from 'react';

export default function FuzzyText({ text = 'Fuzzy Text', className = '' }) {
  return <span className={['tfx-fuzzy', className].join(' ')}>{text}</span>;
}

