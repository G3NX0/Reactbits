import React from 'react';

export default function HighlightText({ text = 'Highlight Text', color = 'var(--primary)', className = '' }) {
  const style = { ['--tfx-highlight-color']: color };
  return <span className={['tfx-highlight', className].join(' ')} style={style}>{text}</span>;
}

