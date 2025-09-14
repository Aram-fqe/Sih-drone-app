import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/app_state_provider.dart';
import 'onboarding_screen.dart';
import 'auth_screen.dart';
import 'main_screen.dart';

class AppWrapper extends StatelessWidget {
  const AppWrapper({super.key});

  @override
  Widget build(BuildContext context) {
    return Consumer<AppStateProvider>(
      builder: (context, appState, child) {
        switch (appState.appState) {
          case 'onboarding':
            return OnboardingScreen(isDarkMode: appState.isDarkMode);
          case 'auth':
            return AuthScreen(isDarkMode: appState.isDarkMode);
          case 'main':
          default:
            return MainScreen(isDarkMode: appState.isDarkMode);
        }
      },
    );
  }
}