import '../domain/auth_repository.dart';
import '../domain/login_credentials.dart';
import '../domain/auth_result.dart';
import '../domain/password_validator.dart';

class AuthRepositoryImpl implements AuthRepository {
  @override
  Future<AuthResult> login(
    LoginCredentials credentials,
  ) async {
    await Future.delayed(
      const Duration(
        milliseconds: 800,
      ),
    );

    if (credentials.username.trim().isEmpty) {
      return const AuthResult.failure(
        code: AuthFailureCode.validation,
        message: 'Enter your username.',
      );
    }

    if (credentials.password.isEmpty) {
      return const AuthResult.failure(
        code: AuthFailureCode.validation,
        message: 'Enter your password.',
      );
    }

    if (!isValidPassword(credentials.password)) {
      return const AuthResult.failure(
        code: AuthFailureCode.validation,
        message: 'Use lowercase, uppercase, a number, and a symbol.',
      );
    }

    return const AuthResult.success();
  }
}
