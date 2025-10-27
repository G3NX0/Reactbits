import React from 'react';

export default function ScrollVelocityText({ text = 'Scroll Velocity Text', className = '' }) {
  const ref = React.useRef(null);
  const vel = React.useRef(0);
  React.useEffect(() => {
    let lastY = window.scrollY;
    let raf = 0;
    const onScroll = () => {
      const y = window.scrollY;
      vel.current = (y - lastY);
      lastY = y;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const tick = () => {
      raf = 0;
      const v = Math.max(-40, Math.min(40, vel.current));
      ref.current?.style.setProperty('--tfx-scroll-v', `${v}`);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return <span ref={ref} className={['tfx-scrollvel', className].join(' ')}>{text}</span>;
}

