import React from 'react';

export default function FlipWords({ words = ['Flip', 'Those', 'Words'], interval = 1600, className = '' }) {
  const [i, setI] = React.useState(0);
  React.useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % words.length), interval);
    return () => clearInterval(id);
  }, [words.length, interval]);
  return (
    <span className={['tfx-flip', className].join(' ')}>
      <span className="tfx-flip__inner">
        {words.map((w, idx) => (
          <span key={idx} className={["tfx-flip__item", idx === i ? 'active' : ''].join(' ')}>{w}</span>
        ))}
      </span>
    </span>
  );
}
