import 'package:flutter/material.dart';

import 'walker.dart';
import 'door.dart';
import '../../models/entry_result.dart';


class EntryScene extends StatefulWidget {
  final EntryResult result;

  final VoidCallback? onCompleted;

  const EntryScene({
    super.key,
    required this.result,
    this.onCompleted,
  });

  @override
  State<EntryScene> createState() => _EntrySceneState();
}

class _EntrySceneState extends State<EntryScene>
    with SingleTickerProviderStateMixin {
  late AnimationController controller;

  late Animation<double> walkerPosition;

  late Animation<double> doorRotation;

  late Animation<double> doorLight;

  @override
  void initState() {
    super.initState();

    final duration = widget.result == EntryResult.success
        ? const Duration(milliseconds: 2400)
        : const Duration(milliseconds: 3800);

    controller = AnimationController(
      vsync: this,
      duration: duration,
    );

    walkerPosition = Tween<double>(
      begin: 0,
      end: 1,
    ).animate(
      CurvedAnimation(
        parent: controller,
        curve: widget.result == EntryResult.success
            ? const Interval(
                0,
                0.84,
                curve: Curves.easeInOut,
              )
            : const Interval(
                0,
                1,
                curve: Curves.easeInOut,
              ),
      ),
    );

    doorRotation = Tween<double>(
      begin: 0,
      end: 1.25,
    ).animate(
      CurvedAnimation(
        parent: controller,
        curve: widget.result == EntryResult.success
            ? const Interval(
                0.40,
                0.75,
                curve: Curves.easeInOut,
              )
            : const Interval(
                0.40,
                0.55,
                curve: Curves.easeInOut,
              ),
      ),
    );

    doorLight = Tween<double>(
      begin: 0,
      end: 0.8,
    ).animate(
      CurvedAnimation(
        parent: controller,
        curve: widget.result == EntryResult.success
            ? const Interval(
                0.48,
                0.82,
                curve: Curves.easeInOut,
              )
            : const Interval(
                0,
                0,
                curve: Curves.linear,
              ),
      ),
    );

    controller.addStatusListener((status) {
      if (status == AnimationStatus.completed) {
        widget.onCompleted?.call();
      }
    });

    controller.forward();
  }

  @override
  void dispose() {
    controller.dispose();

    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: 164,
      height: 34,
      child: Stack(
        clipBehavior: Clip.none,
        children: [
          Walker(
            position: walkerPosition,
            reverse: widget.result == EntryResult.failure,
          ),
          Door(
            rotation: doorRotation,
            light: doorLight,
          ),
        ],
      ),
    );
  }
}
