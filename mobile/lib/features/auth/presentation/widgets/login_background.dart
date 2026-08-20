import 'package:flutter/material.dart';

import '../../../../app/theme/app_colors.dart';


class LoginBackground extends StatelessWidget {
  final Widget child;

  const LoginBackground({
    super.key,
    required this.child,
  });


  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,

          colors: [
            AppColors.background,
            const Color(0xFF142844),
          ],
        ),
      ),

      child: child,
    );
  }
}
