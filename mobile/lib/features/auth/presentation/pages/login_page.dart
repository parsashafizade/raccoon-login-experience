import 'package:flutter/material.dart';

import '../widgets/glass_card.dart';
import '../widgets/login_background.dart';
import '../widgets/login_header.dart';
import '../widgets/login_field.dart';


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

          child: Center(

            child: SingleChildScrollView(

              padding:
                  const EdgeInsets.all(24),

              child: ConstrainedBox(

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
                        label: 'Username',
                        hint: 'Enter username',
                        controller:
                            usernameController,
                      ),


                      const SizedBox(
                        height: 16,
                      ),


                      LoginField(
                        label: 'Password',
                        hint: 'Enter password',
                        controller:
                            passwordController,

                        obscureText: true,
                      ),
                    ],
                  ),
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}
