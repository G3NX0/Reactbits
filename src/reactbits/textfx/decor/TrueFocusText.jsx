import React from 'react';

export default function TrueFocusText({ text = 'True Focus Effect', className = '' }) {
  const ref = React.useRef(null);
  const onMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ref.current.style.setProperty('--tfx-focus-x', `${x}px`);
    ref.current.style.setProperty('--tfx-focus-y', `${y}px`);
  };
  return <span ref={ref} className={['tfx-focus', className].join(' ')} onMouseMove={onMove} data-text={text}>{text}</span>;
}
