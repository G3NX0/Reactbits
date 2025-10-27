import React from 'react';

const CHARS = '!@#$%^&*()_+{}[]<>/?|~-=;:,.';

export default function DecryptedText({ text = 'Decrypted Text Effect', speed = 25, step = 2, className = '' }) {
  const [out, setOut] = React.useState('');
  React.useEffect(() => {
    let i = 0;
    let id = 0;
    const run = () => {
      i += step;
      const progress = Math.min(text.length, i);
      const stable = text.slice(0, progress);
      const rest = text.slice(progress).split('').map(()=> CHARS[(Math.random()*CHARS.length)|0]).join('');
      setOut(stable + rest);
      if (progress < text.length) id = setTimeout(run, speed);
    };
    id = setTimeout(run, speed);
    return () => clearTimeout(id);
  }, [text, speed, step]);
  return <span className={['tfx-decrypted', className].join(' ')}>{out}</span>;
}

