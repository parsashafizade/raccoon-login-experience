import leftPupil from '../../assets/raccoon/left-pupil.png';
import pawsCoverLeft from '../../assets/raccoon/paws-cover-left.png';
import pawsCoverRight from '../../assets/raccoon/paws-cover-right.png';
import pawsRest from '../../assets/raccoon/paws-rest.png';
import raccoonBase from '../../assets/raccoon/raccoon-base.png';
import rightPupil from '../../assets/raccoon/right-pupil.png';

import styles from './RaccoonMascot.module.css';
import { usePointerGaze } from './usePointerGaze';

interface RaccoonMascotProps {
  passwordFocused: boolean;
  passwordVisible: boolean;
}

export function RaccoonMascot({
  passwordFocused,
  passwordVisible: _passwordVisible,
}: RaccoonMascotProps) {
  const mascotRef = usePointerGaze();

  const showRest = !passwordFocused;
  const showCover = passwordFocused;

  return (
    <div ref={mascotRef} className={styles.mascot} aria-hidden="true">
      <div className={styles.bodyLayer}>
        <img
          className={styles.base}
          src={raccoonBase}
          alt=""
          draggable={false}
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
      </div>
    </div>
  );
}
