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

export type AuthResult =
  | {
      ok: true;
    }
  | {
      ok: false;
      code:
        | 'VALIDATION_ERROR'
        | 'INVALID_CREDENTIALS'
        | 'NETWORK_ERROR';
      message: string;
      fieldErrors?: LoginFieldErrors;
    };
