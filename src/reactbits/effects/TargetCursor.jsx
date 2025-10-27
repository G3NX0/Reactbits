import React, { useEffect, useRef, useCallback, useMemo } from 'react';
import { gsap } from 'gsap';
import './TargetCursor.css';

export default function TargetCursor({
  targetSelector = '.cursor-target',
  spinDuration = 2,
  hideDefaultCursor = true,
}) {
  const cursorRef = useRef(null);
  const cornersRef = useRef(null);
  const spinTl = useRef(null);
  const dotRef = useRef(null);

  const constants = useMemo(
    () => ({ borderWidth: 3, cornerSize: 12, parallaxStrength: 0.00005 }),
    []
  );

  const moveCursor = useCallback((x, y) => {
    if (!cursorRef.current) return;
    gsap.to(cursorRef.current, { x, y, duration: 0.1, ease: 'power3.out' });
  }, []);

  useEffect(() => {
    if (!cursorRef.current) return;

    const originalCursor = document.body.style.cursor;
    if (hideDefaultCursor) document.body.style.cursor = 'none';

    const cursor = cursorRef.current;
    cornersRef.current = cursor.querySelectorAll('.target-cursor-corner');

    let activeTarget = null;
    let currentTargetMove = null;
    let currentLeaveHandler = null;
    let isAnimatingToTarget = false;
    let resumeTimeout = null;

    const cleanupTarget = (target) => {
      if (!target) return;
      if (currentTargetMove) target.removeEventListener('mousemove', currentTargetMove);
      if (currentLeaveHandler) target.removeEventListener('mouseleave', currentLeaveHandler);
      currentTargetMove = null;
      currentLeaveHandler = null;
    };

    gsap.set(cursor, { xPercent: -50, yPercent: -50, x: window.innerWidth / 2, y: window.innerHeight / 2 });

    const createSpinTimeline = () => {
      if (spinTl.current) spinTl.current.kill();
      spinTl.current = gsap.timeline({ repeat: -1 }).to(cursor, { rotation: '+=360', duration: spinDuration, ease: 'none' });
    };
    createSpinTimeline();

    const moveHandler = (e) => moveCursor(e.clientX, e.clientY);
    window.addEventListener('mousemove', moveHandler);

    const scrollHandler = () => {
      if (!activeTarget || !cursorRef.current) return;
      const mouseX = gsap.getProperty(cursorRef.current, 'x');
      const mouseY = gsap.getProperty(cursorRef.current, 'y');
      const elementUnderMouse = document.elementFromPoint(mouseX, mouseY);
      const stillOver = elementUnderMouse && (elementUnderMouse === activeTarget || elementUnderMouse.closest(targetSelector) === activeTarget);
      if (!stillOver && currentLeaveHandler) currentLeaveHandler();
    };
    window.addEventListener('scroll', scrollHandler, { passive: true });

    const mouseDownHandler = () => {
      if (!dotRef.current) return;
      gsap.to(dotRef.current, { scale: 0.7, duration: 0.2 });
      gsap.to(cursorRef.current, { scale: 0.95, duration: 0.15 });
    };
    const mouseUpHandler = () => {
      if (!dotRef.current) return;
      gsap.to(dotRef.current, { scale: 1, duration: 0.2 });
      gsap.to(cursorRef.current, { scale: 1, duration: 0.15 });
    };
    window.addEventListener('mousedown', mouseDownHandler);
    window.addEventListener('mouseup', mouseUpHandler);

    const enterHandler = (e) => {
      const directTarget = e.target;
      const allTargets = [];
      let cur = directTarget;
      while (cur && cur !== document.body) {
        if (cur.matches?.(targetSelector)) allTargets.push(cur);
        cur = cur.parentElement;
      }
      const target = allTargets[0] || null;
      if (!target || !cursorRef.current || !cornersRef.current) return;
      if (activeTarget === target) return;

      if (activeTarget) cleanupTarget(activeTarget);
      if (resumeTimeout) { clearTimeout(resumeTimeout); resumeTimeout = null; }

      activeTarget = target;
      const corners = Array.from(cornersRef.current);
      corners.forEach((c) => gsap.killTweensOf(c));
      gsap.killTweensOf(cursorRef.current, 'rotation');
      spinTl.current?.pause();
      gsap.set(cursorRef.current, { rotation: 0 });

      const updateCorners = (mx, my) => {
        const rect = target.getBoundingClientRect();
        const cRect = cursorRef.current.getBoundingClientRect();
        const cx = cRect.left + cRect.width / 2;
        const cy = cRect.top + cRect.height / 2;
        const [tlc, trc, brc, blc] = Array.from(cornersRef.current);
        const { borderWidth, cornerSize, parallaxStrength } = constants;

        let tl = { x: rect.left - cx - borderWidth, y: rect.top - cy - borderWidth };
        let tr = { x: rect.right - cx + borderWidth - cornerSize, y: rect.top - cy - borderWidth };
        let br = { x: rect.right - cx + borderWidth - cornerSize, y: rect.bottom - cy + borderWidth - cornerSize };
        let bl = { x: rect.left - cx - borderWidth, y: rect.bottom - cy + borderWidth - cornerSize };

        if (mx != null && my != null) {
          const tx = rect.left + rect.width / 2;
          const ty = rect.top + rect.height / 2;
          const ox = (mx - tx) * parallaxStrength;
          const oy = (my - ty) * parallaxStrength;
          tl.x += ox; tl.y += oy; tr.x += ox; tr.y += oy; br.x += ox; br.y += oy; bl.x += ox; bl.y += oy;
        }

        const tlm = gsap.timeline();
        const cs = [tlc, trc, brc, blc];
        const ofs = [tl, tr, br, bl];
        cs.forEach((corner, i) => tlm.to(corner, { x: ofs[i].x, y: ofs[i].y, duration: 0.2, ease: 'power2.out' }, 0));
      };

      isAnimatingToTarget = true;
      updateCorners();
      setTimeout(() => { isAnimatingToTarget = false; }, 1);

      let throttle = null;
      const targetMove = (ev) => {
        if (throttle || isAnimatingToTarget) return;
        throttle = requestAnimationFrame(() => {
          const me = ev;
          updateCorners(me.clientX, me.clientY);
          throttle = null;
        });
      };
      const leaveHandler = () => {
        activeTarget = null;
        isAnimatingToTarget = false;
        if (cornersRef.current) {
          const corners = Array.from(cornersRef.current);
          gsap.killTweensOf(corners);
          const { cornerSize } = constants;
          const positions = [
            { x: -cornerSize * 1.5, y: -cornerSize * 1.5 },
            { x: cornerSize * 0.5, y: -cornerSize * 1.5 },
            { x: cornerSize * 0.5, y: cornerSize * 0.5 },
            { x: -cornerSize * 1.5, y: cornerSize * 0.5 },
          ];
          const tl = gsap.timeline();
          corners.forEach((corner, i) => tl.to(corner, { x: positions[i].x, y: positions[i].y, duration: 0.3, ease: 'power3.out' }, 0));
        }
        resumeTimeout = setTimeout(() => {
          if (!activeTarget && cursorRef.current) {
            const curRot = gsap.getProperty(cursorRef.current, 'rotation');
            const norm = curRot % 360;
            spinTl.current?.kill();
            spinTl.current = gsap.timeline({ repeat: -1 }).to(cursorRef.current, { rotation: '+=360', duration: spinDuration, ease: 'none' });
            gsap.to(cursorRef.current, { rotation: norm + 360, duration: spinDuration * (1 - norm / 360), ease: 'none', onComplete: () => spinTl.current?.restart() });
          }
          resumeTimeout = null;
        }, 50);
        cleanupTarget(target);
      };

      currentTargetMove = targetMove;
      currentLeaveHandler = leaveHandler;
      target.addEventListener('mousemove', targetMove);
      target.addEventListener('mouseleave', leaveHandler);
    };

    window.addEventListener('mouseover', enterHandler, { passive: true });

    return () => {
      window.removeEventListener('mousemove', moveHandler);
      window.removeEventListener('mouseover', enterHandler);
      window.removeEventListener('scroll', scrollHandler);
      if (activeTarget) cleanupTarget(activeTarget);
      spinTl.current?.kill();
      document.body.style.cursor = originalCursor;
    };
  }, [targetSelector, spinDuration, moveCursor, constants, hideDefaultCursor]);

  useEffect(() => {
    if (!cursorRef.current || !spinTl.current) return;
    if (spinTl.current.isActive()) {
      spinTl.current.kill();
      spinTl.current = gsap.timeline({ repeat: -1 }).to(cursorRef.current, { rotation: '+=360', duration: spinDuration, ease: 'none' });
    }
  }, [spinDuration]);

  return (
    <div ref={cursorRef} className="target-cursor-wrapper">
      <div ref={dotRef} className="target-cursor-dot" />
      <div className="target-cursor-corner corner-tl" />
      <div className="target-cursor-corner corner-tr" />
      <div className="target-cursor-corner corner-br" />
      <div className="target-cursor-corner corner-bl" />
    </div>
  );
}

