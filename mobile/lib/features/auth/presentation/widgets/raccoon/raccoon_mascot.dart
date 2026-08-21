import 'package:flutter/material.dart';
import 'models/raccoon_paw_state.dart';
import 'models/raccoon_eye_state.dart';
import 'paws/raccoon_paws.dart';
import 'raccoon_position.dart';

class RaccoonMascot extends StatelessWidget {
  final RaccoonEyeState eyeState;
  final RaccoonPawState pawState;

  const RaccoonMascot({
    super.key,
    required this.eyeState,
    required this.pawState,
  });

  Offset _eyeOffset() {
    switch (eyeState) {
      case RaccoonEyeState.username:
        return const Offset(
          -0.006,
          0.010,
        );

      case RaccoonEyeState.usernameTyping:
        return const Offset(
          0.002,
          0.006,
        );

      case RaccoonEyeState.password:
        return const Offset(
          -0.006,
          0.012,
        );

      case RaccoonEyeState.passwordTyping:
        return const Offset(
          0.004,
          0.008,
        );

      case RaccoonEyeState.usernameLongTyping:
        return const Offset(
          0.008,
          0.010,
        );

      case RaccoonEyeState.passwordLongTyping:
        return const Offset(
          0.008,
          0.012,
        );

      case RaccoonEyeState.idle:
        return Offset.zero;
    }
  }

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (
        context,
        constraints,
      ) {
        final size = constraints.maxWidth;

        final eyeOffset = _eyeOffset();

        return Stack(
          clipBehavior: Clip.none,
          children: [
            // Main body

            Positioned.fill(
              child: Image.asset(
                'assets/raccoon/raccoon-base.webp',
                fit: BoxFit.contain,
              ),
            ),

            // Left pupil

            AnimatedPositioned(
              duration: const Duration(
                milliseconds: 250,
              ),
              curve: Curves.easeOut,
              top: (size * RaccoonPosition.eyeTop) + (size * eyeOffset.dy),
              left:
                  (size * RaccoonPosition.leftEyeLeft) + (size * eyeOffset.dx),
              width: size * RaccoonPosition.eyeWidth,
              child: Image.asset(
                'assets/raccoon/left-pupil.webp',
                fit: BoxFit.contain,
              ),
            ),

            // Right pupil

            AnimatedPositioned(
              duration: const Duration(
                milliseconds: 250,
              ),
              curve: Curves.easeOut,
              top: (size * RaccoonPosition.eyeTop) + (size * eyeOffset.dy),
              right: (size * RaccoonPosition.rightEyeRight) -
                  (size * eyeOffset.dx),
              width: size * RaccoonPosition.eyeWidth,
              child: Image.asset(
                'assets/raccoon/right-pupil.webp',
                fit: BoxFit.contain,
              ),
            ),

            // Rest paws

            RaccoonPaws(
              pawState: pawState,
              size: size,
            ),
          ],
        );
      },
    );
  }
}
