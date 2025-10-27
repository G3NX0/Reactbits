import React from 'react';

export default function GradientText({ text = 'Gradient Text', from = '#60a5fa', to = '#a78bfa', animate = false, className = '' }) {
  const style = { ['--tfx-grad-from']: from, ['--tfx-grad-to']: to };
  return <span className={['tfx-gradient', animate ? 'animate' : '', className].join(' ')} style={style}>{text}</span>;
}

