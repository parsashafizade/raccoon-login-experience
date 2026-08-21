import 'package:flutter/material.dart';

import '../models/raccoon_paw_state.dart';
import '../raccoon_position.dart';

class RaccoonPaws extends StatelessWidget {
  final RaccoonPawState pawState;

  final double size;

  const RaccoonPaws({
    super.key,
    required this.pawState,
    required this.size,
  });

  @override
  Widget build(BuildContext context) {
    switch (pawState) {
      case RaccoonPawState.rest:
        return Positioned(
          bottom: size * RaccoonPosition.restPawsBottom,
          left: size * RaccoonPosition.restPawsLeft,
          width: size * RaccoonPosition.restPawsWidth,
          child: Image.asset(
            'assets/raccoon/paws-rest.webp',
            fit: BoxFit.contain,
          ),
        );

      case RaccoonPawState.cover:
        return Stack(
          clipBehavior: Clip.none,
          children: [
            // Left paw

            Positioned(
              bottom: size * RaccoonPosition.coverPawsBottom,
              left: size * RaccoonPosition.coverPawsLeft,
              width: size * (RaccoonPosition.coverPawsWidth / 2),
              child: Image.asset(
                'assets/raccoon/paws-cover-left.webp',
                fit: BoxFit.contain,
              ),
            ),

            // Right paw

            Positioned(
              bottom: size * RaccoonPosition.coverPawsBottom,
              right: size * RaccoonPosition.coverPawsLeft,
              width: size * (RaccoonPosition.coverPawsWidth / 2),
              child: Image.asset(
                'assets/raccoon/paws-cover-right.webp',
                fit: BoxFit.contain,
              ),
            ),
          ],
        );
    }
  }
}
