import React from 'react';

// Gradually generates final text by revealing characters left-to-right
export default function TextGenerate({ text = 'Text Generate Effect', speed = 30, className = '' }) {
  const [show, setShow] = React.useState(0);
  React.useEffect(() => {
    let id = 0;
    const step = () => {
      setShow((s) => {
        if (s >= text.length) return s;
        id = setTimeout(step, speed);
        return s + 1;
      });
    };
    id = setTimeout(step, speed);
    return () => clearTimeout(id);
  }, [text, speed]);
  return (
    <span className={['tfx-generate', className].join(' ')}>
      <span aria-hidden="true">{text.slice(0, show)}</span>
      <span className="tfx-generate__cursor">▎</span>
    </span>
  );
}

