import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/app_state_provider.dart';
import '../widgets/ui_components.dart';

class AuthScreen extends StatefulWidget {
  final bool isDarkMode;

  const AuthScreen({super.key, required this.isDarkMode});

  @override
  State<AuthScreen> createState() => _AuthScreenState();
}

class _AuthScreenState extends State<AuthScreen> {
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  final _fullNameController = TextEditingController();
  final _confirmPasswordController = TextEditingController();

  String _currentScreen = 'welcome'; // welcome, signup, reset
  bool _showSOSPanel = false;

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        gradient: widget.isDarkMode
            ? null
            : const LinearGradient(
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
                colors: [Color(0xFFF8FAFC), Color(0xFFEFF6FF)],
              ),
        color: widget.isDarkMode ? const Color(0xFF121212) : null,
      ),
      child: Scaffold(
        backgroundColor: Colors.transparent,
        body: Stack(
          children: [
            // SOS Button
            Positioned(
              top: MediaQuery.of(context).padding.top + 24,
              right: 24,
              child: StyledButton(
                onPressed: () => setState(() => _showSOSPanel = true),
                backgroundColor: Colors.red.shade600,
                padding: const EdgeInsets.all(0),
                borderRadius: BorderRadius.circular(24),
                child: Container(
                  width: 48,
                  height: 48,
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    gradient: LinearGradient(
                      colors: [Colors.red.shade600, Colors.red.shade700],
                    ),
                  ),
                  child: const Icon(Icons.warning_amber_rounded, color: Colors.white),
                ),
              ),
            ),

            // Settings Button (only on welcome screen)
            if (_currentScreen == 'welcome') Positioned(
              top: MediaQuery.of(context).padding.top + 24,
              left: 24,
              child: StyledButton(
                onPressed: () {},
                backgroundColor: Colors.transparent,
                padding: const EdgeInsets.all(0),
                child: Container(
                  width: 48,
                  height: 48,
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    color: widget.isDarkMode
                        ? Colors.grey.shade800.withValues(alpha: 0.3)
                        : Colors.white.withValues(alpha: 0.3),
                  ),
                  child: Icon(
                    Icons.settings,
                    color: widget.isDarkMode ? Colors.grey.shade300 : Colors.grey.shade700,
                  ),
                ),
              ),
            ),

            // Main Content
            Center(
              child: SingleChildScrollView(
                padding: const EdgeInsets.symmetric(horizontal: 24),
                child: StyledCard(
                  backgroundColor: widget.isDarkMode
                      ? const Color(0xFF1E1E1E)
                      : Colors.white.withValues(alpha: 0.8),
                  borderColor: widget.isDarkMode
                      ? const Color(0xFF3A3A3A)
                      : Colors.white.withValues(alpha: 0.2),
                  child: Padding(
                    padding: const EdgeInsets.all(32),
                    child: _currentScreen == 'welcome'
                        ? _buildWelcomeScreen()
                        : _currentScreen == 'signup'
                            ? _buildSignupScreen()
                            : _buildResetScreen(),
                  ),
                ),
              ),
            ),

            // SOS Panel
            if (_showSOSPanel) _buildSOSPanel(),
          ],
        ),
      ),
    );
  }

  Widget _buildWelcomeScreen() {
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        // Logo
        Container(
          width: 64,
          height: 64,
          decoration: BoxDecoration(
            color: widget.isDarkMode
                ? const Color(0xFFBB86FC).withValues(alpha: 0.2)
                : Colors.blue.shade50,
            shape: BoxShape.circle,
          ),
          child: Icon(
            Icons.shield,
            size: 32,
            color: widget.isDarkMode
                ? const Color(0xFFBB86FC)
                : Colors.blue.shade600,
          ),
        ),
        const SizedBox(height: 24),

        // Title
        Text(
          'DroneOps',
          style: TextStyle(
            fontSize: 24,
            fontWeight: FontWeight.w600,
            color: widget.isDarkMode ? Colors.white : Colors.grey.shade900,
          ),
        ),
        const SizedBox(height: 8),
        Text(
          'Log in to continue your DroneAssist mission.',
          style: TextStyle(
            fontSize: 14,
            color: widget.isDarkMode
                ? const Color(0xFFE0E0E0)
                : Colors.grey.shade600,
          ),
        ),
        const SizedBox(height: 24),

        // Login Form
        TextField(
          controller: _emailController,
          style: TextStyle(
            color: widget.isDarkMode ? Colors.white : Colors.grey.shade900,
          ),
          decoration: InputDecoration(
            hintText: 'Email',
            hintStyle: TextStyle(
              color: widget.isDarkMode
                  ? Colors.grey.shade600
                  : Colors.grey.shade500,
            ),
            fillColor: widget.isDarkMode
                ? const Color(0xFF2C2C2C)
                : Colors.grey.shade50,
            filled: true,
            border: OutlineInputBorder(
              borderRadius: BorderRadius.circular(12),
              borderSide: BorderSide(
                color: widget.isDarkMode
                    ? const Color(0xFF3A3A3A)
                    : Colors.grey.shade300,
              ),
            ),
            enabledBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(12),
              borderSide: BorderSide(
                color: widget.isDarkMode
                    ? const Color(0xFF3A3A3A)
                    : Colors.grey.shade300,
              ),
            ),
            contentPadding: const EdgeInsets.all(16),
          ),
        ),
        const SizedBox(height: 16),
        TextField(
          controller: _passwordController,
          obscureText: true,
          style: TextStyle(
            color: widget.isDarkMode ? Colors.white : Colors.grey.shade900,
          ),
          decoration: InputDecoration(
            hintText: 'Password',
            hintStyle: TextStyle(
              color: widget.isDarkMode
                  ? Colors.grey.shade600
                  : Colors.grey.shade500,
            ),
            fillColor: widget.isDarkMode
                ? const Color(0xFF2C2C2C)
                : Colors.grey.shade50,
            filled: true,
            border: OutlineInputBorder(
              borderRadius: BorderRadius.circular(12),
              borderSide: BorderSide(
                color: widget.isDarkMode
                    ? const Color(0xFF3A3A3A)
                    : Colors.grey.shade300,
              ),
            ),
            enabledBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(12),
              borderSide: BorderSide(
                color: widget.isDarkMode
                    ? const Color(0xFF3A3A3A)
                    : Colors.grey.shade300,
              ),
            ),
            contentPadding: const EdgeInsets.all(16),
          ),
        ),
        const SizedBox(height: 24),

        // Sign In Button
        StyledButton(
          onPressed: () {
            context.read<AppStateProvider>().completeAuth();
          },
          backgroundColor: widget.isDarkMode
              ? const Color(0xFFBB86FC)
              : Colors.grey.shade900,
          textColor: widget.isDarkMode ? Colors.black : Colors.white,
          child: Container(
            width: double.infinity,
            height: 48,
            alignment: Alignment.center,
            child: const Text(
              'Sign In',
              style: TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.w500,
              ),
            ),
          ),
        ),
        const SizedBox(height: 16),

        // Google Sign In
        StyledButton(
          onPressed: () {},
          backgroundColor: Colors.transparent,
          borderColor: widget.isDarkMode
              ? const Color(0xFF3A3A3A)
              : Colors.grey.shade300,
          child: Container(
            width: double.infinity,
            height: 48,
            alignment: Alignment.center,
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Container(
                  width: 24,
                  height: 24,
                  decoration: BoxDecoration(
                    color: widget.isDarkMode ? Colors.grey.shade700 : Colors.grey.shade200,
                    shape: BoxShape.circle,
                  ),
                  child: Icon(
                    Icons.g_mobiledata,
                    size: 16,
                    color: widget.isDarkMode ? Colors.grey.shade300 : Colors.grey.shade600,
                  ),
                ),
                const SizedBox(width: 8),
                Text(
                  'Sign in with Google',
                  style: TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.w500,
                    color: widget.isDarkMode
                        ? Colors.grey.shade300
                        : Colors.grey.shade700,
                  ),
                ),
              ],
            ),
          ),
        ),
        const SizedBox(height: 24),

        // Links
        TextButton(
          onPressed: () => setState(() => _currentScreen = 'reset'),
          child: Text(
            'Forgot Password?',
            style: TextStyle(
              color: widget.isDarkMode
                  ? const Color(0xFFBB86FC)
                  : Colors.blue.shade600,
            ),
          ),
        ),
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(
              'New here? ',
              style: TextStyle(
                color: widget.isDarkMode
                    ? const Color(0xFFE0E0E0)
                    : Colors.grey.shade600,
              ),
            ),
            TextButton(
              onPressed: () => setState(() => _currentScreen = 'signup'),
              child: Text(
                'Create an Account',
                style: TextStyle(
                  color: widget.isDarkMode
                      ? const Color(0xFFBB86FC)
                      : Colors.blue.shade600,
                ),
              ),
            ),
          ],
        ),
      ],
    );
  }

  Widget _buildSignupScreen() {
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        // Header
        Container(
          width: 64,
          height: 64,
          decoration: BoxDecoration(
            color: widget.isDarkMode
                ? const Color(0xFF03DAC6).withValues(alpha: 0.2)
                : Colors.green.shade50,
            borderRadius: BorderRadius.circular(16),
          ),
          child: Icon(
            Icons.flight,
            size: 32,
            color: widget.isDarkMode
                ? const Color(0xFF03DAC6)
                : Colors.green.shade600,
          ),
        ),
        const SizedBox(height: 24),

        Text(
          'Create Your Account',
          style: TextStyle(
            fontSize: 24,
            fontWeight: FontWeight.w600,
            color: widget.isDarkMode ? Colors.white : Colors.grey.shade900,
          ),
        ),
        const SizedBox(height: 8),
        Text(
          'Join DroneAssist and help deliver hope.',
          style: TextStyle(
            fontSize: 14,
            color: widget.isDarkMode
                ? const Color(0xFFE0E0E0)
                : Colors.grey.shade600,
          ),
        ),
        const SizedBox(height: 24),

        // Signup Form
        TextField(
          controller: _fullNameController,
          style: TextStyle(
            color: widget.isDarkMode ? Colors.white : Colors.grey.shade900,
          ),
          decoration: InputDecoration(
            hintText: 'Full Name',
            hintStyle: TextStyle(
              color: widget.isDarkMode
                  ? Colors.grey.shade600
                  : Colors.grey.shade500,
            ),
            fillColor: widget.isDarkMode
                ? const Color(0xFF2C2C2C)
                : Colors.grey.shade50,
            filled: true,
            border: OutlineInputBorder(
              borderRadius: BorderRadius.circular(12),
              borderSide: BorderSide(
                color: widget.isDarkMode
                    ? const Color(0xFF3A3A3A)
                    : Colors.grey.shade300,
              ),
            ),
            enabledBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(12),
              borderSide: BorderSide(
                color: widget.isDarkMode
                    ? const Color(0xFF3A3A3A)
                    : Colors.grey.shade300,
              ),
            ),
            contentPadding: const EdgeInsets.all(16),
          ),
        ),
        const SizedBox(height: 16),

        TextField(
          controller: _emailController,
          style: TextStyle(
            color: widget.isDarkMode ? Colors.white : Colors.grey.shade900,
          ),
          decoration: InputDecoration(
            hintText: 'Email',
            hintStyle: TextStyle(
              color: widget.isDarkMode
                  ? Colors.grey.shade600
                  : Colors.grey.shade500,
            ),
            fillColor: widget.isDarkMode
                ? const Color(0xFF2C2C2C)
                : Colors.grey.shade50,
            filled: true,
            border: OutlineInputBorder(
              borderRadius: BorderRadius.circular(12),
              borderSide: BorderSide(
                color: widget.isDarkMode
                    ? const Color(0xFF3A3A3A)
                    : Colors.grey.shade300,
              ),
            ),
            enabledBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(12),
              borderSide: BorderSide(
                color: widget.isDarkMode
                    ? const Color(0xFF3A3A3A)
                    : Colors.grey.shade300,
              ),
            ),
            contentPadding: const EdgeInsets.all(16),
          ),
        ),
        const SizedBox(height: 16),

        TextField(
          controller: _passwordController,
          obscureText: true,
          style: TextStyle(
            color: widget.isDarkMode ? Colors.white : Colors.grey.shade900,
          ),
          decoration: InputDecoration(
            hintText: 'Password',
            hintStyle: TextStyle(
              color: widget.isDarkMode
                  ? Colors.grey.shade600
                  : Colors.grey.shade500,
            ),
            fillColor: widget.isDarkMode
                ? const Color(0xFF2C2C2C)
                : Colors.grey.shade50,
            filled: true,
            border: OutlineInputBorder(
              borderRadius: BorderRadius.circular(12),
              borderSide: BorderSide(
                color: widget.isDarkMode
                    ? const Color(0xFF3A3A3A)
                    : Colors.grey.shade300,
              ),
            ),
            enabledBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(12),
              borderSide: BorderSide(
                color: widget.isDarkMode
                    ? const Color(0xFF3A3A3A)
                    : Colors.grey.shade300,
              ),
            ),
            contentPadding: const EdgeInsets.all(16),
          ),
        ),
        const SizedBox(height: 16),

        TextField(
          controller: _confirmPasswordController,
          obscureText: true,
          style: TextStyle(
            color: widget.isDarkMode ? Colors.white : Colors.grey.shade900,
          ),
          decoration: InputDecoration(
            hintText: 'Confirm Password',
            hintStyle: TextStyle(
              color: widget.isDarkMode
                  ? Colors.grey.shade600
                  : Colors.grey.shade500,
            ),
            fillColor: widget.isDarkMode
                ? const Color(0xFF2C2C2C)
                : Colors.grey.shade50,
            filled: true,
            border: OutlineInputBorder(
              borderRadius: BorderRadius.circular(12),
              borderSide: BorderSide(
                color: widget.isDarkMode
                    ? const Color(0xFF3A3A3A)
                    : Colors.grey.shade300,
              ),
            ),
            enabledBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(12),
              borderSide: BorderSide(
                color: widget.isDarkMode
                    ? const Color(0xFF3A3A3A)
                    : Colors.grey.shade300,
              ),
            ),
            contentPadding: const EdgeInsets.all(16),
          ),
        ),
        const SizedBox(height: 24),

        // Sign Up Button
        StyledButton(
          onPressed: () {
            context.read<AppStateProvider>().completeAuth();
          },
          backgroundColor: widget.isDarkMode
              ? const Color(0xFFBB86FC)
              : Colors.grey.shade900,
          textColor: widget.isDarkMode ? Colors.black : Colors.white,
          child: Container(
            width: double.infinity,
            height: 48,
            alignment: Alignment.center,
            child: const Text(
              'Sign Up',
              style: TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.w500,
              ),
            ),
          ),
        ),
        const SizedBox(height: 24),

        // Back to Login
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(
              'Already have an account? ',
              style: TextStyle(
                color: widget.isDarkMode
                    ? const Color(0xFFE0E0E0)
                    : Colors.grey.shade600,
              ),
            ),
            TextButton(
              onPressed: () => setState(() => _currentScreen = 'welcome'),
              child: Text(
                'Log In',
                style: TextStyle(
                  color: widget.isDarkMode
                      ? const Color(0xFFBB86FC)
                      : Colors.blue.shade600,
                ),
              ),
            ),
          ],
        ),
      ],
    );
  }

  Widget _buildResetScreen() {
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        Text(
          'Reset Password',
          style: TextStyle(
            fontSize: 24,
            fontWeight: FontWeight.w600,
            color: widget.isDarkMode ? Colors.white : Colors.grey.shade900,
          ),
        ),
        const SizedBox(height: 8),
        Text(
          'We\'ll send you a reset link to your email.',
          style: TextStyle(
            fontSize: 14,
            color: widget.isDarkMode
                ? const Color(0xFFE0E0E0)
                : Colors.grey.shade600,
          ),
        ),
        const SizedBox(height: 24),

        // Email Field
        TextField(
          controller: _emailController,
          style: TextStyle(
            color: widget.isDarkMode ? Colors.white : Colors.grey.shade900,
          ),
          decoration: InputDecoration(
            hintText: 'Email',
            hintStyle: TextStyle(
              color: widget.isDarkMode
                  ? Colors.grey.shade600
                  : Colors.grey.shade500,
            ),
            fillColor: widget.isDarkMode
                ? const Color(0xFF2C2C2C)
                : Colors.grey.shade50,
            filled: true,
            border: OutlineInputBorder(
              borderRadius: BorderRadius.circular(12),
              borderSide: BorderSide(
                color: widget.isDarkMode
                    ? const Color(0xFF3A3A3A)
                    : Colors.grey.shade300,
              ),
            ),
            enabledBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(12),
              borderSide: BorderSide(
                color: widget.isDarkMode
                    ? const Color(0xFF3A3A3A)
                    : Colors.grey.shade300,
              ),
            ),
            contentPadding: const EdgeInsets.all(16),
          ),
        ),
        const SizedBox(height: 24),

        // Send Reset Link Button
        StyledButton(
          onPressed: () => setState(() => _currentScreen = 'welcome'),
          backgroundColor: widget.isDarkMode
              ? const Color(0xFFBB86FC)
              : Colors.grey.shade900,
          textColor: widget.isDarkMode ? Colors.black : Colors.white,
          child: Container(
            width: double.infinity,
            height: 48,
            alignment: Alignment.center,
            child: const Text(
              'Send Reset Link',
              style: TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.w500,
              ),
            ),
          ),
        ),
        const SizedBox(height: 24),

        // Back to Login
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(
              'Remember password? ',
              style: TextStyle(
                color: widget.isDarkMode
                    ? const Color(0xFFE0E0E0)
                    : Colors.grey.shade600,
              ),
            ),
            TextButton(
              onPressed: () => setState(() => _currentScreen = 'welcome'),
              child: Text(
                'Log In',
                style: TextStyle(
                  color: widget.isDarkMode
                      ? const Color(0xFFBB86FC)
                      : Colors.blue.shade600,
                ),
              ),
            ),
          ],
        ),
      ],
    );
  }

  Widget _buildSOSPanel() {
    return GestureDetector(
      onTap: () => setState(() => _showSOSPanel = false),
      child: Container(
        color: Colors.black.withValues(alpha: 0.5),
        child: Center(
          child: Container(
            margin: const EdgeInsets.all(24),
            child: StyledCard(
              backgroundColor: widget.isDarkMode
                  ? const Color(0xFF1E1E1E)
                  : Colors.white,
              child: Padding(
                padding: const EdgeInsets.all(24),
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Container(
                      width: 64,
                      height: 64,
                      decoration: BoxDecoration(
                        color: Colors.red.shade100,
                        shape: BoxShape.circle,
                      ),
                      child: Icon(
                        Icons.warning_amber_rounded,
                        size: 32,
                        color: Colors.red.shade600,
                      ),
                    ),
                    const SizedBox(height: 16),
                    Text(
                      'Emergency Quick Access',
                      style: TextStyle(
                        fontSize: 20,
                        fontWeight: FontWeight.w600,
                        color: widget.isDarkMode ? Colors.white : Colors.grey.shade900,
                      ),
                    ),
                    const SizedBox(height: 8),
                    Text(
                      'In critical situations, DroneOps provides immediate support. Access essential features swiftly to ensure rapid response and assistance.',
                      textAlign: TextAlign.center,
                      style: TextStyle(
                        color: widget.isDarkMode
                            ? const Color(0xFFE0E0E0)
                            : Colors.grey.shade600,
                      ),
                    ),
                    const SizedBox(height: 24),
                    StyledButton(
                      onPressed: () {},
                      backgroundColor: Colors.red.shade600,
                      child: Container(
                        width: double.infinity,
                        height: 48,
                        alignment: Alignment.center,
                        child: const Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Icon(Icons.warning_amber_rounded, color: Colors.white, size: 20),
                            SizedBox(width: 8),
                            Text('Call for Drone Support', style: TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.w500)),
                          ],
                        ),
                      ),
                    ),
                    const SizedBox(height: 12),
                    StyledButton(
                      onPressed: () => setState(() => _showSOSPanel = false),
                      backgroundColor: Colors.transparent,
                      borderColor: widget.isDarkMode
                          ? const Color(0xFF3A3A3A)
                          : Colors.grey.shade300,
                      child: Container(
                        width: double.infinity,
                        height: 48,
                        alignment: Alignment.center,
                        child: Text(
                          'Cancel',
                          style: TextStyle(
                            color: widget.isDarkMode
                                ? Colors.grey.shade300
                                : Colors.grey.shade700,
                            fontSize: 16,
                            fontWeight: FontWeight.w500,
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }

  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    _fullNameController.dispose();
    _confirmPasswordController.dispose();
    super.dispose();
  }
}
