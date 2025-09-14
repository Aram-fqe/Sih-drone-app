import 'package:flutter/material.dart';

class DesktopHeader extends StatelessWidget {
  final String title;
  final bool isDarkMode;
  final VoidCallback? onAddClick;

  const DesktopHeader({
    super.key,
    required this.title,
    required this.isDarkMode,
    this.onAddClick,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(24),
      decoration: BoxDecoration(
        color: isDarkMode ? const Color(0xFF1E1E1E) : Colors.white,
        border: Border(
          bottom: BorderSide(
            color: isDarkMode ? const Color(0xFF3A3A3A) : const Color(0xFFE5E7EB),
          ),
        ),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(
            title,
            style: TextStyle(
              fontSize: 24,
              fontWeight: FontWeight.bold,
              color: isDarkMode ? Colors.white : const Color(0xFF0F172A),
            ),
          ),
          if (onAddClick != null)
            ElevatedButton.icon(
              onPressed: onAddClick,
              icon: const Icon(Icons.add, size: 20),
              label: const Text('Add Mission'),
              style: ElevatedButton.styleFrom(
                backgroundColor: isDarkMode ? const Color(0xFF03DAC6) : const Color(0xFF3B82F6),
                foregroundColor: isDarkMode ? Colors.black : Colors.white,
                padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(8),
                ),
                elevation: 2,
              ),
            ),
        ],
      ),
    );
  }
}