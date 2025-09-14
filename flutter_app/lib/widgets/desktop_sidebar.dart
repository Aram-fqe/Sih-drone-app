import 'package:flutter/material.dart';

class DesktopSidebar extends StatelessWidget {
  final String activeTab;
  final Function(String) onTabChange;
  final bool isDarkMode;
  final VoidCallback onSOSClick;

  const DesktopSidebar({
    super.key,
    required this.activeTab,
    required this.onTabChange,
    required this.isDarkMode,
    required this.onSOSClick,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 280,
      decoration: BoxDecoration(
        color: isDarkMode ? const Color(0xFF1E1E1E) : Colors.white,
        border: Border(
          right: BorderSide(
            color: isDarkMode ? const Color(0xFF3A3A3A) : const Color(0xFFE5E7EB),
          ),
        ),
      ),
      child: Column(
        children: [
          // Logo Section
          Container(
            padding: const EdgeInsets.all(24),
            child: Row(
              children: [
                Container(
                  width: 40,
                  height: 40,
                  decoration: BoxDecoration(
                    color: isDarkMode ? const Color(0xFFBB86FC) : const Color(0xFF3B82F6),
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: const Icon(Icons.flight, color: Colors.white, size: 24),
                ),
                const SizedBox(width: 12),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'DroneOps',
                      style: TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                        color: isDarkMode ? Colors.white : const Color(0xFF0F172A),
                      ),
                    ),
                    Text(
                      'Disaster Response',
                      style: TextStyle(
                        fontSize: 12,
                        color: isDarkMode ? const Color(0xFFB0B0B0) : const Color(0xFF6B7280),
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
          
          // Navigation Items
          Expanded(
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              child: Column(
                children: [
                  _buildNavItem(
                    icon: Icons.home,
                    title: 'Dashboard',
                    id: 'dashboard',
                  ),
                  _buildNavItem(
                    icon: Icons.bar_chart,
                    title: 'Report Stats',
                    id: 'reports',
                  ),
                  _buildNavItem(
                    icon: Icons.chat_bubble_outline,
                    title: 'AI Chat Bot',
                    id: 'chat',
                  ),
                  _buildNavItem(
                    icon: Icons.person,
                    title: 'Profile',
                    id: 'profile',
                  ),
                  
                  const Spacer(),
                  
                  // SOS Button
                  Container(
                    width: double.infinity,
                    margin: const EdgeInsets.only(bottom: 24),
                    child: ElevatedButton.icon(
                      onPressed: onSOSClick,
                      icon: const Icon(Icons.warning, size: 20),
                      label: const Text('Emergency SOS'),
                      style: ElevatedButton.styleFrom(
                        backgroundColor: Colors.red,
                        foregroundColor: Colors.white,
                        padding: const EdgeInsets.symmetric(vertical: 16),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(8),
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildNavItem({
    required IconData icon,
    required String title,
    required String id,
  }) {
    final isActive = activeTab == id;
    
    return Container(
      margin: const EdgeInsets.only(bottom: 8),
      child: Material(
        color: Colors.transparent,
        child: InkWell(
          onTap: () => onTabChange(id),
          borderRadius: BorderRadius.circular(8),
          child: Container(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
            decoration: BoxDecoration(
              color: isActive
                  ? (isDarkMode 
                      ? const Color(0xFFBB86FC).withValues(alpha: 0.2)
                      : const Color(0xFF3B82F6).withValues(alpha: 0.1))
                  : Colors.transparent,
              borderRadius: BorderRadius.circular(8),
            ),
            child: Row(
              children: [
                Icon(
                  icon,
                  size: 20,
                  color: isActive
                      ? (isDarkMode ? const Color(0xFFBB86FC) : const Color(0xFF3B82F6))
                      : (isDarkMode ? const Color(0xFFE0E0E0) : const Color(0xFF6B7280)),
                ),
                const SizedBox(width: 12),
                Text(
                  title,
                  style: TextStyle(
                    fontSize: 14,
                    fontWeight: isActive ? FontWeight.w600 : FontWeight.w500,
                    color: isActive
                        ? (isDarkMode ? const Color(0xFFBB86FC) : const Color(0xFF3B82F6))
                        : (isDarkMode ? const Color(0xFFE0E0E0) : const Color(0xFF6B7280)),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}