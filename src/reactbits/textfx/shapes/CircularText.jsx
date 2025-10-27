import React from 'react';

export default function CircularText({ text = 'Circular Text', radius = 60, className = '', animate = false }) {
  const pathId = React.useMemo(
    () => `tfx-circle-${Math.random().toString(36).slice(2, 9)}`,
    []
  );
  const size = radius * 2 + 10;
  const circumference = 2 * Math.PI * radius;
  const textStyle = animate ? { animation: 'tfx-circle-spin 12s linear infinite' } : undefined;

  return (
    <svg
      className={['tfx-circular', className].filter(Boolean).join(' ')}
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
    >
      <defs>
        <path
          id={pathId}
          d={`M ${radius + 5},${radius + 5} m -${radius},0 a ${radius},${radius} 0 1,1 ${radius * 2},0 a ${radius},${radius} 0 1,1 -${radius * 2},0`}
        />
      </defs>
      <text dy="5" style={textStyle}>
        <textPath href={`#${pathId}`} startOffset="0%" textLength={circumference}>
          {text}
        </textPath>
      </text>
    </svg>
  );
}
