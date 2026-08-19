import type { ChangeEvent, FormEvent } from 'react';

import type {
  AuthProvider,
  LoginFieldErrors,
} from '../../features/auth/auth.types';
import type { SubmitState } from '../LoginExperience/loginExperience.types';

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

  onSocialLogin: (
    provider: AuthProvider,
  ) => void | Promise<void>;
  onCreateAccount: () => void;
  onForgotPassword: () => void;

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
  onSocialLogin,
  onCreateAccount,
  onForgotPassword,
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

  const hasVisibleError =
    Boolean(fieldErrors.username) ||
    Boolean(fieldErrors.password) ||
    Boolean(authMessage);

  const showSignInStatus = isBusy && !hasVisibleError;

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit}
      aria-busy={isBusy}
    >
      <div className={styles.field}>
        <label
          className={styles.fieldLabel}
          htmlFor="username"
        >
          Username
        </label>

        <input
          id="username"
          type="text"
          name="username"
          autoComplete="username"
          value={username}
          aria-invalid={Boolean(fieldErrors.username)}
          aria-describedby={
            fieldErrors.username
              ? 'username-error'
              : undefined
          }
          onChange={handleUsernameChange}
          onFocus={() => onUsernameFocusChange(true)}
          onBlur={() => onUsernameFocusChange(false)}
        />

        {fieldErrors.username && (
          <span
            id="username-error"
            className={styles.fieldError}
            role="alert"
          >
            {fieldErrors.username}
          </span>
        )}
      </div>

      <div className={styles.field}>
        <label
          className={styles.fieldLabel}
          htmlFor="password"
        >
          Password
        </label>

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
            id="password"
            type={passwordVisible ? 'text' : 'password'}
            name="password"
            autoComplete="current-password"
            value={password}
            aria-invalid={Boolean(fieldErrors.password)}
            aria-describedby={
              fieldErrors.password
                ? 'password-error'
                : undefined
            }
            onChange={handlePasswordChange}
          />

          <button
            className={styles.visibilityButton}
            type="button"
            onClick={onPasswordVisibilityToggle}
            aria-label={
              passwordVisible
                ? 'Hide password'
                : 'Show password'
            }
            aria-pressed={passwordVisible}
            aria-controls="password" 
          >
            {passwordVisible ? (
              <svg
                className={styles.visibilityIcon}
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M3 3L21 21" />
                <path d="M10.6 6.15A9.7 9.7 0 0 1 12 6c6 0 9.5 6 9.5 6a13.4 13.4 0 0 1-2.25 2.85" />
                <path d="M16.1 16.9A9.3 9.3 0 0 1 12 18c-6 0-9.5-6-9.5-6a13.2 13.2 0 0 1 3.15-3.75" />
                <path d="M9.9 9.9A3 3 0 0 0 14.1 14.1" />
              </svg>
            ) : (
              <svg
                className={styles.visibilityIcon}
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}
          </button>
        </div>

        {fieldErrors.password && (
          <span
            id="password-error"
            className={styles.fieldError}
            role="alert"
          >
            {fieldErrors.password}
          </span>
        )}
      </div>

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
          onClick={onForgotPassword}
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

      {showSignInStatus && (
        <p
          className={styles.signInStatus}
          role="status"
          aria-live="polite"
        >
          Signing you in...
        </p>
      )}

      <div className={styles.authDivider}>
        <span>or continue with</span>
      </div>

      <div className={styles.socialRow}>
        <button
          className={styles.socialButton}
          type="button"
          disabled={isBusy}
          onClick={() => onSocialLogin('google')}
        >
          <svg
            className={styles.googleLogo}
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              fill="#4285F4"
              d="M21.6 12.23c0-.71-.06-1.4-.18-2.06H12v3.9h5.38a4.6 4.6 0 0 1-2 3.02v2.53h3.24c1.9-1.75 2.98-4.33 2.98-7.39Z"
            />
            <path
              fill="#34A853"
              d="M12 22c2.7 0 4.97-.9 6.63-2.38l-3.24-2.53c-.9.6-2.05.96-3.39.96-2.6 0-4.81-1.76-5.6-4.13H3.05v2.6A10 10 0 0 0 12 22Z"
            />
            <path
              fill="#FBBC05"
              d="M6.4 13.92A6.02 6.02 0 0 1 6.08 12c0-.67.12-1.32.32-1.92v-2.6H3.05A10 10 0 0 0 2 12c0 1.61.38 3.13 1.05 4.52l3.35-2.6Z"
            />
            <path
              fill="#EA4335"
              d="M12 5.95c1.47 0 2.78.5 3.82 1.5l2.87-2.87A9.63 9.63 0 0 0 12 2a10 10 0 0 0-8.95 5.48l3.35 2.6C7.19 7.7 9.4 5.95 12 5.95Z"
            />
          </svg>

          <span>Google</span>
        </button>

        <button
          className={styles.socialButton}
          type="button"
          disabled={isBusy}
          onClick={() => onSocialLogin('apple')}
        >
          <span
            className={`${styles.providerMark} ${styles.appleMark}`}
            aria-hidden="true"
          >
            
          </span>

          <span>Apple</span>
        </button>
      </div>

      <p className={styles.createAccount}>
        <span>New here?</span>

        <button
          type="button"
          disabled={isBusy}
          onClick={onCreateAccount}
        >
          Create account
        </button>
      </p>
    </form>
  );
}
