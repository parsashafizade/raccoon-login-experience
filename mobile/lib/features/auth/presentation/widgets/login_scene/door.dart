import 'package:flutter/material.dart';

class Door extends StatelessWidget {
  final Animation<double> rotation;
  final Animation<double> light;

  const Door({
    super.key,
    required this.rotation,
    required this.light,
  });

  @override
  Widget build(BuildContext context) {
    return Positioned(
      right: 8,
      bottom: 3,
      child: SizedBox(
        width: 28,
        height: 32,
        child: Stack(
          children: [
            Container(
              decoration: BoxDecoration(
                border: Border.all(
                  color: Colors.white,
                  width: 2,
                ),
                borderRadius: const BorderRadius.vertical(
                  top: Radius.circular(2),
                ),
              ),
            ),
            AnimatedBuilder(
              animation: rotation,
              builder: (
                context,
                child,
              ) {
                return Transform(
                  alignment: Alignment.centerRight,
                  transform: Matrix4.identity()
                    ..setEntry(
                      3,
                      2,
                      0.002,
                    )
                    ..rotateY(
                      rotation.value,
                    ),
                  child: Container(
                    margin: const EdgeInsets.all(3),
                    decoration: const BoxDecoration(
                      gradient: LinearGradient(
                        colors: [
                          Color(0xff173a62),
                          Color(0xff0a1d34),
                        ],
                      ),
                    ),
                  ),
                );
              },
            ),
            AnimatedBuilder(
              animation: light,
              builder: (
                context,
                child,
              ) {
                return Positioned.fill(
                  child: Opacity(
                    opacity: light.value,
                    child: Container(
                      decoration: const BoxDecoration(
                        gradient: LinearGradient(
                          colors: [
                            Colors.transparent,
                            Color(0xffffefc8),
                          ],
                        ),
                      ),
                    ),
                  ),
                );
              },
            ),
          ],
        ),
      ),
    );
  }
}
