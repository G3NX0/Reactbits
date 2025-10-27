import React from 'react';

export function Tabs({ tabs = [], defaultId, onChange }) {
  const firstId = React.useMemo(() => defaultId || (tabs[0] && tabs[0].id), [defaultId, tabs]);
  const [active, setActive] = React.useState(firstId);

  React.useEffect(() => {
    if (!active && firstId) setActive(firstId);
  }, [active, firstId]);

  const current = tabs.find((t) => t.id === active) || tabs[0];

  const handleChange = (id) => {
    setActive(id);
    onChange?.(id);
  };

  return (
    <div className="rb-tabs">
      <div className="rb-tabs__list" role="tablist">
        {tabs.map((t) => (
          <button
            key={t.id}
            role="tab"
            className={["rb-tabs__tab", active === t.id ? 'active' : ''].join(' ')}
            aria-selected={active === t.id}
            onClick={() => handleChange(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="rb-tabs__panel" role="tabpanel">
        {current?.content}
      </div>
    </div>
  );
}

