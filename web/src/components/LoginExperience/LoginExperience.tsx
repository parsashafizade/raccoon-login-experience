import { useEffect, useRef, useState } from 'react';

import { authenticateLogin } from '../../features/auth/auth.service';
import type {
  AuthenticateLogin,
  AuthProvider,
  AuthResult,
  LoginFieldErrors,
} from '../../features/auth/auth.types';
import { LoginForm } from '../LoginForm/LoginForm';
import { RaccoonMascot } from '../RaccoonMascot/RaccoonMascot';

import type { SubmitState } from './loginExperience.types';
import styles from './LoginExperience.module.css';

interface LoginExperienceProps {
  authenticate?: AuthenticateLogin;
  onSocialLogin?: (provider: AuthProvider) => void | Promise<void>;
  onCreateAccount?: () => void;
  onForgotPassword?: () => void;
}

const SUCCESS_ANIMATION_DURATION = 2400;
const FAILURE_ANIMATION_DURATION = 3800;
const FAILURE_FEEDBACK_DELAY = 2050;

const NETWORK_ERROR_RESULT: AuthResult = {
  ok: false,
  code: 'NETWORK_ERROR',
  message:
    'Unable to sign in right now. Check your connection and try again.',
};

export function LoginExperience({
  authenticate = authenticateLogin,
  onSocialLogin = () => {},
  onCreateAccount = () => {},
  onForgotPassword = () => {},
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

  const runFailureSequence = (result: AuthResult) => {
    if (result.ok) {
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

    let result: AuthResult;

    try {
      result = await authenticate({
        username,
        password,
        rememberMe,
      });
    } catch {
      result = NETWORK_ERROR_RESULT;
    }

    if (!result.ok) {
      runFailureSequence(result);
      return;
    }

    setSubmitState('success-animation');

    schedule(() => {
      setSubmitState('success');
    }, SUCCESS_ANIMATION_DURATION);
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
          onForgotPassword={onForgotPassword}
          onSubmit={handleSubmit}
        />
      </div>
    </section>
  );
}
