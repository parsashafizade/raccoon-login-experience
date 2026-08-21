import 'package:flutter/material.dart';

import '../models/login_submit_state.dart';
import 'login_scene/entry_scene.dart';

class PrimaryButton extends StatelessWidget {
  final String text;

  final VoidCallback onPressed;

  final LoginSubmitState state;

  final EntryResult? animationResult;

  const PrimaryButton({
    super.key,
    required this.text,
    required this.onPressed,
    this.state = LoginSubmitState.idle,
    this.animationResult,
  });

  bool get isAnimating {
    return state == LoginSubmitState.successAnimation ||
        state == LoginSubmitState.failureAnimation;
  }

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: double.infinity,
      height: 52,
      child: DecoratedBox(
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(16),
          gradient: const LinearGradient(
            colors: [
              Color(0xFF8BB4FF),
              Color(0xFF5D8EFF),
            ],
          ),
        ),
        child: FilledButton(
          onPressed: state == LoginSubmitState.idle ? onPressed : null,
          style: FilledButton.styleFrom(
            backgroundColor: Colors.transparent,
            shadowColor: Colors.transparent,
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(16),
            ),
          ),
          child: isAnimating
              ? EntryScene(
                  result: animationResult!,
                )
              : Text(
                  state == LoginSubmitState.checking
                      ? 'Checking...'
                      : state == LoginSubmitState.success
                          ? 'Welcome back!'
                          : text,
                  style: const TextStyle(
                    color: Colors.white,
                    fontWeight: FontWeight.w600,
                  ),
                ),
        ),
      ),
    );
  }
}
