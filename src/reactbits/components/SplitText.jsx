import React from 'react';

// SplitText: animasi teks ter-split per karakter/kat a dengan stagger.
// Opsi: by ('chars' | 'words'), variant ('fade-up' | 'fade-in'),
// delay awal, stagger per item, durasi, dan trigger saat onView (IntersectionObserver).
export function SplitText({
  text = '',
  by = 'chars',
  variant = 'fade-up',
  delay = 0,
  stagger = 30,
  duration = 600,
  onView = false,
  once = true,
  as: Tag = 'span',
  className = '',
  ...props
}) {
  const ref = React.useRef(null);
  const [animate, setAnimate] = React.useState(!onView);

  React.useEffect(() => {
    if (!onView || !ref.current) return;
    if (typeof IntersectionObserver === 'undefined') {
      setAnimate(true);
      return;
    }
    const el = ref.current;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setAnimate(true);
            if (once) obs.disconnect();
          } else if (!once) {
            setAnimate(false);
          }
        });
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [onView, once]);

  const tokens = React.useMemo(() => {
    if (by === 'words') return String(text).split(/(\s+)/);
    return Array.from(String(text));
  }, [text, by]);

  const classes = ['rb-split', variant, animate ? 'animate' : '', className]
    .filter(Boolean)
    .join(' ');

  const style = {
    whiteSpace: 'pre-wrap',
    ['--rb-split-duration']: `${duration}ms`,
  };

  return (
    <Tag ref={ref} className={classes} style={style} {...props}>
      {tokens.map((t, i) => (
        <span
          key={i}
          className="rb-split__item"
          style={{ ['--rb-split-delay']: `${delay + i * stagger}ms` }}
        >
          {t}
        </span>
      ))}
    </Tag>
  );
}
