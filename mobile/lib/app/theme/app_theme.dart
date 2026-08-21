import 'package:flutter/material.dart';

import 'app_colors.dart';

abstract final class AppTheme {
  static ThemeData dark() {
    return ThemeData(
      useMaterial3: true,

      scaffoldBackgroundColor:
          AppColors.background,

      colorScheme:
          ColorScheme.fromSeed(
        seedColor: AppColors.primary,
        brightness: Brightness.dark,
      ),

      textTheme: const TextTheme(
        bodyMedium: TextStyle(
          color: AppColors.textPrimary,
        ),
      ),
    );
  }
}
