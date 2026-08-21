import 'package:flutter/material.dart';

class Walker extends StatelessWidget {
  final Animation<double> position;
  final bool reverse;

  const Walker({
    super.key,
    required this.position,
    this.reverse = false,
  });

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: position,
      builder: (
        context,
        child,
      ) {
        return Positioned(
          left: 4 + (position.value * 115),
          bottom: 4,
          child: Transform.scale(
            scaleX: reverse ? -1 : 1,
            child: SizedBox(
              width: 16,
              height: 25,
              child: Stack(
                children: [
                  // Head

                  Positioned(
                    top: 0,
                    left: 5,
                    child: Container(
                      width: 7,
                      height: 7,
                      decoration: const BoxDecoration(
                        shape: BoxShape.circle,
                        color: Colors.white,
                      ),
                    ),
                  ),

                  // Body

                  Positioned(
                    top: 8,
                    left: 7,
                    child: Container(
                      width: 3,
                      height: 10,
                      decoration: BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.circular(999),
                      ),
                    ),
                  ),

                  // Legs

                  Positioned(
                    top: 18,
                    left: 4,
                    child: Container(
                      width: 2,
                      height: 7,
                      color: Colors.white,
                    ),
                  ),

                  Positioned(
                    top: 18,
                    right: 4,
                    child: Container(
                      width: 2,
                      height: 7,
                      color: Colors.white,
                    ),
                  ),

                  // Arms

                  Positioned(
                    top: 10,
                    left: 1,
                    child: Container(
                      width: 2,
                      height: 8,
                      color: Colors.white,
                    ),
                  ),

                  Positioned(
                    top: 10,
                    right: 1,
                    child: Container(
                      width: 2,
                      height: 8,
                      color: Colors.white,
                    ),
                  ),
                ],
              ),
            ),
          ),
        );
      },
    );
  }
}
