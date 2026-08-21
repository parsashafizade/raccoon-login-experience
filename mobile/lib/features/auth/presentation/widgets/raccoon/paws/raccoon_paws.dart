import 'package:flutter/material.dart';

import '../models/raccoon_paw_state.dart';
import '../raccoon_position.dart';

class RaccoonPaws extends StatefulWidget {
  final RaccoonPawState pawState;

  final double size;

  const RaccoonPaws({
    super.key,
    required this.pawState,
    required this.size,
  });

  @override
  State<RaccoonPaws> createState() => _RaccoonPawsState();
}

class _RaccoonPawsState extends State<RaccoonPaws> {
  @override
  Widget build(BuildContext context) {
    switch (widget.pawState) {
      case RaccoonPawState.rest:
        return Positioned(
          bottom: widget.size * RaccoonPosition.restPawsBottom,
          left: widget.size * RaccoonPosition.restPawsLeft,
          width: widget.size * RaccoonPosition.restPawsWidth,
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

            AnimatedPositioned(
              duration: const Duration(
                milliseconds: 300,
              ),
              curve: Curves.easeInOut,
              bottom: widget.size * RaccoonPosition.coverPawsBottom,
              left: widget.size * RaccoonPosition.coverPawsLeft,
              width: widget.size * (RaccoonPosition.coverPawsWidth / 2),
              child: Image.asset(
                'assets/raccoon/paws-cover-left.webp',
                fit: BoxFit.contain,
              ),
            ),

            // Right paw

            AnimatedPositioned(
              duration: const Duration(
                milliseconds: 300,
              ),
              curve: Curves.easeInOut,
              bottom: widget.size * RaccoonPosition.coverPawsBottom,
              right: widget.size * RaccoonPosition.coverPawsLeft,
              width: widget.size * (RaccoonPosition.coverPawsWidth / 2),
              child: Image.asset(
                'assets/raccoon/paws-cover-right.webp',
                fit: BoxFit.contain,
              ),
            ),
          ],
        );
      case RaccoonPawState.peek:
        return Stack(
          clipBehavior: Clip.none,
          children: [
            Positioned(
              bottom: widget.size * RaccoonPosition.coverPawsBottom,
              left: widget.size * RaccoonPosition.coverPawsLeft,
              width: widget.size * (RaccoonPosition.coverPawsWidth / 2),
              child: Image.asset(
                'assets/raccoon/paws-peek-left.webp',
                fit: BoxFit.contain,
              ),
            ),
            Positioned(
              bottom: widget.size * RaccoonPosition.coverPawsBottom,
              right: widget.size * RaccoonPosition.coverPawsLeft,
              width: widget.size * (RaccoonPosition.coverPawsWidth / 2),
              child: Image.asset(
                'assets/raccoon/paws-peek-right.webp',
                fit: BoxFit.contain,
              ),
            ),
          ],
        );
    }
  }
}
