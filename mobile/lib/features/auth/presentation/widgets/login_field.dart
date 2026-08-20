import 'package:flutter/material.dart';

import '../../../../app/theme/app_colors.dart';

class LoginField extends StatelessWidget {
  final String label;
  final String hint;

  final bool obscureText;

  final TextEditingController controller;

  final FocusNode? focusNode;

  final VoidCallback? onVisibilityPressed;

  final bool showVisibilityIcon;

  const LoginField({
    super.key,
    required this.label,
    required this.hint,
    required this.controller,
    this.focusNode,
    this.obscureText = false,
    this.showVisibilityIcon = false,
    this.onVisibilityPressed,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          label,
          style: const TextStyle(
            color: AppColors.textPrimary,
          ),
        ),
        const SizedBox(
          height: 8,
        ),
        TextField(
          controller: controller,
          focusNode: focusNode,
          obscureText: obscureText,
          style: const TextStyle(
            color: AppColors.textPrimary,
          ),
          decoration: InputDecoration(
            hintText: hint,
            hintStyle: TextStyle(
              color: AppColors.textSecondary.withValues(
                alpha: 0.7,
              ),
            ),
            filled: true,
            fillColor: Colors.white.withValues(
              alpha: 0.05,
            ),
            suffixIcon: showVisibilityIcon
                ? IconButton(
                    onPressed: onVisibilityPressed,
                    icon: Icon(
                      obscureText
                          ? Icons.visibility_off_outlined
                          : Icons.visibility_outlined,
                      color: AppColors.textSecondary,
                    ),
                  )
                : null,
            border: OutlineInputBorder(
              borderRadius: BorderRadius.circular(14),
              borderSide: BorderSide.none,
            ),
          ),
        ),
      ],
    );
  }
}
