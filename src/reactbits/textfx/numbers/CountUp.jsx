import React from 'react';

export default function CountUp({ from = 0, to = 100, duration = 1200, decimals = 0, formatter, className = '' }) {
  const [val, setVal] = React.useState(from);
  React.useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (t) => {
      const p = Math.min(1, (t - start) / duration);
      const n = from + (to - from) * easeOutCubic(p);
      setVal(n);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [from, to, duration]);
  const text = formatter ? formatter(val) : val.toFixed(decimals);
  return <span className={['tfx-count', className].join(' ')}>{text}</span>;
}

function easeOutCubic(x) {
  return 1 - Math.pow(1 - x, 3);
}

