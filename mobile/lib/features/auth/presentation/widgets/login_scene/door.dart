import 'package:flutter/material.dart';

import '../../models/entry_result.dart';

class Door extends StatelessWidget {
  final Animation<double> rotation;
  final Animation<double> light;
  final EntryResult result;

  const Door({
    super.key,
    required this.rotation,
    required this.light,
    required this.result,
  });

  @override
  Widget build(BuildContext context) {
    final isFailure = result == EntryResult.failure;

    return Positioned(
      right: 8,
      bottom: 3,
      child: SizedBox(
        width: 28,
        height: 32,
        child: Stack(
          children: [
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
                  child: AnimatedContainer(
                    duration: const Duration(
                      milliseconds: 200,
                    ),
                    margin: const EdgeInsets.all(3),
                    decoration: BoxDecoration(
                      gradient: LinearGradient(
                        colors: isFailure
                            ? const [
                                Color(0xff7b2936),
                                Color(0xff361522),
                              ]
                            : const [
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
                      decoration: BoxDecoration(
                        gradient: LinearGradient(
                          colors: isFailure
                              ? const [
                                  Colors.transparent,
                                  Color(0xffff5555),
                                ]
                              : const [
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
