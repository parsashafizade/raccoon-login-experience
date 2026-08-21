class LoginValidationResult {
  final String? usernameError;
  final String? passwordError;

  const LoginValidationResult({
    this.usernameError,
    this.passwordError,
  });

  bool get hasError => usernameError != null || passwordError != null;
}

class LoginValidator {
  const LoginValidator._();

  static LoginValidationResult validate({
    required String username,
    required String password,
  }) {
    String? usernameError;
    String? passwordError;

    if (username.trim().isEmpty) {
      usernameError = 'Enter your username.';
    }

    if (password.isEmpty) {
      passwordError = 'Enter your password.';
    } else if (!_hasStrongPassword(password)) {
      passwordError = 'Use lowercase, uppercase, a number, and a symbol.';
    }

    return LoginValidationResult(
      usernameError: usernameError,
      passwordError: passwordError,
    );
  }

  static bool _hasStrongPassword(String password) {
    final pattern = RegExp(
      r'^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9\s]).+$',
    );

    return pattern.hasMatch(password);
  }
}
