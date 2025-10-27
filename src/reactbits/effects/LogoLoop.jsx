import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import './LogoLoop.css';

// Item can be a custom node or an image descriptor
// See usage in App for examples.

const ANIMATION_CONFIG = {
  SMOOTH_TAU: 0.25,
  MIN_COPIES: 2,
  COPY_HEADROOM: 2,
};

const toCssLength = (value) => (typeof value === 'number' ? `${value}px` : value ?? undefined);

function useResizeObserver(callback, elements, dependencies) {
  useEffect(() => {
    if (!window.ResizeObserver) {
      const handle = () => callback();
      window.addEventListener('resize', handle);
      callback();
      return () => window.removeEventListener('resize', handle);
    }
    const observers = elements.map((ref) => {
      if (!ref.current) return null;
      const ro = new ResizeObserver(() => callback());
      ro.observe(ref.current);
      return ro;
    });
    callback();
    return () => observers.forEach((ro) => ro?.disconnect());
  }, dependencies);
}

function useImageLoader(seqRef, onLoad, dependencies) {
  useEffect(() => {
    const images = seqRef.current?.querySelectorAll('img') ?? [];
    if (images.length === 0) {
      onLoad();
      return;
    }
    let remaining = images.length;
    const done = () => {
      remaining -= 1;
      if (remaining === 0) onLoad();
    };
    images.forEach((img) => {
      const el = img;
      if (el.complete) done();
      else {
        el.addEventListener('load', done, { once: true });
        el.addEventListener('error', done, { once: true });
      }
    });
    return () => {
      images.forEach((img) => {
        img.removeEventListener('load', done);
        img.removeEventListener('error', done);
      });
    };
  }, dependencies);
}

function useAnimationLoop(trackRef, targetVelocity, seqWidth, isHovered, pauseOnHover) {
  const rafRef = useRef(null);
  const lastTsRef = useRef(null);
  const offsetRef = useRef(0);
  const velocityRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    if (seqWidth > 0) {
      offsetRef.current = ((offsetRef.current % seqWidth) + seqWidth) % seqWidth;
      track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
    }

    const animate = (ts) => {
      if (lastTsRef.current == null) lastTsRef.current = ts;
      const dt = Math.max(0, ts - lastTsRef.current) / 1000;
      lastTsRef.current = ts;

      const target = pauseOnHover && isHovered ? 0 : targetVelocity;
      const easing = 1 - Math.exp(-dt / ANIMATION_CONFIG.SMOOTH_TAU);
      velocityRef.current += (target - velocityRef.current) * easing;

      if (seqWidth > 0) {
        let next = offsetRef.current + velocityRef.current * dt;
        next = ((next % seqWidth) + seqWidth) % seqWidth;
        offsetRef.current = next;
        track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      lastTsRef.current = null;
    };
  }, [targetVelocity, seqWidth, isHovered, pauseOnHover]);
}

const LogoLoop = React.memo(function LogoLoop({
  logos,
  speed = 120,
  direction = 'left',
  width = '100%',
  logoHeight = 28,
  gap = 32,
  pauseOnHover = true,
  fadeOut = false,
  fadeOutColor,
  scaleOnHover = false,
  ariaLabel = 'Partner logos',
  className,
  style,
}) {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const seqRef = useRef(null);

  const [seqWidth, setSeqWidth] = useState(0);
  const [copyCount, setCopyCount] = useState(ANIMATION_CONFIG.MIN_COPIES);
  const [isHovered, setIsHovered] = useState(false);

  const targetVelocity = useMemo(() => {
    const mag = Math.abs(speed);
    const dirMul = direction === 'left' ? 1 : -1;
    const sign = speed < 0 ? -1 : 1;
    return mag * dirMul * sign;
  }, [speed, direction]);

  const updateDims = useCallback(() => {
    const cw = containerRef.current?.clientWidth ?? 0;
    const sw = seqRef.current?.getBoundingClientRect?.().width ?? 0;
    if (sw > 0) {
      const s = Math.ceil(sw);
      setSeqWidth(s);
      const copies = Math.ceil(cw / s) + ANIMATION_CONFIG.COPY_HEADROOM;
      setCopyCount(Math.max(ANIMATION_CONFIG.MIN_COPIES, copies));
    }
  }, []);

  useResizeObserver(updateDims, [containerRef, seqRef], [logos, gap, logoHeight]);
  useImageLoader(seqRef, updateDims, [logos, gap, logoHeight]);
  useAnimationLoop(trackRef, targetVelocity, seqWidth, isHovered, pauseOnHover);

  const cssVars = useMemo(
    () => ({
      '--logoloop-gap': `${gap}px`,
      '--logoloop-logoHeight': `${logoHeight}px`,
      ...(fadeOutColor ? { '--logoloop-fadeColor': fadeOutColor } : {}),
    }),
    [gap, logoHeight, fadeOutColor]
  );

  const rootCls = useMemo(
    () => [
      'logoloop',
      fadeOut && 'logoloop--fade',
      scaleOnHover && 'logoloop--scale-hover',
      className,
    ].filter(Boolean).join(' '),
    [fadeOut, scaleOnHover, className]
  );

  const onEnter = useCallback(() => { if (pauseOnHover) setIsHovered(true); }, [pauseOnHover]);
  const onLeave = useCallback(() => { if (pauseOnHover) setIsHovered(false); }, [pauseOnHover]);

  const renderLogoItem = useCallback((item, key) => {
    const isNode = Object.prototype.hasOwnProperty.call(item, 'node');
    const content = isNode ? (
      <span className="logoloop__node" aria-hidden={!!item.href && !item.ariaLabel}>{item.node}</span>
    ) : (
      <img
        src={item.src}
        srcSet={item.srcSet}
        sizes={item.sizes}
        width={item.width}
        height={item.height}
        alt={item.alt ?? ''}
        title={item.title}
        loading="lazy"
        decoding="async"
        draggable={false}
      />
    );
    const itemAriaLabel = isNode ? (item.ariaLabel ?? item.title) : (item.alt ?? item.title);
    const inner = item.href ? (
      <a className="logoloop__link" href={item.href} aria-label={itemAriaLabel || 'logo link'} target="_blank" rel="noreferrer noopener">{content}</a>
    ) : content;
    return (<li className="logoloop__item" key={key} role="listitem">{inner}</li>);
  }, []);

  const logoLists = useMemo(() => (
    Array.from({ length: copyCount }, (_, i) => (
      <ul className="logoloop__list" key={`copy-${i}`} role="list" aria-hidden={i > 0} ref={i === 0 ? seqRef : undefined}>
        {logos.map((item, idx) => renderLogoItem(item, `${i}-${idx}`))}
      </ul>
    ))
  ), [copyCount, logos, renderLogoItem]);

  const containerStyle = useMemo(() => ({ width: toCssLength(width) ?? '100%', ...cssVars, ...style }), [width, cssVars, style]);

  return (
    <div ref={containerRef} className={rootCls} style={containerStyle} role="region" aria-label={ariaLabel} onMouseEnter={onEnter} onMouseLeave={onLeave}>
      <div className="logoloop__track" ref={trackRef}>
        {logoLists}
      </div>
    </div>
  );
});

LogoLoop.displayName = 'LogoLoop';

export default LogoLoop;

