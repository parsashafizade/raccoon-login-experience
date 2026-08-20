import 'package:flutter/material.dart';

import 'glass_card.dart';
import 'raccoon/raccoon_layer.dart';

class LoginLayout extends StatelessWidget {
  final Widget child;

  const LoginLayout({
    super.key,
    required this.child,
  });

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (
        context,
        constraints,
      ) {
        final cardWidth = constraints.maxWidth.clamp(0.0, 430.0);

        final raccoonSize = cardWidth * 0.48;

        final raccoonTop = -(raccoonSize * 0.92);

        return SizedBox(
          width: cardWidth,
          child: Stack(
            clipBehavior: Clip.none,
            alignment: Alignment.topCenter,
            children: [
              GlassCard(
                child: child,
              ),
              Positioned(
                top: raccoonTop,
                left: 0,
                right: 0,
                child: RaccoonLayer(
                  size: raccoonSize,
                ),
              ),
            ],
          ),
        );
      },
    );
  }
}
