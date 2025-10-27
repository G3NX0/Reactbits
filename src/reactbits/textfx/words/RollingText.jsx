import React from 'react';

// RollingText: slot-machine like reveal per character
export default function RollingText({ text = 'Rolling Text', duration = 800, className = '' }) {
  const tokens = React.useMemo(() => Array.from(String(text)), [text]);
  return (
    <span className={['tfx-rolling', className].join(' ')} style={{ ['--tfx-roll-duration']: `${duration}ms` }}>
      {tokens.map((ch, i) => (
        <span key={i} className="tfx-rolling__ch" style={{ ['--i']: i }}>{ch}</span>
      ))}
    </span>
  );
}

