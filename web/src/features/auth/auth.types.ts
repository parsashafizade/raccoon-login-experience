export type AuthProvider = 'google' | 'apple';

export interface LoginCredentials {
  username: string;
  password: string;
  rememberMe: boolean;
}

export interface LoginFieldErrors {
  username?: string;
  password?: string;
}

export type AuthFailureCode =
  | 'VALIDATION_ERROR'
  | 'INVALID_CREDENTIALS'
  | 'NETWORK_ERROR';

export type AuthResult =
  | {
      ok: true;
    }
  | {
      ok: false;
      code: AuthFailureCode;
      message: string;
      fieldErrors?: LoginFieldErrors;
    };

export type AuthenticateLogin = (
  credentials: LoginCredentials,
) => Promise<AuthResult>;
