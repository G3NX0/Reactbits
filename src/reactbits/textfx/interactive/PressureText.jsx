import React from 'react';

export default function PressureText({ text = 'Text Pressure Effect', className = '' }) {
  const [press, setPress] = React.useState(0);
  React.useEffect(() => {
    let id;
    if (press > 0) {
      id = setInterval(() => setPress((p) => Math.max(0, p - 1)), 40);
    }
    return () => clearInterval(id);
  }, [press]);
  return (
    <span
      className={['tfx-pressure', className].join(' ')}
      style={{ ['--tfx-pressure']: press }}
      onMouseDown={() => setPress(20)}
    >
      {text}
    </span>
  );
}

