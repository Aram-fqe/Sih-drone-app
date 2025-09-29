import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/app_state_provider.dart';
import '../widgets/sos_panel.dart';

class OnboardingScreen extends StatefulWidget {
  final bool isDarkMode;

  const OnboardingScreen({super.key, required this.isDarkMode});

  @override
  State<OnboardingScreen> createState() => _OnboardingScreenState();
}

class _OnboardingScreenState extends State<OnboardingScreen> {
  int currentSlide = 0;
  bool _showSOSPanel = false;

  final List<Map<String, String>> slides = [
    {
      "title": "Welcome to DroneOps",
      "subtitle": "Connecting remote communities with essential supplies and communication during emergencies.",
      "image": "assets/images/onboarding/drone_landscape.jpeg",
      "buttonText": "Next"
    },
    {
      "title": "Rapid Response",
      "subtitle": "Swift delivery of essential medical supplies and communication devices to remote areas affected by disasters.",
      "image": "assets/images/onboarding/drone_delivery.jpeg",
      "buttonText": "Next"
    },
    {
      "title": "Your Privacy is Our Priority",
      "subtitle": "We are deeply committed to protecting your personal information. Our privacy policy details how we collect, use, and safeguard your data, ensuring your safety and security.",
      "image": "",
      "buttonText": "Get Started"
    }
  ];

  void handleNext() {
    if (currentSlide < slides.length - 1) {
      setState(() {
        currentSlide++;
      });
    } else {
      context.read<AppStateProvider>().completeOnboarding();
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: [
          Container(
            decoration: BoxDecoration(
              gradient: widget.isDarkMode 
                ? null 
                : const LinearGradient(
                    begin: Alignment.topRight,
                    end: Alignment.bottomLeft,
                    colors: [Color(0xFFF8FAFC), Color(0xFFEFF6FF)],
                  ),
            ),
            color: widget.isDarkMode ? const Color(0xFF121212) : null,
            child: SafeArea(
              child: Center(
                child: SingleChildScrollView(
                  child: Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 24.0),
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        // Image Section
                        LayoutBuilder(
                          builder: (context, constraints) {
                            final maxWidth = constraints.maxWidth > 320 ? 320.0 : constraints.maxWidth;
                            return Container(
                              width: maxWidth,
                              height: maxWidth * 0.8,
                              margin: const EdgeInsets.only(bottom: 32),
                              decoration: BoxDecoration(
                                color: widget.isDarkMode ? const Color(0xFF1E1E1E) : Colors.white,
                                borderRadius: BorderRadius.circular(16),
                                boxShadow: [
                                  BoxShadow(
                                    color: Colors.black.withValues(alpha: 0.1),
                                    blurRadius: 20,
                                    offset: const Offset(0, 10),
                                  ),
                                ],
                              ),
                              child: ClipRRect(
                                borderRadius: BorderRadius.circular(16),
                                child: _buildSlideContent(),
                              ),
                            );
                          },
                        ),

                        // Text Content
                        Text(
                          slides[currentSlide]["title"]!,
                          style: TextStyle(
                            fontSize: 24,
                            fontWeight: FontWeight.w600,
                            color: widget.isDarkMode ? Colors.white : const Color(0xFF0F172A),
                          ),
                          textAlign: TextAlign.center,
                        ),
                        const SizedBox(height: 16),
                        Text(
                          slides[currentSlide]["subtitle"]!,
                          style: TextStyle(
                            fontSize: 16,
                            height: 1.5,
                            color: widget.isDarkMode ? const Color(0xFFE0E0E0) : const Color(0xFF475569),
                          ),
                          textAlign: TextAlign.center,
                        ),
                        if (currentSlide == 2) ...[
                          const SizedBox(height: 16),
                          TextButton(
                            onPressed: () {},
                            child: Text(
                              'Read our Privacy Policy',
                              style: TextStyle(
                                fontSize: 14,
                                decoration: TextDecoration.underline,
                                color: widget.isDarkMode ? const Color(0xFFBB86FC) : const Color(0xFF2563EB),
                              ),
                            ),
                          ),
                        ],
                        
                        // Progress Dots
                        const SizedBox(height: 32),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: List.generate(
                            slides.length,
                            (index) => Container(
                              width: 8,
                              height: 8,
                              margin: const EdgeInsets.symmetric(horizontal: 4),
                              decoration: BoxDecoration(
                                shape: BoxShape.circle,
                                color: index == currentSlide
                                  ? widget.isDarkMode ? const Color(0xFFBB86FC) : const Color(0xFF2563EB)
                                  : widget.isDarkMode ? const Color(0xFF3A3A3A) : const Color(0xFFCBD5E1),
                              ),
                            ),
                          ),
                        ),
                        const SizedBox(height: 32),

                        // Next Button
                        SizedBox(
                          width: double.infinity,
                          height: 48,
                          child: ElevatedButton(
                            onPressed: handleNext,
                            style: ElevatedButton.styleFrom(
                              backgroundColor: widget.isDarkMode 
                                ? const Color(0xFFBB86FC)
                                : const Color(0xFF0F172A),
                              foregroundColor: widget.isDarkMode ? Colors.black : Colors.white,
                              shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(12),
                              ),
                              elevation: 0,
                            ),
                            child: Row(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                Text(
                                  slides[currentSlide]["buttonText"]!,
                                  style: const TextStyle(
                                    fontSize: 16,
                                    fontWeight: FontWeight.w500,
                                  ),
                                ),
                                if (currentSlide < slides.length - 1) ...[
                                  const SizedBox(width: 8),
                                  const Icon(Icons.chevron_right, size: 20),
                                ],
                              ],
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
          
          // SOS Button
          Positioned(
            top: MediaQuery.of(context).padding.top + 16,
            right: 16,
            child: GestureDetector(
              onTap: () => setState(() => _showSOSPanel = true),
              child: Container(
                width: 48,
                height: 48,
                decoration: BoxDecoration(
                  color: Colors.red.shade600,
                  shape: BoxShape.circle,
                  boxShadow: [
                    BoxShadow(
                      color: Colors.red.withValues(alpha: 0.3),
                      blurRadius: 8,
                      spreadRadius: 2,
                    ),
                  ],
                ),
                child: const Icon(Icons.warning, color: Colors.white, size: 24),
              ),
            ),
          ),
          
          // SOS Panel
          if (_showSOSPanel)
            Positioned.fill(
              child: SOSPanel(
                isDarkMode: widget.isDarkMode,
                onClose: () => setState(() => _showSOSPanel = false),
              ),
            ),
        ],
      ),
    );
  }

  Widget _buildSlideContent() {
    switch (currentSlide) {
      case 0:
        return Image.asset(
          slides[0]["image"]!,
          fit: BoxFit.cover,
          errorBuilder: (context, error, stackTrace) {
            return Container(
              color: widget.isDarkMode ? const Color(0xFF2C2C2C) : const Color(0xFFF1F5F9),
              child: Icon(
                Icons.landscape,
                size: 64,
                color: widget.isDarkMode ? const Color(0xFF3A3A3A) : const Color(0xFFCBD5E1),
              ),
            );
          },
        );
      
      case 1:
        return Stack(
          children: [
            Image.asset(
              slides[1]["image"]!,
              fit: BoxFit.cover,
              width: double.infinity,
              height: double.infinity,
            ),
            Positioned(
              bottom: 16,
              right: 16,
              child: Icon(
                Icons.bolt,
                size: 32,
                color: widget.isDarkMode ? const Color(0xFF03DAC6) : const Color(0xFF2563EB),
              ),
            ),
          ],
        );
      
      case 2:
        return Container(
          decoration: BoxDecoration(
            gradient: widget.isDarkMode
              ? null
              : const LinearGradient(
                  begin: Alignment.topRight,
                  end: Alignment.bottomLeft,
                  colors: [Color(0xFFF3E8FF), Color(0xFFDBEAFE)],
                ),
            color: widget.isDarkMode ? const Color(0xFF2C2C2C) : null,
          ),
          child: Center(
            child: Container(
              width: 96,
              height: 96,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                border: Border.all(
                  color: widget.isDarkMode ? const Color(0xFFBB86FC) : const Color(0xFF9333EA),
                  width: 4,
                ),
                color: widget.isDarkMode 
                  ? const Color(0xFFBB86FC).withValues(alpha: 0.1)
                  : const Color(0xFFF3E8FF),
              ),
              child: Icon(
                Icons.shield_outlined,
                size: 48,
                color: widget.isDarkMode ? const Color(0xFFBB86FC) : const Color(0xFF9333EA),
              ),
            ),
          ),
        );
      
      default:
        return Container();
    }
  }
}