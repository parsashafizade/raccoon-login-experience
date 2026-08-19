import { useState } from 'react';

import { LoginForm } from '../LoginForm/LoginForm';
import { RaccoonMascot } from '../RaccoonMascot/RaccoonMascot';

import styles from './LoginExperience.module.css';

type SubmitState = 'idle' | 'submitting' | 'success';

export function LoginExperience() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const [usernameFocused, setUsernameFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [submitState, setSubmitState] =
    useState<SubmitState>('idle');

  const resetSuccess = () => {
    if (submitState === 'success') {
      setSubmitState('idle');
    }
  };

  const handleUsernameChange = (value: string) => {
    resetSuccess();
    setUsername(value);
  };

  const handlePasswordChange = (value: string) => {
    resetSuccess();
    setPassword(value);
  };

  const handleSubmit = () => {
    if (
      submitState !== 'idle' ||
      !username.trim() ||
      !password
    ) {
      return;
    }

    setSubmitState('submitting');

    window.setTimeout(() => {
      setSubmitState('success');
    }, 2400);
  };

  return (
    <section className={styles.experience}>
      <div className={styles.mascot}>
        <RaccoonMascot
          usernameFocused={usernameFocused}
          usernameLength={username.length}
          passwordLength={password.length}
          passwordFocused={passwordFocused}
          passwordVisible={passwordVisible}
        />
      </div>

      <div className={styles.card}>
        <header className={styles.header}>
          <h1>Welcome back</h1>
          <p>Sign in to continue</p>
        </header>

        <LoginForm
          username={username}
          password={password}
          rememberMe={rememberMe}
          passwordVisible={passwordVisible}
          submitState={submitState}
          onUsernameChange={handleUsernameChange}
          onUsernameFocusChange={setUsernameFocused}
          onPasswordChange={handlePasswordChange}
          onRememberMeChange={setRememberMe}
          onPasswordVisibilityToggle={() =>
            setPasswordVisible((visible) => !visible)
          }
          onPasswordFocusChange={setPasswordFocused}
          onSubmit={handleSubmit}
        />
      </div>
    </section>
  );
}
