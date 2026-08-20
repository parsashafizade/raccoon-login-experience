import 'package:flutter/material.dart';

import '../widgets/glass_card.dart';
import '../widgets/login_background.dart';
import '../widgets/login_header.dart';
import '../widgets/login_field.dart';
import '../widgets/login_options.dart';
import '../widgets/primary_button.dart';
import '../widgets/social_button.dart';


class LoginPage extends StatefulWidget {
  const LoginPage({
    super.key,
  });


  @override
  State<LoginPage> createState() =>
      _LoginPageState();
}



class _LoginPageState
    extends State<LoginPage> {


  final usernameController =
      TextEditingController();


  final passwordController =
      TextEditingController();


  bool passwordVisible = false;



  @override
  void dispose() {

    usernameController.dispose();

    passwordController.dispose();

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

                padding:
                    const EdgeInsets.all(24),


                child: ConstrainedBox(

                  constraints:
                      BoxConstraints(
                    minHeight:
                        constraints.maxHeight -
                        48,
                  ),


                  child: Center(

                    child: Stack(

                      clipBehavior:
                          Clip.none,


                      alignment:
                          Alignment.center,


                      children: [


                        /*
                         * Raccoon anchor.
                         *
                         * Phase 3 will place the mascot here.
                         *
                         * Keeping this layer separated prevents
                         * layout breaking when animation is added.
                         */


                        const SizedBox(
                          width: 0,
                          height: 0,
                        ),



                        ConstrainedBox(

                          constraints:
                              const BoxConstraints(
                            maxWidth: 430,
                          ),


                          child: GlassCard(

                            child: Column(

                              mainAxisSize:
                                  MainAxisSize.min,


                              children: [


                                const LoginHeader(),



                                const SizedBox(
                                  height: 28,
                                ),



                                LoginField(

                                  label:
                                      'Username',

                                  hint:
                                      'Enter username',

                                  controller:
                                      usernameController,
                                ),



                                const SizedBox(
                                  height: 16,
                                ),



                                LoginField(

                                  label:
                                      'Password',

                                  hint:
                                      'Enter password',


                                  controller:
                                      passwordController,


                                  obscureText:
                                      !passwordVisible,


                                  showVisibilityIcon:
                                      true,


                                  onVisibilityPressed:
                                      () {

                                    setState(() {

                                      passwordVisible =
                                          !passwordVisible;

                                    });

                                  },

                                ),



                                const SizedBox(
                                  height: 12,
                                ),



                                const LoginOptions(),



                                const SizedBox(
                                  height: 20,
                                ),



                                PrimaryButton(

                                  text:
                                      'Sign in',


                                  onPressed:
                                      () {},

                                ),



                                const SizedBox(
                                  height: 20,
                                ),



                                const Divider(),



                                const SizedBox(
                                  height: 20,
                                ),



                                SocialButton(

                                  text:
                                      'Continue with Google',


                                  icon:
                                      const Icon(
                                    Icons.g_mobiledata,
                                  ),


                                  onPressed:
                                      () {},

                                ),



                                const SizedBox(
                                  height: 12,
                                ),



                                SocialButton(

                                  text:
                                      'Continue with Apple',


                                  icon:
                                      const Icon(
                                    Icons.apple,
                                  ),


                                  onPressed:
                                      () {},

                                ),



                                const SizedBox(
                                  height: 24,
                                ),



                                TextButton(

                                  onPressed:
                                      () {},


                                  child:
                                      const Text(
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