import type {
  LoginCredentials,
  LoginFieldErrors,
} from './auth.types';

const PASSWORD_PATTERN =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9\s]).+$/;

export function validateLoginCredentials(
  credentials: LoginCredentials,
): LoginFieldErrors {
  const errors: LoginFieldErrors = {};

  if (!credentials.username.trim()) {
    errors.username = 'Enter your username.';
  }

  if (!credentials.password) {
    errors.password = 'Enter your password.';
  } else if (!PASSWORD_PATTERN.test(credentials.password)) {
    errors.password =
      'Use lowercase, uppercase, a number, and a symbol.';
  }

  return errors;
}
