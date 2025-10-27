import React from 'react';

// Physics-based Falling Text using Matter.js (dynamic import).
// If matter-js is unavailable, falls back to static display with a hint.
export function FallingTextPhysics({
  text = '',
  highlightWords = [],
  highlightClass = 'rb-ft-highlight',
  trigger = 'auto', // 'auto' | 'scroll' | 'click' | 'hover'
  backgroundColor = 'transparent',
  wireframes = false,
  gravity = 1,
  mouseConstraintStiffness = 0.2,
  fontSize = '1rem',
  className = '',
  style,
}) {
  const containerRef = React.useRef(null);
  const textRef = React.useRef(null);
  const canvasContainerRef = React.useRef(null);
  const [effectStarted, setEffectStarted] = React.useState(false);
  const [available, setAvailable] = React.useState(true);

  // Render words normally first so we can measure positions
  const words = React.useMemo(() => String(text).split(/(\s+)/), [text]);

  const isHighlighted = React.useCallback(
    (word) => highlightWords.some((hw) => word && word.startsWith(hw)),
    [highlightWords]
  );

  // Trigger handling
  React.useEffect(() => {
    if (trigger === 'auto') {
      setEffectStarted(true);
      return;
    }
    if (trigger === 'scroll' && containerRef.current) {
      if (typeof IntersectionObserver === 'undefined') {
        setEffectStarted(true);
        return;
      }
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setEffectStarted(true);
            obs.disconnect();
          }
        },
        { threshold: 0.1 }
      );
      obs.observe(containerRef.current);
      return () => obs.disconnect();
    }
  }, [trigger]);

  // Matter.js setup when started
  React.useEffect(() => {
    let cancelled = false;
    let cleanup = null;
    if (!effectStarted) return;

    (async () => {
      let Matter;
      try {
        const M = await import('matter-js');
        Matter = M && (M.default ? M.default : M);
      } catch (e) {
        setAvailable(false);
        return;
      }
      if (cancelled) return;
      if (!containerRef.current || !canvasContainerRef.current || !textRef.current) return;

      const { Engine, Render, World, Bodies, Runner, Mouse, MouseConstraint, Body } = Matter;

      // compute container size; ensure a sensible height
      const containerRect = containerRef.current.getBoundingClientRect();
      const width = Math.max(10, containerRect.width);
      const height = Math.max(10, containerRect.height);

      const engine = Engine.create();
      engine.world.gravity.y = gravity;

      const render = Render.create({
        element: canvasContainerRef.current,
        engine,
        options: {
          width,
          height,
          background: backgroundColor,
          wireframes,
        },
      });

      // boundaries
      const boundaryOptions = { isStatic: true, render: { fillStyle: 'transparent' } };
      const floor = Bodies.rectangle(width / 2, height + 25, width + 100, 50, boundaryOptions);
      const leftWall = Bodies.rectangle(-25, height / 2, 50, height + 100, boundaryOptions);
      const rightWall = Bodies.rectangle(width + 25, height / 2, 50, height + 100, boundaryOptions);
      const ceiling = Bodies.rectangle(width / 2, -25, width + 100, 50, boundaryOptions);

      // map words to bodies
      const wordSpans = textRef.current.querySelectorAll('.rb-ft-word');
      const wordBodies = Array.from(wordSpans).map((elem) => {
        const rect = elem.getBoundingClientRect();
        const x = rect.left - containerRect.left + rect.width / 2;
        const y = rect.top - containerRect.top + rect.height / 2;

        const body = Bodies.rectangle(x, y, Math.max(1, rect.width), Math.max(1, rect.height), {
          render: { fillStyle: 'transparent' },
          restitution: 0.8,
          frictionAir: 0.01,
          friction: 0.2,
        });
        Body.setVelocity(body, { x: (Math.random() - 0.5) * 5, y: 0 });
        Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.05);
        return { elem, body };
      });

      // absolutize spans and place at body centers
      wordBodies.forEach(({ elem, body }) => {
        elem.style.position = 'absolute';
        elem.style.left = `${body.position.x}px`;
        elem.style.top = `${body.position.y}px`;
        elem.style.transform = 'translate(-50%, -50%)';
      });

      const mouse = Mouse.create(containerRef.current);
      const mouseConstraint = MouseConstraint.create(engine, {
        mouse,
        constraint: { stiffness: mouseConstraintStiffness, render: { visible: false } },
      });
      render.mouse = mouse;

      World.add(engine.world, [floor, leftWall, rightWall, ceiling, mouseConstraint, ...wordBodies.map((w) => w.body)]);

      const runner = Runner.create();
      Runner.run(runner, engine);
      Render.run(render);

      let rafId = 0;
      const update = () => {
        wordBodies.forEach(({ body, elem }) => {
          const { x, y } = body.position;
          elem.style.left = `${x}px`;
          elem.style.top = `${y}px`;
          elem.style.transform = `translate(-50%, -50%) rotate(${body.angle}rad)`;
        });
        rafId = requestAnimationFrame(update);
      };
      update();

      cleanup = () => {
        cancelAnimationFrame(rafId);
        Render.stop(render);
        Runner.stop(runner);
        if (render.canvas && canvasContainerRef.current) {
          canvasContainerRef.current.removeChild(render.canvas);
        }
        World.clear(engine.world, false);
        Engine.clear(engine);
      };
    })();

    return () => {
      cancelled = true;
      if (typeof cleanup === 'function') cleanup();
    };
  }, [effectStarted, backgroundColor, gravity, wireframes, mouseConstraintStiffness, text, highlightWords, highlightClass]);

  const handleTrigger = () => {
    if (!effectStarted && (trigger === 'click' || trigger === 'hover')) {
      setEffectStarted(true);
    }
  };

  const classes = ['rb-ft-container', className].filter(Boolean).join(' ');

  return (
    <div
      ref={containerRef}
      className={classes}
      onClick={trigger === 'click' ? handleTrigger : undefined}
      onMouseEnter={trigger === 'hover' ? handleTrigger : undefined}
      style={{ position: 'relative', overflow: 'hidden', ...style }}
    >
      <div
        ref={textRef}
        className="rb-ft-target"
        style={{ fontSize, lineHeight: 1.4 }}
      >
        {words.map((w, i) => (
          w.trim() === '' ? (
            ' '
          ) : (
            <span
              key={i}
              className={[
                'rb-ft-word',
                isHighlighted(w) ? highlightClass : '',
              ].join(' ')}
            >
              {w}
            </span>
          )
        ))}
      </div>
      <div ref={canvasContainerRef} className="rb-ft-canvas" />
      {!available && (
        <div className="rb-ft-hint">matter-js belum terpasang. Jalankan: npm i matter-js</div>
      )}
    </div>
  );
}
