import React from 'react';

export default function ContainerFlip({ front = 'Front', back = 'Back', className = '' }) {
  return (
    <span className={['tfx-cflip', className].join(' ')}>
      <span className="tfx-cflip__inner">
        <span className="tfx-cflip__face tfx-cflip__front">{front}</span>
        <span className="tfx-cflip__face tfx-cflip__back">{back}</span>
      </span>
    </span>
  );
}

