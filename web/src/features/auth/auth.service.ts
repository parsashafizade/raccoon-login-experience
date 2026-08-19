import type {
  AuthResult,
  LoginCredentials,
} from './auth.types';
import { validateLoginCredentials } from './auth.validation';

const wait = (duration: number) =>
  new Promise<void>((resolve) => {
    window.setTimeout(resolve, duration);
  });

export async function authenticateLogin(
  credentials: LoginCredentials,
): Promise<AuthResult> {
  await wait(180);

  const fieldErrors = validateLoginCredentials(credentials);

  if (Object.keys(fieldErrors).length > 0) {
    return {
      ok: false,
      code: 'VALIDATION_ERROR',
      message: 'Check your sign-in details and try again.',
      fieldErrors,
    };
  }

  return {
    ok: true,
  };
}
