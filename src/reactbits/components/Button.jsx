import React from 'react';

export function Button({ variant = 'primary', size = 'md', className = '', ...props }) {
  const cls = ['rb-btn', variant, size, className].filter(Boolean).join(' ');
  return <button className={cls} {...props} />;
}

