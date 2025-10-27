import React from 'react';

// Typewriter with blinking cursor and optional looping.
export function Typewriter({
  words = ['Reactbits Typewriter'],
  loop = false,
  typingSpeed = 80,
  deleteSpeed = 40,
  pauseBetween = 1000,
  startDelay = 0,
  cursor = 'bar', // 'bar' | 'block'
  blink = true,
  as: Tag = 'span',
  className = '',
  onFinished,
  ...props
}) {
  const list = React.useMemo(() => (Array.isArray(words) ? words : [String(words)]), [words]);
  const [started, setStarted] = React.useState(startDelay === 0);
  const [idx, setIdx] = React.useState(0);
  const [subIdx, setSubIdx] = React.useState(0);
  const [deleting, setDeleting] = React.useState(false);
  const [done, setDone] = React.useState(false);

  // Handle start delay
  React.useEffect(() => {
    if (started) return;
    const t = setTimeout(() => setStarted(true), startDelay);
    return () => clearTimeout(t);
  }, [started, startDelay]);

  // Typing loop
  React.useEffect(() => {
    if (!started) return;
    if (done) return;
    const current = list[idx % list.length] ?? '';

    // Determine next action
    if (!deleting && subIdx === current.length) {
      if (!loop && list.length === 1) {
        setDone(true);
        onFinished?.();
        return;
      }
      const t = setTimeout(() => setDeleting(true), pauseBetween);
      return () => clearTimeout(t);
    }

    if (deleting && subIdx === 0) {
      setDeleting(false);
      setIdx((v) => (v + 1) % list.length);
      return;
    }

    const speed = deleting ? deleteSpeed : typingSpeed;
    const t = setTimeout(() => {
      setSubIdx((v) => v + (deleting ? -1 : 1));
    }, Math.max(0, speed));
    return () => clearTimeout(t);
  }, [started, list, idx, subIdx, deleting, loop, typingSpeed, deleteSpeed, pauseBetween, onFinished, done]);

  const text = list[idx % list.length] ?? '';
  const shown = text.slice(0, Math.max(0, subIdx));

  const classes = ['rb-typewriter', className].filter(Boolean).join(' ');
  const caretCls = ['rb-caret', cursor, blink ? 'blink' : 'no-blink'].join(' ');

  return (
    <Tag className={classes} {...props}>
      <span className="rb-typewriter__text">{shown}</span>
      <span aria-hidden="true" className={caretCls} />
    </Tag>
  );
}

