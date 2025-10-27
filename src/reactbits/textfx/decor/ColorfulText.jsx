import React from 'react';

export default function ColorfulText({ text = 'Colourful Text', className = '' }) {
  const tokens = Array.from(String(text));
  return (
    <span className={['tfx-colorful', className].join(' ')}>
      {tokens.map((ch, i) => (
        <span key={i} style={{ ['--h']: (i * 25) % 360 }}>{ch}</span>
      ))}
    </span>
  );
}

