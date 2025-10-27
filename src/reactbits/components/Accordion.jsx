import React from 'react';

export function Accordion({ items = [] }) {
  const [openId, setOpenId] = React.useState(null);
  const toggle = (id) => setOpenId((cur) => (cur === id ? null : id));

  return (
    <div className="rb-accordion">
      {items.map((it) => {
        const open = openId === it.id;
        return (
          <div key={it.id} className={["rb-accordion__item", open ? 'open' : ''].join(' ')}>
            <button className="rb-accordion__header" onClick={() => toggle(it.id)} aria-expanded={open}>
              <span>{it.title}</span>
              <span className="rb-accordion__chev">{open ? '▾' : '▸'}</span>
            </button>
            {open && <div className="rb-accordion__panel">{it.content}</div>}
          </div>
        );
      })}
    </div>
  );
}

