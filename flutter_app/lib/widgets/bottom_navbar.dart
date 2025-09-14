import 'package:flutter/material.dart';

class BottomNavbar extends StatelessWidget {
  final String activeTab;
  final Function(String) onTabChange;
  final bool isDarkMode;

  const BottomNavbar({
    super.key,
    required this.activeTab,
    required this.onTabChange,
    required this.isDarkMode,
  });

  @override
  Widget build(BuildContext context) {
    final navItems = [
      {'id': 'dashboard', 'icon': Icons.home, 'title': 'Dashboard'},
      {'id': 'reports', 'icon': Icons.bar_chart, 'title': 'Report Stats'},
      {'id': 'chat', 'icon': Icons.chat_bubble_outline, 'title': 'AI Chat Bot'},
      {'id': 'profile', 'icon': Icons.person, 'title': 'Profile'},
    ];

    return Container(
      decoration: BoxDecoration(
        color: isDarkMode ? const Color(0xFF1E1E1E) : Colors.white,
        border: Border(
          top: BorderSide(
            color: isDarkMode ? const Color(0xFF3A3A3A) : const Color(0xFFE5E7EB),
            width: 1,
          ),
        ),
      ),
      child: SafeArea(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 8),
          child: LayoutBuilder(
            builder: (context, constraints) {
              return Row(
                mainAxisAlignment: MainAxisAlignment.spaceAround,
                children: navItems.map((item) {
                  final isActive = activeTab == item['id'];
                  return Flexible(
                    child: GestureDetector(
                      onTap: () => onTabChange(item['id'] as String),
                      child: Container(
                        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 8),
                        decoration: BoxDecoration(
                          color: isActive
                              ? (isDarkMode 
                                  ? const Color(0xFFBB86FC).withValues(alpha: 0.2)
                                  : const Color(0xFF3B82F6).withValues(alpha: 0.1))
                              : Colors.transparent,
                          borderRadius: BorderRadius.circular(8),
                        ),
                        child: Column(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            Icon(
                              item['icon'] as IconData,
                              size: 20,
                              color: isActive
                                  ? (isDarkMode ? const Color(0xFFBB86FC) : const Color(0xFF3B82F6))
                                  : (isDarkMode ? const Color(0xFFE0E0E0) : const Color(0xFF6B7280)),
                            ),
                            const SizedBox(height: 4),
                            Text(
                              item['title'] as String,
                              style: TextStyle(
                                fontSize: constraints.maxWidth < 350 ? 10 : 12,
                                fontWeight: FontWeight.w500,
                                color: isActive
                                    ? (isDarkMode ? const Color(0xFFBB86FC) : const Color(0xFF3B82F6))
                                    : (isDarkMode ? const Color(0xFFE0E0E0) : const Color(0xFF6B7280)),
                              ),
                              overflow: TextOverflow.ellipsis,
                              textAlign: TextAlign.center,
                            ),
                          ],
                        ),
                      ),
                    ),
                  );
                }).toList(),
              );
            },
          ),
        ),
      ),
    );
  }
}