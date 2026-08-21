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

import '../models/login_submit_state.dart';
import '../models/entry_result.dart';

import '../../domain/login_credentials.dart';
import '../../domain/auth_result.dart';
import '../../domain/auth_repository.dart';
import '../../domain/validators/login_validator.dart';

class LoginPage extends StatefulWidget {
  final AuthRepository authRepository;

  const LoginPage({
    super.key,
    required this.authRepository,
  });

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final usernameController = TextEditingController();
  final passwordController = TextEditingController();

  final usernameFocusNode = FocusNode();
  final passwordFocusNode = FocusNode();

  LoginSubmitState submitState = LoginSubmitState.idle;

  EntryResult? animationResult;

  String? usernameError;
  String? passwordError;

  RaccoonEyeState eyeState = RaccoonEyeState.idle;

  RaccoonPawState pawState = RaccoonPawState.rest;

  int usernameLength = 0;
  int passwordLength = 0;

  bool passwordVisible = false;

  void _resetStateOnInput() {
    if (!mounted) return;

    setState(() {
      usernameError = null;
      passwordError = null;

      if (submitState != LoginSubmitState.idle &&
          submitState != LoginSubmitState.success) {
        submitState = LoginSubmitState.idle;
        animationResult = null;
      }
    });
  }

  Future<void> _handleLogin() async {
    final validation = LoginValidator.validate(
      username: usernameController.text,
      password: passwordController.text,
    );

    if (validation.hasError) {
      setState(() {
        usernameError = validation.usernameError;
        passwordError = validation.passwordError;
        submitState = LoginSubmitState.failureAnimation;
        animationResult = EntryResult.failure;
      });

      return;
    }

    setState(() {
      usernameError = null;
      passwordError = null;

      submitState = LoginSubmitState.checking;
      animationResult = null;
    });

    final result = await widget.authRepository.login(
      LoginCredentials(
        username: usernameController.text,
        password: passwordController.text,
        rememberMe: false,
      ),
    );

    if (!mounted) return;

    if (result is AuthFailure) {
      setState(() {
        submitState = LoginSubmitState.failureAnimation;
        animationResult = EntryResult.failure;
      });

      return;
    }

    setState(() {
      submitState = LoginSubmitState.successAnimation;
      animationResult = EntryResult.success;
    });
  }

  void _onAnimationComplete() {
    if (!mounted) return;

    setState(() {
      if (animationResult == EntryResult.success) {
        submitState = LoginSubmitState.success;
      } else {
        submitState = LoginSubmitState.idle;
        animationResult = null;
      }
    });
  }

  @override
  void initState() {
    super.initState();

    usernameController.addListener(() {
      _resetStateOnInput();

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
      _resetStateOnInput();

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
                    child: ConstrainedBox(
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
                            const SizedBox(height: 18),
                            LoginField(
                              label: 'Username',
                              hint: 'Enter username',
                              controller: usernameController,
                              focusNode: usernameFocusNode,
                              errorText: usernameError,
                            ),
                            const SizedBox(height: 10),
                            LoginField(
                              label: 'Password',
                              hint: 'Enter password',
                              controller: passwordController,
                              focusNode: passwordFocusNode,
                              obscureText: !passwordVisible,
                              errorText: passwordError,
                              showVisibilityIcon: true,
                              onVisibilityPressed: () {
                                setState(() {
                                  passwordVisible = !passwordVisible;

                                  pawState = passwordVisible
                                      ? RaccoonPawState.peek
                                      : RaccoonPawState.cover;
                                });
                              },
                            ),
                            const SizedBox(height: 10),
                            const LoginOptions(),
                            const SizedBox(height: 14),
                            PrimaryButton(
                              text: 'Sign in',
                              state: submitState,
                              animationResult: animationResult,
                              onPressed: _handleLogin,
                              onAnimationComplete: _onAnimationComplete,
                            ),
                            const SizedBox(height: 14),
                            const Divider(),
                            const SizedBox(height: 14),
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
                                const SizedBox(width: 12),
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
                            const SizedBox(height: 18),
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
