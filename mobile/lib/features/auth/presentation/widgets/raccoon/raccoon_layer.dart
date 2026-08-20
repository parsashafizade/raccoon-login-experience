import 'package:flutter/material.dart';

import 'raccoon_mascot.dart';
import 'models/raccoon_eye_state.dart';

class RaccoonLayer extends StatelessWidget {
  final double size;
  final RaccoonEyeState eyeState;

  const RaccoonLayer({
    super.key,
    required this.size,
    required this.eyeState,
  });

  @override
  Widget build(BuildContext context) {
    return SizedBox(
        width: size,
        height: size,
        child: RaccoonMascot(
          eyeState: eyeState,
        ));
  }
}
