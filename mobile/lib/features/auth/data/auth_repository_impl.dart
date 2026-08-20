import '../domain/auth_repository.dart';
import '../domain/login_credentials.dart';
import '../domain/auth_result.dart';


class AuthRepositoryImpl
    implements AuthRepository {

  @override
  Future<AuthResult> login(
    LoginCredentials credentials,
  ) async {

    await Future.delayed(
      const Duration(milliseconds: 300),
    );

    if (credentials.username.isEmpty ||
        credentials.password.isEmpty) {
      return const AuthResult.failure(
        code: AuthFailureCode.validation,
        message:
            'Enter your username and password.',
      );
    }

    return const AuthResult.success();
  }
}
