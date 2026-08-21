bool isValidPassword(String password) {
  final hasLowercase = RegExp(r'[a-z]').hasMatch(password);

  final hasUppercase = RegExp(r'[A-Z]').hasMatch(password);

  final hasNumber = RegExp(r'\d').hasMatch(password);

  final hasSymbol = RegExp(
    r'[^A-Za-z0-9\s]',
  ).hasMatch(password);

  return hasLowercase && hasUppercase && hasNumber && hasSymbol;
}
