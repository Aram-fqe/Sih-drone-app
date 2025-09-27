import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/app_state_provider.dart';
import '../services/auth_service.dart';
import '../widgets/ui_components.dart';
import 'signup_screen.dart';

class AuthScreen extends StatefulWidget {
  final bool isDarkMode;

  const AuthScreen({super.key, required this.isDarkMode});

  @override
  State<AuthScreen> createState() => _AuthScreenState();
}

class _AuthScreenState extends State<AuthScreen> {
  final _usernameController = TextEditingController();
  final _passwordController = TextEditingController();
  final _authService = AuthService();

  bool _showSOSPanel = false;
  bool _isLoading = false;
  String? _errorMessage;

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

            // Settings Button
            // Positioned(
            //   top: MediaQuery.of(context).padding.top + 24,
            //   left: 24,
            //   child: StyledButton(
            //     onPressed: () {},
            //     backgroundColor: Colors.transparent,
            //     padding: const EdgeInsets.all(0),
            //     child: Container(
            //       width: 48,
            //       height: 48,
            //       decoration: BoxDecoration(
            //         shape: BoxShape.circle,
            //         color: widget.isDarkMode
            //             ? Colors.grey.shade800.withValues(alpha: 0.3)
            //             : Colors.white.withValues(alpha: 0.3),
            //       ),
            //       child: Icon(
            //         Icons.settings,
            //         color: widget.isDarkMode ? Colors.grey.shade300 : Colors.grey.shade700,
            //       ),
            //     ),
            //   ),
            // ),

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
                    child: _buildLoginScreen(),
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

  Future<void> _handleLogin() async {
    setState(() {
      _isLoading = true;
      _errorMessage = null;
    });

    final result = await _authService.login(
      _usernameController.text.trim(),
      _passwordController.text,
    );

    setState(() => _isLoading = false);

    if (result['success']) {
      if (mounted) {
        context.read<AppStateProvider>().completeAuth();
      }
    } else {
      setState(() => _errorMessage = result['message']);
      
      // Show create account dialog if user not found
      if (result['message'].contains('Invalid username or password')) {
        _showCreateAccountDialog();
      }
    }
  }

  void _showCreateAccountDialog() {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        backgroundColor: widget.isDarkMode ? const Color(0xFF1E1E1E) : Colors.white,
        title: Text(
          'No account found',
          style: TextStyle(
            color: widget.isDarkMode ? Colors.white : Colors.grey.shade900,
          ),
        ),
        content: Text(
          'No account found. Do you want to create one?',
          style: TextStyle(
            color: widget.isDarkMode ? const Color(0xFFE0E0E0) : Colors.grey.shade600,
          ),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: Text(
              'Cancel',
              style: TextStyle(
                color: widget.isDarkMode ? Colors.grey.shade400 : Colors.grey.shade600,
              ),
            ),
          ),
          TextButton(
            onPressed: () {
              Navigator.pop(context);
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) => SignupScreen(isDarkMode: widget.isDarkMode),
                ),
              );
            },
            child: Text(
              'Create Account',
              style: TextStyle(
                color: widget.isDarkMode ? const Color(0xFFBB86FC) : Colors.blue.shade600,
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildLoginScreen() {
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

        // Error message
        if (_errorMessage != null)
          Container(
            width: double.infinity,
            padding: const EdgeInsets.all(12),
            margin: const EdgeInsets.only(bottom: 16),
            decoration: BoxDecoration(
              color: Colors.red.shade50,
              borderRadius: BorderRadius.circular(8),
              border: Border.all(color: Colors.red.shade200),
            ),
            child: Text(
              _errorMessage!,
              style: TextStyle(color: Colors.red.shade700),
            ),
          ),

        // Login Form
        TextField(
          controller: _usernameController,
          style: TextStyle(
            color: widget.isDarkMode ? Colors.white : Colors.grey.shade900,
          ),
          decoration: InputDecoration(
            hintText: 'Username',
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
          onPressed: _isLoading ? () {} : () => _handleLogin(),
          backgroundColor: widget.isDarkMode
              ? const Color(0xFFBB86FC)
              : Colors.grey.shade900,
          textColor: widget.isDarkMode ? Colors.black : Colors.white,
          child: Container(
            width: double.infinity,
            height: 48,
            alignment: Alignment.center,
            child: _isLoading
                ? const SizedBox(
                    width: 20,
                    height: 20,
                    child: CircularProgressIndicator(strokeWidth: 2),
                  )
                : const Text(
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
        // StyledButton(
        //   onPressed: () {},
        //   backgroundColor: Colors.transparent,
        //   borderColor: widget.isDarkMode
        //       ? const Color(0xFF3A3A3A)
        //       : Colors.grey.shade300,
        //   child: Container(
        //     width: double.infinity,
        //     height: 48,
        //     alignment: Alignment.center,
        //     child: Row(
        //       mainAxisAlignment: MainAxisAlignment.center,
        //       children: [
        //         Container(
        //           width: 24,
        //           height: 24,
        //           decoration: BoxDecoration(
        //             color: widget.isDarkMode ? Colors.grey.shade700 : Colors.grey.shade200,
        //             shape: BoxShape.circle,
        //           ),
        //           child: Icon(
        //             Icons.g_mobiledata,
        //             size: 16,
        //             color: widget.isDarkMode ? Colors.grey.shade300 : Colors.grey.shade600,
        //           ),
        //         ),
        //         const SizedBox(width: 8),
        //        // Text(
        //           // 'Sign in with Google',
        //           // style: TextStyle(
        //           //   fontSize: 16,
        //           //   fontWeight: FontWeight.w500,
        //           //   color: widget.isDarkMode
        //           //       ? Colors.grey.shade300
        //           //       : Colors.grey.shade700,
        //           // ),
        //         //),
        //       ],
        //     ),
        //   ),
        // ),
        const SizedBox(height: 24),

        // Links
        // TextButton(
        //   onPressed: () {},
        //   child: Text(
        //     'Forgot Password?',
        //     style: TextStyle(
        //       color: widget.isDarkMode
        //           ? const Color(0xFFBB86FC)
        //           : Colors.blue.shade600,
        //     ),
        //   ),
        // ),
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
              onPressed: () => Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) => SignupScreen(isDarkMode: widget.isDarkMode),
                ),
              ),
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
    _usernameController.dispose();
    _passwordController.dispose();
    super.dispose();
  }
}
