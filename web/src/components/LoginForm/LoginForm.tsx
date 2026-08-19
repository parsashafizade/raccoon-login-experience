import type { ChangeEvent, FormEvent } from 'react';

import styles from './LoginForm.module.css';

interface LoginFormProps {
  username: string;
  password: string;
  rememberMe: boolean;
  passwordVisible: boolean;
  onUsernameChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onRememberMeChange: (value: boolean) => void;
  onPasswordVisibilityToggle: () => void;
  onPasswordFocusChange: (focused: boolean) => void;
  onSubmit: () => void;
}

export function LoginForm({
  username,
  password,
  rememberMe,
  passwordVisible,
  onUsernameChange,
  onPasswordChange,
  onRememberMeChange,
  onPasswordVisibilityToggle,
  onPasswordFocusChange,
  onSubmit,
}: LoginFormProps) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit();
  };

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    onUsernameChange(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    onPasswordChange(event.target.value);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          name="username"
          type="text"
          autoComplete="username"
          value={username}
          onChange={handleUsernameChange}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="password">Password</label>

        <div
          className={styles.passwordField}
          onFocusCapture={() => onPasswordFocusChange(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
              onPasswordFocusChange(false);
            }
          }}
        >
          <input
            id="password"
            name="password"
            type={passwordVisible ? 'text' : 'password'}
            autoComplete="current-password"
            value={password}
            onChange={handlePasswordChange}
          />

          <button
            className={styles.visibilityButton}
            type="button"
            onClick={onPasswordVisibilityToggle}
            aria-label={passwordVisible ? 'Hide password' : 'Show password'}
          >
            {passwordVisible ? 'Hide' : 'Show'}
          </button>
        </div>
      </div>

      <div className={styles.options}>
        <label className={styles.remember}>
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(event) => onRememberMeChange(event.target.checked)}
          />
          <span>Remember me</span>
        </label>

        <button className={styles.forgotPassword} type="button">
          Forgot password?
        </button>
      </div>

      <button className={styles.submitButton} type="submit">
        Sign in
      </button>
    </form>
  );
}
