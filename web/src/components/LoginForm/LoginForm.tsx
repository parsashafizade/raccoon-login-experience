import type { ChangeEvent, FormEvent } from 'react';

import styles from './LoginForm.module.css';

type SubmitState = 'idle' | 'submitting' | 'success';

interface LoginFormProps {
  username: string;
  password: string;
  rememberMe: boolean;
  passwordVisible: boolean;
  submitState: SubmitState;

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

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label className={styles.field}>
        <span>Username</span>

        <input
          type="text"
          name="username"
          autoComplete="username"
          value={username}
          required
          onChange={handleUsernameChange}
          onFocus={() => onUsernameFocusChange(true)}
          onBlur={() => onUsernameFocusChange(false)}
        />
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
            required
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

      <button
        className={styles.submitButton}
        type="submit"
        data-state={submitState}
        disabled={submitState !== 'idle'}
        aria-live="polite"
      >
        {submitState === 'submitting' ? (
          <span className={styles.entryScene} aria-hidden="true">
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

            <span className={styles.doorLight} />
            <span className={styles.doorGlow} />

            <span className={styles.doorFrame}>
              <span className={styles.door}>
                <span className={styles.doorKnob} />
              </span>
            </span>
          </span>
        ) : (
          <span className={styles.buttonLabel}>
            {submitState === 'success'
              ? 'Welcome back!'
              : 'Sign in'}
          </span>
        )}
      </button>
    </form>
  );
}
