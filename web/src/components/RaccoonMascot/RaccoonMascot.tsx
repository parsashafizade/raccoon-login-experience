import { useEffect } from 'react';
import leftPupil from '../../assets/raccoon/left-pupil.webp';
import pawsCoverLeft from '../../assets/raccoon/paws-cover-left.webp';
import pawsCoverRight from '../../assets/raccoon/paws-cover-right.webp';
import pawsPeekLeft from '../../assets/raccoon/paws-peek-left.webp';
import pawsPeekRight from '../../assets/raccoon/paws-peek-right.webp';
import pawsRest from '../../assets/raccoon/paws-rest.webp';
import raccoonBase from '../../assets/raccoon/raccoon-base.webp';
import rightPupil from '../../assets/raccoon/right-pupil.webp';
import styles from './RaccoonMascot.module.css';
import { usePointerGaze } from './usePointerGaze';

interface RaccoonMascotProps {
  usernameFocused: boolean;
  usernameLength: number;
  passwordLength: number;
  passwordFocused: boolean;
  passwordVisible: boolean;
}

export function RaccoonMascot({
  usernameFocused,
  usernameLength,
  passwordLength,
  passwordFocused,
  passwordVisible,
}: RaccoonMascotProps) {
  const mascotRef = usePointerGaze({
    usernameFocused,
    usernameLength,
    passwordFocused,
    passwordLength,
  });

  useEffect(() => {
    let preloadTimer: number | undefined;

    const preloadSecondaryAssets = () => {
      preloadTimer = window.setTimeout(() => {
        [
          pawsCoverLeft,
          pawsCoverRight,
          pawsPeekLeft,
          pawsPeekRight,
        ].forEach((src) => {
          const image = new Image();
          image.decoding = 'async';
          image.src = src;
        });
      }, 1000);
    };

    if (document.readyState === 'complete') {
      preloadSecondaryAssets();
    } else {
      window.addEventListener('load', preloadSecondaryAssets, { once: true });
    }

    return () => {
      window.removeEventListener('load', preloadSecondaryAssets);

      if (preloadTimer !== undefined) {
        window.clearTimeout(preloadTimer);
      }
    };
  }, []);

  const showRest = !passwordFocused;
  const showCover = passwordFocused && !passwordVisible;
  const showPeek = passwordFocused && passwordVisible;

  return (
    <div ref={mascotRef} className={styles.mascot} aria-hidden="true">
      <div className={styles.bodyLayer}>
        <img
          className={styles.base}
          src={raccoonBase}
          alt=""
          draggable={false}
          fetchPriority="high"
        />

        <img
          className={`${styles.pupil} ${styles.leftPupil}`}
          src={leftPupil}
          alt=""
          draggable={false}
        />

        <img
          className={`${styles.pupil} ${styles.rightPupil}`}
          src={rightPupil}
          alt=""
          draggable={false}
        />
      </div>

      <div className={styles.pawsLayer}>
        {showRest && (
          <img
            className={styles.restPaws}
            src={pawsRest}
            alt=""
            draggable={false}
          />
        )}

        {showCover && (
          <>
            <img
              className={`${styles.coverPaw} ${styles.coverLeft}`}
              src={pawsCoverLeft}
              alt=""
              draggable={false}
            />

            <img
              className={`${styles.coverPaw} ${styles.coverRight}`}
              src={pawsCoverRight}
              alt=""
              draggable={false}
            />
          </>
        )}

        {showPeek && (
          <>
            <img
              className={`${styles.peekPaw} ${styles.peekLeft}`}
              src={pawsPeekLeft}
              alt=""
              draggable={false}
            />

            <img
              className={`${styles.peekPaw} ${styles.peekRight}`}
              src={pawsPeekRight}
              alt=""
              draggable={false}
            />
          </>
        )}
      </div>
    </div>
  );
}
