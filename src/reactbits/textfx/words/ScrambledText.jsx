import React from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$%#@!&*+-=?';

export default function ScrambledText({ text = 'Scrambled Text', speed = 40, className = '' }) {
  const [out, setOut] = React.useState(text);
  React.useEffect(() => {
    let id = 0;
    const tick = () => {
      setOut((_) => text.split('').map((ch, i) => (Math.random() < 0.2 ? ch : CHARS[(Math.random()*CHARS.length)|0])).join(''));
      id = setTimeout(tick, speed);
    };
    id = setTimeout(tick, speed);
    return () => clearTimeout(id);
  }, [text, speed]);
  return <span className={['tfx-scrambled', className].join(' ')}>{out}</span>;
}

