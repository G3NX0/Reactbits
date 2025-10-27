import React from 'react';

// SlideNumber: odometer-style sliding digits
export default function SlideNumber({ value = 0, className = '' }) {
  const str = String(Math.floor(Math.abs(value)));
  return (
    <span className={['tfx-slidenum', className].join(' ')}>
      {Array.from(str).map((d, i) => (
        <Digit key={i} d={Number(d)} />
      ))}
    </span>
  );
}

function Digit({ d }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (ref.current) {
      ref.current.style.transform = `translateY(${-d * 1.2}em)`; // 10 rows * 1.2em line-height
    }
  }, [d]);
  return (
    <span className="tfx-slidenum__col">
      <span ref={ref} className="tfx-slidenum__roller">
        {[0,1,2,3,4,5,6,7,8,9].map((n) => (
          <span key={n} className="tfx-slidenum__cell">{n}</span>
        ))}
      </span>
    </span>
  );
}

