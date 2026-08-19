import type {
  AuthenticateLogin,
  AuthResult,
} from './auth.types';
import { validateLoginCredentials } from './auth.validation';

const wait = (duration: number) =>
  new Promise<void>((resolve) => {
    globalThis.setTimeout(resolve, duration);
  });

export const authenticateLogin: AuthenticateLogin = async (
  credentials,
): Promise<AuthResult> => {
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
};
