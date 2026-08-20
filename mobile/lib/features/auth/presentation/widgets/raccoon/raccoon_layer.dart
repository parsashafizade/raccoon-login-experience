import 'package:flutter/material.dart';

import 'raccoon_mascot.dart';

class RaccoonLayer extends StatelessWidget {
  final double size;

  const RaccoonLayer({super.key, required this.size});

  @override
  Widget build(BuildContext context) {
    return SizedBox(width: size, height: size, child: const RaccoonMascot());
  }
}
