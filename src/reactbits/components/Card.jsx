import React from 'react';

export function Card({ title, footer, children, className = '' }) {
  return (
    <div className={["rb-card", className].filter(Boolean).join(' ')}>
      {title && (
        <div className="rb-card__header">
          <h3 className="rb-card__title">{title}</h3>
        </div>
      )}
      <div className="rb-card__body">{children}</div>
      {footer && <div className="rb-card__footer">{footer}</div>}
    </div>
  );
}

