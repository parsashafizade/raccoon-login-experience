import 'package:flutter/material.dart';


class RaccoonMascot extends StatelessWidget {


  const RaccoonMascot({
    super.key,
  });


  @override
  Widget build(BuildContext context) {


    return SizedBox.expand(

      child: Stack(

        alignment:
            Alignment.center,


        children: [

          Image.asset(
            'assets/raccoon/raccoon-base.webp',

            fit:
                BoxFit.contain,
          ),

        ],
      ),
    );
  }
}
