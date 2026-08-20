import 'package:flutter/material.dart';

import '../../../../app/theme/app_colors.dart';


class LoginField extends StatelessWidget {

  final String label;
  final String hint;

  final bool obscureText;

  final TextEditingController controller;


  const LoginField({
    super.key,

    required this.label,
    required this.hint,

    required this.controller,

    this.obscureText = false,
  });


  @override
  Widget build(BuildContext context) {

    return Column(
      crossAxisAlignment:
          CrossAxisAlignment.start,

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

          obscureText: obscureText,

          style: const TextStyle(
            color: AppColors.textPrimary,
          ),


          decoration: InputDecoration(

            hintText: hint,

            hintStyle: TextStyle(
              color:
                  AppColors.textSecondary
                      .withValues(
                        alpha: 0.7,
                      ),
            ),

            filled: true,

            fillColor:
                Colors.white.withValues(
                  alpha: 0.05,
                ),


            border:
                OutlineInputBorder(
              borderRadius:
                  BorderRadius.circular(14),

              borderSide:
                  BorderSide.none,
            ),
          ),
        ),
      ],
    );
  }
}
