import React from 'react';

export default function ShimmerText({ text = 'Shimmering Text', className = '' }) {
  return <span className={['tfx-shimmer', className].join(' ')}>{text}</span>;
}

