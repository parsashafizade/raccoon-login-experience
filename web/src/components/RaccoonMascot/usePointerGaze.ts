import { useEffect, useRef } from 'react';

interface UsePointerGazeOptions {
  usernameFocused: boolean;
  usernameLength: number;
}

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export function usePointerGaze({
  usernameFocused,
  usernameLength,
}: UsePointerGazeOptions) {
  const mascotRef = useRef<HTMLDivElement>(null);
  const latestPointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const mascot = mascotRef.current;

    if (!mascot) {
      return;
    }

    let animationFrameId: number | null = null;

    const applyGaze = (horizontal: number, vertical: number) => {
      const bounds = mascot.getBoundingClientRect();

      mascot.style.setProperty(
        '--pupil-x',
        `${horizontal * bounds.width * 0.019}px`,
      );

      mascot.style.setProperty(
        '--pupil-y',
        `${vertical * bounds.width * 0.014}px`,
      );
    };

    const updateFromPointer = () => {
      const bounds = mascot.getBoundingClientRect();

      const centerX = bounds.left + bounds.width / 2;
      const centerY = bounds.top + bounds.height * 0.43;

      const horizontal = clamp(
        (latestPointer.current.x - centerX) / (window.innerWidth * 0.3),
        -1,
        1,
      );

      const vertical = clamp(
        (latestPointer.current.y - centerY) / (window.innerHeight * 0.3),
        -1,
        1,
      );

      applyGaze(horizontal, vertical);
      animationFrameId = null;
    };

    latestPointer.current = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    };

    const handlePointerMove = (event: PointerEvent) => {
      latestPointer.current = {
        x: event.clientX,
        y: event.clientY,
      };

      if (usernameFocused || event.pointerType !== 'mouse') {
        return;
      }

      if (animationFrameId === null) {
        animationFrameId = requestAnimationFrame(updateFromPointer);
      }
    };

    window.addEventListener('pointermove', handlePointerMove, {
      passive: true,
    });

    if (!usernameFocused) {
      updateFromPointer();
    }

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);

      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [usernameFocused]);

  useEffect(() => {
    const mascot = mascotRef.current;

    if (!mascot || !usernameFocused) {
      return;
    }

    const bounds = mascot.getBoundingClientRect();

    const progress = clamp(usernameLength / 18, 0, 1);

    const horizontal = -0.72 + progress * 1.44;
    const vertical = 0.78;

    mascot.style.setProperty(
      '--pupil-x',
      `${horizontal * bounds.width * 0.019}px`,
    );

    mascot.style.setProperty(
      '--pupil-y',
      `${vertical * bounds.width * 0.014}px`,
    );
  }, [usernameFocused, usernameLength]);

  return mascotRef;
}
