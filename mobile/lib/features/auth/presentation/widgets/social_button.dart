import 'package:flutter/material.dart';


class SocialButton extends StatelessWidget {

  final String text;

  final Widget icon;


  final VoidCallback onPressed;


  const SocialButton({
    super.key,

    required this.text,

    required this.icon,

    required this.onPressed,
  });


  @override
  Widget build(BuildContext context) {

    return SizedBox(

      width: double.infinity,

      height: 48,


      child: OutlinedButton.icon(

        onPressed: onPressed,

        icon: icon,

        label: Text(text),
      ),
    );
  }
}
