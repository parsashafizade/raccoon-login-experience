import { useEffect, useRef } from 'react';

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export function usePointerGaze() {
  const mascotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mascot = mascotRef.current;

    if (!mascot) {
      return;
    }

    let animationFrameId: number | null = null;
    let pointerX = window.innerWidth / 2;
    let pointerY = window.innerHeight / 2;

    const updateGaze = () => {
      const bounds = mascot.getBoundingClientRect();

      const centerX = bounds.left + bounds.width / 2;
      const centerY = bounds.top + bounds.height * 0.43;

      const horizontalProgress = clamp(
        (pointerX - centerX) / (window.innerWidth * 0.3),
        -1,
        1,
      );

      const verticalProgress = clamp(
        (pointerY - centerY) / (window.innerHeight * 0.3),
        -1,
        1,
      );

      const maxX = bounds.width * 0.019;
      const maxY = bounds.width * 0.014;

      mascot.style.setProperty(
        '--pupil-x',
        `${horizontalProgress * maxX}px`,
      );

      mascot.style.setProperty(
        '--pupil-y',
        `${verticalProgress * maxY}px`,
      );

      animationFrameId = null;
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') {
        return;
      }

      pointerX = event.clientX;
      pointerY = event.clientY;

      if (animationFrameId === null) {
        animationFrameId = requestAnimationFrame(updateGaze);
      }
    };

    window.addEventListener('pointermove', handlePointerMove, {
      passive: true,
    });

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);

      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return mascotRef;
}
