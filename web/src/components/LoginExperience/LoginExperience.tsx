import { useEffect, useRef, useState } from 'react';

import { authenticateLogin } from '../../features/auth/auth.service';
import type {
  AuthProvider,
  LoginFieldErrors,
} from '../../features/auth/auth.types';
import { LoginForm } from '../LoginForm/LoginForm';
import { RaccoonMascot } from '../RaccoonMascot/RaccoonMascot';

import styles from './LoginExperience.module.css';

export type SubmitState =
  | 'idle'
  | 'checking'
  | 'success-animation'
  | 'failure-animation'
  | 'success';

interface LoginExperienceProps {
  onSocialLogin?: (provider: AuthProvider) => void;
  onCreateAccount?: () => void;
}

const SUCCESS_ANIMATION_DURATION = 2400;
const FAILURE_ANIMATION_DURATION = 3800;
const FAILURE_FEEDBACK_DELAY = 2050;

export function LoginExperience({
  onSocialLogin = () => {},
  onCreateAccount = () => {},
}: LoginExperienceProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const [usernameFocused, setUsernameFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [submitState, setSubmitState] =
    useState<SubmitState>('idle');

  const [fieldErrors, setFieldErrors] =
    useState<LoginFieldErrors>({});

  const [authMessage, setAuthMessage] = useState('');

  const timersRef = useRef<number[]>([]);

  const clearScheduledTasks = () => {
    timersRef.current.forEach((timer) => {
      window.clearTimeout(timer);
    });

    timersRef.current = [];
  };

  const schedule = (callback: () => void, delay: number) => {
    const timer = window.setTimeout(callback, delay);
    timersRef.current.push(timer);
  };

  useEffect(() => {
    return clearScheduledTasks;
  }, []);

  const resetFeedback = () => {
    setFieldErrors({});
    setAuthMessage('');

    if (submitState === 'success') {
      setSubmitState('idle');
    }
  };

  const handleUsernameChange = (value: string) => {
    resetFeedback();
    setUsername(value);
  };

  const handlePasswordChange = (value: string) => {
    resetFeedback();
    setPassword(value);
  };

  const handleSubmit = async () => {
    if (
      submitState !== 'idle' &&
      submitState !== 'success'
    ) {
      return;
    }

    clearScheduledTasks();

    setFieldErrors({});
    setAuthMessage('');
    setSubmitState('checking');

    const result = await authenticateLogin({
      username,
      password,
      rememberMe,
    });

    if (result.ok) {
      setSubmitState('success-animation');

      schedule(() => {
        setSubmitState('success');
      }, SUCCESS_ANIMATION_DURATION);

      return;
    }

    setSubmitState('failure-animation');

    schedule(() => {
      setFieldErrors(result.fieldErrors ?? {});
      setAuthMessage(result.message);
    }, FAILURE_FEEDBACK_DELAY);

    schedule(() => {
      setSubmitState('idle');
    }, FAILURE_ANIMATION_DURATION);
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
          <p>Your raccoon is keeping watch.</p>
        </header>

        <LoginForm
          username={username}
          password={password}
          rememberMe={rememberMe}
          passwordVisible={passwordVisible}
          submitState={submitState}
          fieldErrors={fieldErrors}
          authMessage={authMessage}
          onUsernameChange={handleUsernameChange}
          onUsernameFocusChange={setUsernameFocused}
          onPasswordChange={handlePasswordChange}
          onPasswordFocusChange={setPasswordFocused}
          onRememberMeChange={setRememberMe}
          onPasswordVisibilityToggle={() =>
            setPasswordVisible((visible) => !visible)
          }
          onSocialLogin={onSocialLogin}
          onCreateAccount={onCreateAccount}
          onSubmit={handleSubmit}
        />
      </div>
    </section>
  );
}
