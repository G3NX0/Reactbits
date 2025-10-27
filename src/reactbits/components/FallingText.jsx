import React from 'react';

// FallingText: animasi teks jatuh per karakter dengan opsi stagger, jarak, durasi, dan rotasi acak.
export function FallingText({
  text = '',
  delay = 0,
  stagger = 40,
  duration = 700,
  distance = 24,
  randomness = 0, // ms jitter per item
  rotate = false, // random rotate per item
  as: Tag = 'span',
  className = '',
  ...props
}) {
  const tokens = React.useMemo(() => Array.from(String(text)), [text]);
  const classes = ['rb-fall', 'animate', rotate ? 'rotate' : '', className]
    .filter(Boolean)
    .join(' ');

  // Precompute jitter and rotation per item to keep stable across renders
  const meta = React.useMemo(
    () =>
      tokens.map(() => ({
        jitter: randomness ? (Math.random() * 2 - 1) * randomness : 0,
        rot: rotate ? (Math.random() * 24 - 12) : 0,
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [tokens.length, randomness, rotate]
  );

  const wrapperStyle = {
    ['--rb-fall-duration']: `${duration}ms`,
    ['--rb-fall-distance']: typeof distance === 'number' ? `${distance}px` : String(distance),
  };

  return (
    <Tag className={classes} style={wrapperStyle} {...props}>
      {tokens.map((ch, i) => (
        <span
          key={i}
          className="rb-fall__item"
          style={{
            ['--rb-fall-delay']: `${Math.max(0, delay + i * stagger + (meta[i]?.jitter || 0))}ms`,
            ['--rb-fall-rot']: `${meta[i]?.rot || 0}deg`,
          }}
        >
          {ch}
        </span>
      ))}
    </Tag>
  );
}

