import React from 'react';

export default function ProximityText({ text = 'Variable Proximity Text', radius = 160, className = '' }) {
  const ref = React.useRef(null);
  const onMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ref.current.style.setProperty('--tfx-prox-x', `${x}px`);
    ref.current.style.setProperty('--tfx-prox-y', `${y}px`);
    ref.current.style.setProperty('--tfx-prox-r', `${radius}px`);
  };
  return (
    <span ref={ref} className={['tfx-proximity', className].join(' ')} onMouseMove={onMove}>{text}</span>
  );
}

