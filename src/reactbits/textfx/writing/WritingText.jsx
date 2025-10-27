import React from 'react';

// WritingText: reveals a stroked text from left-to-right like handwriting.
export default function WritingText({ text = 'Writing Text', stroke = true, duration = 1500, delay = 0, className = '' }) {
  const cls = ['tfx-writing', stroke ? 'stroke' : '', className].filter(Boolean).join(' ');
  const style = { ['--tfx-writing-duration']: `${duration}ms`, ['--tfx-writing-delay']: `${delay}ms` };
  return (
    <span className={cls} style={style}>{text}</span>
  );
}

