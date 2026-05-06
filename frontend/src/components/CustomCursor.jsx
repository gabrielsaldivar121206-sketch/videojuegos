import { useEffect, useRef } from 'react';

/**
 * CustomCursor — smooth trailing dot, desktop only.
 * The dot lerps toward the real cursor position creating a fluid delay effect.
 * Completely hidden on touch/mobile devices.
 */
const CustomCursor = () => {
  const cursorRef = useRef(null);

  useEffect(() => {
    // Disable entirely on touch screens or small viewports
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const isMobile = window.innerWidth <= 900;
    if (isTouch || isMobile) return;

    let targetX = -100; // start off-screen so no jump on load
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;
    let rafId;
    let started = false;

    const onMouseMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!started) {
        // Snap to cursor position on first move to avoid jump from center
        currentX = targetX;
        currentY = targetY;
        started = true;
      }
    };

    const lerp = (a, b, t) => a + (b - a) * t;

    const tick = () => {
      // Smooth lag: 0.10 = strong delay, 0.25 = subtle delay
      currentX = lerp(currentX, targetX, 0.12);
      currentY = lerp(currentY, targetY, 0.12);

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${currentX}px, ${currentY}px)`;
      }

      rafId = requestAnimationFrame(tick);
    };

    // Hide the cursor once it's off-screen (mouse left window)
    const onMouseLeave = () => {
      if (cursorRef.current) cursorRef.current.style.opacity = '0';
    };
    const onMouseEnter = () => {
      if (cursorRef.current) cursorRef.current.style.opacity = '1';
    };

    window.addEventListener('mousemove', onMouseMove);
    document.documentElement.addEventListener('mouseleave', onMouseLeave);
    document.documentElement.addEventListener('mouseenter', onMouseEnter);
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.documentElement.removeEventListener('mouseleave', onMouseLeave);
      document.documentElement.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: 20,
        height: 20,
        borderRadius: '50%',
        background: 'rgba(255, 255, 255, 0.85)',
        boxShadow: '0 0 10px 4px rgba(255, 255, 255, 0.25)',
        pointerEvents: 'none',
        zIndex: 999999,
        marginLeft: -10,
        marginTop: -10,
        willChange: 'transform',
        transition: 'opacity 0.3s ease',
        opacity: 0, // starts invisible — fades in on first mousemove
        mixBlendMode: 'difference', // inverts colors underneath for visibility on any bg
      }}
    />
  );
};

export default CustomCursor;
