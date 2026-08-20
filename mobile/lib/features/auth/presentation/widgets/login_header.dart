import 'package:flutter/material.dart';

import '../../../../app/theme/app_colors.dart';


class LoginHeader extends StatelessWidget {
  const LoginHeader({
    super.key,
  });


  @override
  Widget build(BuildContext context) {
    return Column(
      children: [

        Text(
          'Welcome back',

          style: Theme.of(context)
              .textTheme
              .headlineMedium
              ?.copyWith(
                color: AppColors.textPrimary,
                fontWeight: FontWeight.w800,
              ),
        ),


        const SizedBox(
          height: 8,
        ),


        Text(
          'Your raccoon is keeping watch.',

          style: Theme.of(context)
              .textTheme
              .bodyMedium
              ?.copyWith(
                color: AppColors.textSecondary,
              ),
        ),
      ],
    );
  }
}
