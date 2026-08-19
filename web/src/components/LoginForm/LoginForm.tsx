import type { ChangeEvent, FormEvent } from 'react';

import type { LoginFieldErrors } from '../../features/auth/auth.types';
import type { SubmitState } from '../LoginExperience/LoginExperience';

import styles from './LoginForm.module.css';

interface LoginFormProps {
  username: string;
  password: string;
  rememberMe: boolean;
  passwordVisible: boolean;
  submitState: SubmitState;
  fieldErrors: LoginFieldErrors;
  authMessage: string;

  onUsernameChange: (value: string) => void;
  onUsernameFocusChange: (focused: boolean) => void;

  onPasswordChange: (value: string) => void;
  onPasswordFocusChange: (focused: boolean) => void;

  onRememberMeChange: (value: boolean) => void;
  onPasswordVisibilityToggle: () => void;
  onSubmit: () => void;
}

export function LoginForm({
  username,
  password,
  rememberMe,
  passwordVisible,
  submitState,
  fieldErrors,
  authMessage,
  onUsernameChange,
  onUsernameFocusChange,
  onPasswordChange,
  onPasswordFocusChange,
  onRememberMeChange,
  onPasswordVisibilityToggle,
  onSubmit,
}: LoginFormProps) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit();
  };

  const handleUsernameChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    onUsernameChange(event.target.value);
  };

  const handlePasswordChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    onPasswordChange(event.target.value);
  };

  const isBusy =
    submitState === 'checking' ||
    submitState === 'success-animation' ||
    submitState === 'failure-animation';

  const isAnimating =
    submitState === 'success-animation' ||
    submitState === 'failure-animation';

  const animationResult =
    submitState === 'failure-animation'
      ? 'failure'
      : 'success';

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label className={styles.field}>
        <span>Username</span>

        <input
          type="text"
          name="username"
          autoComplete="username"
          value={username}
          aria-invalid={Boolean(fieldErrors.username)}
          onChange={handleUsernameChange}
          onFocus={() => onUsernameFocusChange(true)}
          onBlur={() => onUsernameFocusChange(false)}
        />

        {fieldErrors.username && (
          <span className={styles.fieldError}>
            {fieldErrors.username}
          </span>
        )}
      </label>

      <label className={styles.field}>
        <span>Password</span>

        <div
          className={styles.passwordField}
          onFocusCapture={() => onPasswordFocusChange(true)}
          onBlurCapture={(event) => {
            if (
              !event.currentTarget.contains(
                event.relatedTarget as Node | null,
              )
            ) {
              onPasswordFocusChange(false);
            }
          }}
        >
          <input
            type={passwordVisible ? 'text' : 'password'}
            name="password"
            autoComplete="current-password"
            value={password}
            aria-invalid={Boolean(fieldErrors.password)}
            onChange={handlePasswordChange}
          />

          <button
            className={styles.visibilityButton}
            type="button"
            onClick={onPasswordVisibilityToggle}
          >
            {passwordVisible ? 'Hide' : 'Show'}
          </button>
        </div>

        {fieldErrors.password && (
          <span className={styles.fieldError}>
            {fieldErrors.password}
          </span>
        )}
      </label>

      <div className={styles.options}>
        <label className={styles.remember}>
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(event) =>
              onRememberMeChange(event.target.checked)
            }
          />

          <span>Remember me</span>
        </label>

        <button
          className={styles.forgotPassword}
          type="button"
        >
          Forgot password?
        </button>
      </div>

      {authMessage &&
        !fieldErrors.username &&
        !fieldErrors.password && (
          <p className={styles.authMessage} role="alert">
            {authMessage}
          </p>
        )}

      <button
        className={styles.submitButton}
        type="submit"
        data-state={submitState}
        disabled={isBusy}
        aria-live="polite"
      >
        {isAnimating ? (
          <span
            className={styles.entryScene}
            data-result={animationResult}
            aria-hidden="true"
          >
            <span className={styles.walker}>
              <span className={styles.personHead} />

              <span className={styles.personBody}>
                <span
                  className={`${styles.personArm} ${styles.armLeft}`}
                />

                <span
                  className={`${styles.personArm} ${styles.armRight}`}
                />

                <span
                  className={`${styles.personLeg} ${styles.legLeft}`}
                />

                <span
                  className={`${styles.personLeg} ${styles.legRight}`}
                />
              </span>
            </span>

            {animationResult === 'success' && (
              <>
                <span className={styles.doorLight} />
                <span className={styles.doorGlow} />
              </>
            )}

            <span className={styles.doorFrame}>
              <span className={styles.door}>
                <span className={styles.doorKnob} />
              </span>
            </span>
          </span>
        ) : (
          <span className={styles.buttonLabel}>
            {submitState === 'checking'
              ? 'Checking...'
              : submitState === 'success'
                ? 'Welcome back!'
                : 'Sign in'}
          </span>
        )}
      </button>
    </form>
  );
}
