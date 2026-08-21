import 'login_credentials.dart';
import 'auth_result.dart';

abstract interface class AuthRepository {
  Future<AuthResult> login(
    LoginCredentials credentials,
  );
}
