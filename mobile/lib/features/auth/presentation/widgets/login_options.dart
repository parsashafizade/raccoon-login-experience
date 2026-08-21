import 'package:flutter/material.dart';

import '../../../../app/theme/app_colors.dart';


class LoginOptions extends StatelessWidget {

  const LoginOptions({
    super.key,
  });


  @override
  Widget build(BuildContext context) {

    return Row(

      mainAxisAlignment:
          MainAxisAlignment.spaceBetween,


      children: [

        Row(
          children: [

            Checkbox(
              value: false,

              onChanged: (_) {},
            ),

            const Text(
              'Remember me',
              style: TextStyle(
                color:
                    AppColors.textSecondary,
              ),
            ),
          ],
        ),


        TextButton(

          onPressed: () {},

          child: const Text(
            'Forgot password?',
          ),
        ),
      ],
    );
  }
}
