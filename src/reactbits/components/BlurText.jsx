import React from 'react';

// BlurText: teks diblur hingga di-reveal (controlled via `revealed`),
// atau bisa auto-reveal saat hover dengan `revealOnHover`.
export function BlurText({
  children,
  revealed = false,
  blur = 6, // bisa number (px) atau string CSS, contoh: '0.5rem'
  revealOnHover = false,
  as: Tag = 'span',
  className = '',
  ...props
}) {
  const classes = [
    'rb-blur-text',
    revealed ? 'revealed' : '',
    revealOnHover ? 'hover-reveal' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const style = {
    ['--rb-blur-amount']: typeof blur === 'number' ? `${blur}px` : blur,
  };

  return (
    <Tag className={classes} style={style} {...props}>
      {children}
    </Tag>
  );
}

