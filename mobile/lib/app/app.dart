import 'package:flutter/material.dart';
import '../features/auth/presentation/pages/login_page.dart';
import 'theme/app_theme.dart';

class RaccoonLoginApp extends StatelessWidget {
  const RaccoonLoginApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Raccoon Login',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.dark(),
      home: const LoginPage(),
    );
  }
}
