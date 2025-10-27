import React from 'react';

export default function RotatingText({ words = ['Reactbits', 'Rotating', 'Text'], interval = 1500, className = '' }) {
  const [i, setI] = React.useState(0);
  React.useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % words.length), interval);
    return () => clearInterval(id);
  }, [words.length, interval]);
  return (
    <span className={['tfx-rotating', className].join(' ')}>
      {words.map((w, idx) => (
        <span key={idx} className={['tfx-rotating__item', idx === i ? 'active' : ''].join(' ')}>{w}</span>
      ))}
    </span>
  );
}

