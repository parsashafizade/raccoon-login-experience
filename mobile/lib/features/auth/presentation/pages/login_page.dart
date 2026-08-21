import 'package:flutter/material.dart';

import '../widgets/login_background.dart';
import '../widgets/login_header.dart';
import '../widgets/login_field.dart';
import '../widgets/login_options.dart';
import '../widgets/primary_button.dart';
import '../widgets/social_button.dart';
import '../widgets/login_layout.dart';
import '../widgets/raccoon/models/raccoon_eye_state.dart';
import '../widgets/raccoon/models/raccoon_paw_state.dart';

class LoginPage extends StatefulWidget {
  const LoginPage({
    super.key,
  });

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final usernameController = TextEditingController();

  final passwordController = TextEditingController();
  final usernameFocusNode = FocusNode();
  final passwordFocusNode = FocusNode();
  RaccoonEyeState eyeState = RaccoonEyeState.idle;
  int usernameLength = 0;
  int passwordLength = 0;
  RaccoonPawState pawState = RaccoonPawState.rest;

  bool passwordVisible = false;
  @override
  void initState() {
    super.initState();

    usernameFocusNode.addListener(() {
      if (usernameFocusNode.hasFocus) {
        setState(() {
          eyeState = RaccoonEyeState.username;
          pawState = RaccoonPawState.rest;
        });
      }
    });

    passwordFocusNode.addListener(() {
      if (passwordFocusNode.hasFocus) {
        setState(() {
          eyeState = RaccoonEyeState.password;

          pawState = RaccoonPawState.cover;
        });
      }
    });
    usernameController.addListener(() {
      if (usernameFocusNode.hasFocus) {
        setState(() {
          usernameLength = usernameController.text.length;

          if (usernameLength > 8) {
            eyeState = RaccoonEyeState.usernameLongTyping;
          } else if (usernameLength > 0) {
            eyeState = RaccoonEyeState.usernameTyping;
          } else {
            eyeState = RaccoonEyeState.username;
          }
        });
      }
    });

    passwordController.addListener(() {
      if (passwordFocusNode.hasFocus) {
        setState(() {
          passwordLength = passwordController.text.length;
          if (passwordLength > 8) {
            eyeState = RaccoonEyeState.passwordLongTyping;
          } else if (passwordLength > 0) {
            eyeState = RaccoonEyeState.passwordTyping;
          } else {
            eyeState = RaccoonEyeState.password;
          }
        });
      }
    });
  }

  @override
  void dispose() {
    usernameController.dispose();
    passwordController.dispose();

    usernameFocusNode.dispose();
    passwordFocusNode.dispose();

    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: LoginBackground(
        child: SafeArea(
          child: LayoutBuilder(
            builder: (
              context,
              constraints,
            ) {
              return SingleChildScrollView(
                padding: const EdgeInsets.all(24),
                child: ConstrainedBox(
                  constraints: BoxConstraints(
                    minHeight: constraints.maxHeight,
                  ),
                  child: Center(
                    child: Stack(
                      clipBehavior: Clip.none,
                      alignment: Alignment.center,
                      children: [
                        /*
                         * Raccoon anchor.
                         *
                         * Phase 3 will place the mascot here.
                         *
                         * Keeping this layer separated prevents
                         * layout breaking when animation is added.
                         */

                        ConstrainedBox(
                          constraints: const BoxConstraints(
                            maxWidth: 430,
                          ),
                          child: LoginLayout(
                            eyeState: eyeState,
                            pawState: pawState,
                            child: Column(
                              mainAxisSize: MainAxisSize.min,
                              children: [
                                const LoginHeader(),
                                const SizedBox(
                                  height: 18,
                                ),
                                LoginField(
                                  label: 'Username',
                                  hint: 'Enter username',
                                  controller: usernameController,
                                  focusNode: usernameFocusNode,
                                ),
                                const SizedBox(
                                  height: 10,
                                ),
                                LoginField(
                                  label: 'Password',
                                  hint: 'Enter password',
                                  controller: passwordController,
                                  focusNode: passwordFocusNode,
                                  obscureText: !passwordVisible,
                                  showVisibilityIcon: true,
                                  onVisibilityPressed: () {
                                    setState(() {
                                      passwordVisible = !passwordVisible;
                                    });
                                  },
                                ),
                                const SizedBox(
                                  height: 10,
                                ),
                                const LoginOptions(),
                                const SizedBox(
                                  height: 14,
                                ),
                                PrimaryButton(
                                  text: 'Sign in',
                                  onPressed: () {},
                                ),
                                const SizedBox(
                                  height: 14,
                                ),
                                const Divider(),
                                const SizedBox(
                                  height: 14,
                                ),
                                Row(
                                  children: [
                                    Expanded(
                                      child: SocialButton(
                                        text: 'Google',
                                        icon: const Icon(
                                          Icons.g_mobiledata,
                                        ),
                                        onPressed: () {},
                                      ),
                                    ),
                                    const SizedBox(
                                      width: 12,
                                    ),
                                    Expanded(
                                      child: SocialButton(
                                        text: 'Apple',
                                        icon: const Icon(
                                          Icons.apple,
                                        ),
                                        onPressed: () {},
                                      ),
                                    ),
                                  ],
                                ),
                                const SizedBox(
                                  height: 18,
                                ),
                                TextButton(
                                  onPressed: () {},
                                  child: const Text(
                                    "Don't have an account? Create account",
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              );
            },
          ),
        ),
      ),
    );
  }
}
