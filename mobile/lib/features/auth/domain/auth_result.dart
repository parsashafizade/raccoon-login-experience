enum AuthFailureCode {
  validation,
  invalidCredentials,
  network,
  server,
}

sealed class AuthResult {
  const AuthResult();

  const factory AuthResult.success() =
      AuthSuccess;

  const factory AuthResult.failure({
    required AuthFailureCode code,
    required String message,
  }) = AuthFailure;
}


class AuthSuccess extends AuthResult {
  const AuthSuccess();
}


class AuthFailure extends AuthResult {
  final AuthFailureCode code;
  final String message;

  const AuthFailure({
    required this.code,
    required this.message,
  }) : super();
}
