import 'package:flutter/material.dart';
import '../raccoon/models/raccoon_paw_state.dart';

import 'raccoon_mascot.dart';
import 'models/raccoon_eye_state.dart';

class RaccoonLayer extends StatelessWidget {
  final double size;
  final RaccoonEyeState eyeState;
  final RaccoonPawState pawState;

  const RaccoonLayer({
    super.key,
    required this.size,
    required this.eyeState,
    required this.pawState,
  });

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: size,
      height: size,
      child: RaccoonMascot(
        eyeState: eyeState,
        pawState: pawState,
      ),
    );
  }
}
