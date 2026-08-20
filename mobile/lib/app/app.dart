import 'package:flutter/material.dart';

import 'theme/app_theme.dart';

class RaccoonLoginApp extends StatelessWidget {
  const RaccoonLoginApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Raccoon Login',

      debugShowCheckedModeBanner: false,

      theme: AppTheme.dark(),

      home: const Scaffold(
        body: Center(
          child: Text(
            'Raccoon Login',
          ),
        ),
      ),
    );
  }
}
