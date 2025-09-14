import 'package:flutter/material.dart';

class TopBar extends StatelessWidget {
  final bool isDarkMode;
  final VoidCallback? onSOSClick;

  const TopBar({
    super.key,
    required this.isDarkMode,
    this.onSOSClick,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment.centerLeft,
          end: Alignment.centerRight,
          colors: isDarkMode
              ? [const Color(0xFF1E1E1E), const Color(0xFF222222)]
              : [const Color(0xFF0F172A), const Color(0xFF1E293B)],
        ),
      ),
      child: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Row(
            children: [
              // Logo and Title
              Expanded(
                child: Row(
                  children: [
                    _buildShieldDroneLogo(),
                    const SizedBox(width: 8),
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Text(
                          'DroneOps',
                          style: TextStyle(
                            fontSize: 18,
                            fontWeight: FontWeight.w600,
                            color: isDarkMode ? const Color(0xFFBB86FC) : Colors.white,
                          ),
                        ),
                        Text(
                          'Disaster Response',
                          style: TextStyle(
                            fontSize: 12,
                            color: isDarkMode ? const Color(0xFFE0E0E0) : const Color(0xFFCBD5E1),
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
              
              // SOS Button
              GestureDetector(
                onTap: onSOSClick,
                child: Container(
                  width: 64,
                  height: 64,
                  decoration: BoxDecoration(
                    color: isDarkMode ? const Color(0xFFCF6679) : const Color(0xFFDC2626),
                    shape: BoxShape.circle,
                    border: Border.all(
                      color: isDarkMode 
                          ? const Color(0xFFCF6679).withValues(alpha: 0.3)
                          : const Color(0xFFFCA5A5).withValues(alpha: 0.3),
                      width: 4,
                    ),
                    boxShadow: [
                      BoxShadow(
                        color: isDarkMode 
                            ? const Color(0xFFCF6679).withValues(alpha: 0.3)
                            : const Color(0xFFDC2626).withValues(alpha: 0.3),
                        blurRadius: 8,
                        spreadRadius: 2,
                      ),
                    ],
                  ),
                  child: const Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Icon(
                        Icons.warning,
                        color: Colors.white,
                        size: 24,
                      ),
                      Text(
                        'SOS',
                        style: TextStyle(
                          color: Colors.white,
                          fontSize: 12,
                          fontWeight: FontWeight.w600,
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
  }

  Widget _buildShieldDroneLogo() {
    return SizedBox(
      width: 32,
      height: 32,
      child: Stack(
        children: [
          // Shield outline
          CustomPaint(
            size: const Size(32, 32),
            painter: ShieldPainter(),
          ),
          // Drone icon inside shield
          const Center(
            child: Icon(
              Icons.flight,
              color: Colors.white,
              size: 16,
            ),
          ),
        ],
      ),
    );
  }
}

class ShieldPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = const Color(0xFFA259FF)
      ..style = PaintingStyle.stroke
      ..strokeWidth = 2.0;

    final path = Path();
    final centerX = size.width / 2;
    
    // Shield shape path
    path.moveTo(centerX, 2);
    path.lineTo(3, 6);
    path.lineTo(3, 11);
    path.quadraticBezierTo(3, 23, centerX, 30);
    path.quadraticBezierTo(size.width - 3, 23, size.width - 3, 11);
    path.lineTo(size.width - 3, 6);
    path.close();

    canvas.drawPath(path, paint);
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}