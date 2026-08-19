import { useEffect, useRef } from 'react';

interface UsePointerGazeOptions {
  usernameFocused: boolean;
  usernameLength: number;
  passwordFocused: boolean;
  passwordLength: number;
}

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export function usePointerGaze({
  usernameFocused,
  usernameLength,
  passwordFocused,
  passwordLength,
}: UsePointerGazeOptions) {
  const mascotRef = useRef<HTMLDivElement>(null);

  const latestPointer = useRef({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });

  const inputFocused = usernameFocused || passwordFocused;

  useEffect(() => {
    const mascot = mascotRef.current;

    if (!mascot) {
      return;
    }

    let animationFrameId: number | null = null;

    const updatePointerGaze = () => {
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

      mascot.style.setProperty(
        '--pupil-x',
        `${horizontal * bounds.width * 0.019}px`,
      );

      mascot.style.setProperty(
        '--pupil-y',
        `${vertical * bounds.width * 0.014}px`,
      );

      animationFrameId = null;
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') {
        return;
      }

      latestPointer.current = {
        x: event.clientX,
        y: event.clientY,
      };

      if (inputFocused) {
        return;
      }

      if (animationFrameId === null) {
        animationFrameId = requestAnimationFrame(updatePointerGaze);
      }
    };

    window.addEventListener('pointermove', handlePointerMove, {
      passive: true,
    });

    if (!inputFocused) {
      updatePointerGaze();
    }

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);

      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [inputFocused]);

  useEffect(() => {
    const mascot = mascotRef.current;

    if (!mascot || !inputFocused) {
      return;
    }

    const bounds = mascot.getBoundingClientRect();

    const textLength = passwordFocused
      ? passwordLength
      : usernameLength;

    const progress = clamp(textLength / 14, 0, 1);

    const horizontal = -0.9 + progress * 1.8;

    mascot.style.setProperty(
      '--pupil-x',
      `${horizontal * bounds.width * 0.028}px`,
    );

    mascot.style.setProperty(
      '--pupil-y',
      `${bounds.width * 0.027}px`,
    );
  }, [
    inputFocused,
    usernameFocused,
    usernameLength,
    passwordFocused,
    passwordLength,
  ]);

  return mascotRef;
}
