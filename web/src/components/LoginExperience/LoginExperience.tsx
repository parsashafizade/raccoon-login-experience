import { useState } from 'react';

import { LoginForm } from '../LoginForm/LoginForm';
import { RaccoonMascot } from '../RaccoonMascot/RaccoonMascot';

import styles from './LoginExperience.module.css';

export function LoginExperience() {
  const [username, setUsername] = useState('');
  const [usernameFocused, setUsernameFocused] = useState(false);
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

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
          onUsernameChange={setUsername}
          onUsernameFocusChange={setUsernameFocused}
          onPasswordChange={setPassword}
          onRememberMeChange={setRememberMe}
          onPasswordVisibilityToggle={() => {
            setPasswordVisible((visible) => !visible);
          }}
          onPasswordFocusChange={setPasswordFocused}
          onSubmit={() => {}}
        />
      </div>
    </section>
  );
}
