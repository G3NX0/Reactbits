import React, { useEffect } from 'react';

export function Modal({ open, onClose, title, children }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose?.();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="rb-modal-overlay" onClick={onClose}>
      <div className="rb-modal" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
        <div className="rb-modal__header">
          {title && <h3 className="rb-modal__title">{title}</h3>}
          <button className="rb-modal__close" aria-label="Close" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="rb-modal__body">{children}</div>
      </div>
    </div>
  );
}

