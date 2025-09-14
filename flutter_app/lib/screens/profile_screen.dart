import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/app_state_provider.dart';

class ProfileScreen extends StatefulWidget {
  final bool isDarkMode;

  const ProfileScreen({super.key, required this.isDarkMode});

  @override
  State<ProfileScreen> createState() => _ProfileScreenState();
}

class _ProfileScreenState extends State<ProfileScreen> {
  bool _isDrawerOpen = false;
  bool _notificationsEnabled = true;
  bool _showRateFeedback = false;
  bool _showManageFleet = false;
  bool _showSecurityData = false;
  bool _showHelpSupport = false;
  bool _showLanguageSelection = false;
  bool _showAppSettings = false;

  // Organization info matching website exactly
  final organizationInfo = {
    'name': 'Emergency Response Coalition',
    'aboutUs': 'Dedicated to providing rapid disaster response through advanced drone technology and coordinated relief efforts. Serving communities worldwide with precision, speed, and compassion in times of crisis.',
    'established': '2019',
    'activeFleet': '47 Drones',
    'missionsCompleted': '2,847',
    'countries': '23 Countries'
  };

  final userInfo = {
    'name': 'Alex Johnson',
    'role': 'Operations Manager',
    'email': 'alex.johnson@erc.org',
    'phone': '+1 (555) 123-4567',
    'location': 'San Francisco, CA',
    'joinDate': 'March 2022'
  };

  @override
  Widget build(BuildContext context) {
    return Container(
      color: widget.isDarkMode ? const Color(0xFF121212) : const Color(0xFFF8F9FA),
      child: Stack(
        children: [
          // Main Content
          Column(
            children: [
              // Top Bar
              Container(
                padding: const EdgeInsets.all(16),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    IconButton(
                      onPressed: () {},
                      icon: Icon(
                        Icons.arrow_back,
                        color: widget.isDarkMode ? const Color(0xFFE0E0E0) : const Color(0xFF374151),
                      ),
                    ),
                    IconButton(
                      onPressed: () => setState(() => _isDrawerOpen = true),
                      icon: Icon(
                        Icons.menu,
                        color: widget.isDarkMode ? const Color(0xFFE0E0E0) : const Color(0xFF374151),
                      ),
                    ),
                  ],
                ),
              ),
              
              // Profile Content
              Expanded(
                child: SingleChildScrollView(
                  padding: const EdgeInsets.all(16),
                  child: Column(
                    children: [
                      // Organization Card
                      Container(
                        padding: const EdgeInsets.all(32),
                        decoration: BoxDecoration(
                          gradient: LinearGradient(
                            begin: Alignment.topLeft,
                            end: Alignment.bottomRight,
                            colors: widget.isDarkMode
                                ? [const Color(0xFF1E1E1E), const Color(0xFF232323)]
                                : [Colors.white, const Color(0xFFF8FAFC)],
                          ),
                          borderRadius: BorderRadius.circular(16),
                          boxShadow: [
                            BoxShadow(
                              color: Colors.black.withValues(alpha: 0.1),
                              blurRadius: 20,
                              offset: const Offset(0, 4),
                            ),
                          ],
                        ),
                        child: Column(
                          children: [
                            // Organization Logo
                            Container(
                              width: 96,
                              height: 96,
                              decoration: BoxDecoration(
                                gradient: LinearGradient(
                                  begin: Alignment.topLeft,
                                  end: Alignment.bottomRight,
                                  colors: widget.isDarkMode
                                      ? [const Color(0xFFBB86FC), const Color(0xFF03DAC6)]
                                      : [const Color(0xFF3B82F6), const Color(0xFF8B5CF6)],
                                ),
                                borderRadius: BorderRadius.circular(16),
                              ),
                              child: const Icon(
                                Icons.business,
                                size: 48,
                                color: Colors.black,
                              ),
                            ),
                            const SizedBox(height: 24),
                            
                            // Organization Name
                            Text(
                              organizationInfo['name']!,
                              style: TextStyle(
                                fontSize: 24,
                                fontWeight: FontWeight.bold,
                                color: widget.isDarkMode ? Colors.white : const Color(0xFF0F172A),
                              ),
                              textAlign: TextAlign.center,
                            ),
                            const SizedBox(height: 8),
                            
                            // Status Badges
                            Wrap(
                              alignment: WrapAlignment.center,
                              spacing: 8,
                              children: [
                                Container(
                                  padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
                                  decoration: BoxDecoration(
                                    color: widget.isDarkMode 
                                        ? const Color(0xFF03DAC6).withValues(alpha: 0.2) 
                                        : const Color(0xFF10B981).withValues(alpha: 0.1),
                                    borderRadius: BorderRadius.circular(12),
                                    border: Border.all(
                                      color: widget.isDarkMode 
                                          ? const Color(0xFF03DAC6).withValues(alpha: 0.4) 
                                          : const Color(0xFF10B981).withValues(alpha: 0.2),
                                    ),
                                  ),
                                  child: Text(
                                    'Active',
                                    style: TextStyle(
                                      fontSize: 12,
                                      fontWeight: FontWeight.w600,
                                      color: widget.isDarkMode 
                                          ? const Color(0xFF03DAC6) 
                                          : const Color(0xFF10B981),
                                    ),
                                  ),
                                ),
                                Container(
                                  padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
                                  decoration: BoxDecoration(
                                    color: widget.isDarkMode 
                                        ? const Color(0xFFBB86FC).withValues(alpha: 0.2) 
                                        : const Color(0xFF3B82F6).withValues(alpha: 0.1),
                                    borderRadius: BorderRadius.circular(12),
                                    border: Border.all(
                                      color: widget.isDarkMode 
                                          ? const Color(0xFFBB86FC).withValues(alpha: 0.4) 
                                          : const Color(0xFF3B82F6).withValues(alpha: 0.2),
                                    ),
                                  ),
                                  child: Text(
                                    'Verified',
                                    style: TextStyle(
                                      fontSize: 12,
                                      fontWeight: FontWeight.w600,
                                      color: widget.isDarkMode 
                                          ? const Color(0xFFBB86FC) 
                                          : const Color(0xFF3B82F6),
                                    ),
                                  ),
                                ),
                              ],
                            ),
                            const SizedBox(height: 24),
                            
                            // About Text
                            Text(
                              organizationInfo['aboutUs']!,
                              style: TextStyle(
                                fontSize: 14,
                                height: 1.5,
                                color: widget.isDarkMode ? const Color(0xFFE0E0E0) : const Color(0xFF6B7280),
                              ),
                              textAlign: TextAlign.center,
                            ),
                            const SizedBox(height: 24),
                            
                            // Quick Stats Grid
                            LayoutBuilder(
                              builder: (context, constraints) {
                                return GridView.count(
                                  shrinkWrap: true,
                                  physics: const NeverScrollableScrollPhysics(),
                                  crossAxisCount: constraints.maxWidth > 300 ? 2 : 1,
                                  childAspectRatio: constraints.maxWidth > 300 ? 1.5 : 2.5,
                                  mainAxisSpacing: 16,
                                  crossAxisSpacing: 16,
                                  children: [
                                    _buildStatCard(
                                      'Established',
                                      organizationInfo['established']!,
                                      Icons.calendar_today,
                                      widget.isDarkMode ? const Color(0xFFBB86FC) : const Color(0xFF3B82F6),
                                    ),
                                    _buildStatCard(
                                      'Active Fleet',
                                      organizationInfo['activeFleet']!,
                                      Icons.flight,
                                      widget.isDarkMode ? const Color(0xFF03DAC6) : const Color(0xFF8B5CF6),
                                    ),
                                    _buildStatCard(
                                      'Missions',
                                      organizationInfo['missionsCompleted']!,
                                      Icons.emoji_events,
                                      widget.isDarkMode ? const Color(0xFFBB86FC) : const Color(0xFF10B981),
                                    ),
                                    _buildStatCard(
                                      'Coverage',
                                      organizationInfo['countries']!,
                                      Icons.public,
                                      widget.isDarkMode ? const Color(0xFF03DAC6) : const Color(0xFFF59E0B),
                                    ),
                                  ],
                                );
                              },
                            ),
                          ],
                        ),
                      ),
                      
                      const SizedBox(height: 24),
                      
                      // Quick Access Cards
                      Row(
                        children: [
                          Expanded(
                            child: Container(
                              padding: const EdgeInsets.all(24),
                              decoration: BoxDecoration(
                                gradient: LinearGradient(
                                  begin: Alignment.topLeft,
                                  end: Alignment.bottomRight,
                                  colors: widget.isDarkMode
                                      ? [const Color(0xFFBB86FC), const Color(0xFFBB86FC).withValues(alpha: 0.8)]
                                      : [const Color(0xFF3B82F6), const Color(0xFF2563EB)],
                                ),
                                borderRadius: BorderRadius.circular(12),
                                boxShadow: [
                                  BoxShadow(
                                    color: Colors.black.withValues(alpha: 0.1),
                                    blurRadius: 8,
                                    offset: const Offset(0, 2),
                                  ),
                                ],
                              ),
                              child: Column(
                                children: [
                                  Row(
                                    children: [
                                      Container(
                                        padding: const EdgeInsets.all(8),
                                        decoration: BoxDecoration(
                                          color: Colors.black.withValues(alpha: 0.2),
                                          borderRadius: BorderRadius.circular(8),
                                        ),
                                        child: const Icon(
                                          Icons.trending_up,
                                          size: 20,
                                          color: Colors.black,
                                        ),
                                      ),
                                      const SizedBox(width: 12),
                                      const Text(
                                        'Fleet Status',
                                        style: TextStyle(
                                          fontWeight: FontWeight.w600,
                                          color: Colors.black,
                                        ),
                                      ),
                                    ],
                                  ),
                                  const SizedBox(height: 12),
                                  Text(
                                    '12 Active • 3 Maintenance',
                                    style: TextStyle(
                                      fontSize: 14,
                                      color: widget.isDarkMode ? Colors.black.withValues(alpha: 0.7) : Colors.blue.shade100,
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ),
                          const SizedBox(width: 16),
                          Expanded(
                            child: Container(
                              padding: const EdgeInsets.all(24),
                              decoration: BoxDecoration(
                                gradient: LinearGradient(
                                  begin: Alignment.topLeft,
                                  end: Alignment.bottomRight,
                                  colors: widget.isDarkMode
                                      ? [const Color(0xFF03DAC6), const Color(0xFF03DAC6).withValues(alpha: 0.8)]
                                      : [const Color(0xFF10B981), const Color(0xFF059669)],
                                ),
                                borderRadius: BorderRadius.circular(12),
                                boxShadow: [
                                  BoxShadow(
                                    color: Colors.black.withValues(alpha: 0.1),
                                    blurRadius: 8,
                                    offset: const Offset(0, 2),
                                  ),
                                ],
                              ),
                              child: Column(
                                children: [
                                  Row(
                                    children: [
                                      Container(
                                        padding: const EdgeInsets.all(8),
                                        decoration: BoxDecoration(
                                          color: Colors.black.withValues(alpha: 0.2),
                                          borderRadius: BorderRadius.circular(8),
                                        ),
                                        child: const Icon(
                                          Icons.people,
                                          size: 20,
                                          color: Colors.black,
                                        ),
                                      ),
                                      const SizedBox(width: 12),
                                      const Text(
                                        'Team Size',
                                        style: TextStyle(
                                          fontWeight: FontWeight.w600,
                                          color: Colors.black,
                                        ),
                                      ),
                                    ],
                                  ),
                                  const SizedBox(height: 12),
                                  Text(
                                    '24 Operators • 8 Pilots',
                                    style: TextStyle(
                                      fontSize: 14,
                                      color: widget.isDarkMode ? Colors.black.withValues(alpha: 0.7) : Colors.green.shade100,
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
              ),
            ],
          ),
          
          // Sliding Drawer
          if (_isDrawerOpen) ...[
            // Backdrop
            GestureDetector(
              onTap: () => setState(() => _isDrawerOpen = false),
              child: Container(
                color: Colors.black.withValues(alpha: 0.5),
              ),
            ),
            
            // Drawer
            Positioned(
              top: 0,
              right: 0,
              bottom: 0,
              width: 320,
              child: Container(
                decoration: BoxDecoration(
                  gradient: LinearGradient(
                    begin: Alignment.topCenter,
                    end: Alignment.bottomCenter,
                    colors: widget.isDarkMode
                        ? [const Color(0xFF1E1E1E), const Color(0xFF232323)]
                        : [Colors.white, const Color(0xFFF8FAFC)],
                  ),
                ),
                child: Column(
                  children: [
                    // Drawer Header
                    Container(
                      padding: const EdgeInsets.all(24),
                      decoration: BoxDecoration(
                        border: Border(
                          bottom: BorderSide(
                            color: widget.isDarkMode ? const Color(0xFF3A3A3A) : const Color(0xFFE5E7EB),
                          ),
                        ),
                      ),
                      child: Column(
                        children: [
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Text(
                                'Account',
                                style: TextStyle(
                                  fontSize: 20,
                                  fontWeight: FontWeight.w600,
                                  color: widget.isDarkMode ? Colors.white : const Color(0xFF0F172A),
                                ),
                              ),
                              IconButton(
                                onPressed: () => setState(() => _isDrawerOpen = false),
                                icon: Icon(
                                  Icons.close,
                                  color: widget.isDarkMode ? const Color(0xFFE0E0E0) : const Color(0xFF374151),
                                ),
                              ),
                            ],
                          ),
                          const SizedBox(height: 16),
                          Row(
                            children: [
                              CircleAvatar(
                                radius: 24,
                                backgroundColor: widget.isDarkMode ? const Color(0xFFBB86FC) : const Color(0xFF3B82F6),
                                child: const Icon(Icons.person, color: Colors.white),
                              ),
                              const SizedBox(width: 12),
                              Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(
                                    userInfo['name']!,
                                    style: TextStyle(
                                      fontWeight: FontWeight.w500,
                                      color: widget.isDarkMode ? Colors.white : const Color(0xFF0F172A),
                                    ),
                                  ),
                                  Text(
                                    userInfo['role']!,
                                    style: TextStyle(
                                      fontSize: 14,
                                      color: widget.isDarkMode ? const Color(0xFFB0B0B0) : const Color(0xFF6B7280),
                                    ),
                                  ),
                                ],
                              ),
                            ],
                          ),
                        ],
                      ),
                    ),
                    
                    // Menu Items
                    Expanded(
                      child: SingleChildScrollView(
                        padding: const EdgeInsets.all(24),
                        child: Column(
                          children: [
                            _buildMenuItem(
                              icon: Icons.flight,
                              title: 'Manage Fleet',
                              description: 'View and register drones, update firmware',
                              badge: '3',
                              onTap: () {
                                setState(() => _showManageFleet = !_showManageFleet);
                              },
                            ),
                            if (_showManageFleet) _buildManageFleetSection(),
                            _buildMenuItem(
                              icon: Icons.notifications,
                              title: 'Notification Settings',
                              description: 'Customize alerts for missions and incidents',
                              trailing: Switch(
                                value: _notificationsEnabled,
                                onChanged: (value) => setState(() => _notificationsEnabled = value),
                                activeThumbColor: widget.isDarkMode ? const Color(0xFFBB86FC) : const Color(0xFF3B82F6),
                              ),
                            ),
                            _buildMenuItem(
                              icon: Icons.settings,
                              title: 'App Settings',
                              description: 'Units, time zones, preferences',
                              onTap: () {
                                setState(() => _showAppSettings = !_showAppSettings);
                              },
                            ),
                            if (_showAppSettings) _buildAppSettingsSection(),
                            _buildMenuItem(
                              icon: Icons.language,
                              title: 'Language',
                              description: 'English (US)',
                              onTap: () {
                                setState(() => _showLanguageSelection = !_showLanguageSelection);
                              },
                            ),
                            if (_showLanguageSelection) _buildLanguageSection(),
                            _buildMenuItem(
                              icon: widget.isDarkMode ? Icons.light_mode : Icons.dark_mode,
                              title: 'Dark/Light Mode',
                              description: 'Currently ${widget.isDarkMode ? 'Dark' : 'Light'} mode',
                              trailing: Switch(
                                value: widget.isDarkMode,
                                onChanged: (value) {
                                  context.read<AppStateProvider>().toggleDarkMode();
                                },
                                activeThumbColor: widget.isDarkMode ? const Color(0xFFBB86FC) : const Color(0xFF3B82F6),
                              ),
                            ),
                            _buildMenuItem(
                              icon: Icons.star,
                              title: 'Rate & Feedback',
                              description: 'Help us improve the app',
                              onTap: () {
                                setState(() => _showRateFeedback = !_showRateFeedback);
                              },
                            ),
                            if (_showRateFeedback) _buildRateFeedbackSection(),
                            _buildMenuItem(
                              icon: Icons.security,
                              title: 'Security & Data',
                              description: 'Manage roles, permissions, data export',
                              onTap: () {
                                setState(() => _showSecurityData = !_showSecurityData);
                              },
                            ),
                            if (_showSecurityData) _buildSecurityDataSection(),
                            _buildMenuItem(
                              icon: Icons.help,
                              title: 'Help & Support',
                              description: 'FAQs, training, and contact support',
                              onTap: () {
                                setState(() => _showHelpSupport = !_showHelpSupport);
                              },
                            ),
                            if (_showHelpSupport) _buildHelpSupportSection(),
                            _buildMenuItem(
                              icon: Icons.logout,
                              title: 'Logout',
                              description: 'Sign out of your account',
                              onTap: () {
                                context.read<AppStateProvider>().logout();
                                setState(() => _isDrawerOpen = false);
                              },
                            ),
                          ],
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ],
        ],
      ),
    );
  }

  Widget _buildStatCard(String label, String value, IconData icon, Color color) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: color.withValues(alpha: widget.isDarkMode ? 0.2 : 0.1),
        borderRadius: BorderRadius.circular(12),
      ),
      child: Column(
        children: [
          Row(
            children: [
              Icon(
                icon,
                size: 16,
                color: color,
              ),
              const SizedBox(width: 8),
              Text(
                label,
                style: TextStyle(
                  fontSize: 12,
                  color: widget.isDarkMode ? const Color(0xFFB0B0B0) : color.withValues(alpha: 0.7),
                ),
              ),
            ],
          ),
          const SizedBox(height: 4),
          Text(
            value,
            style: TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.bold,
              color: widget.isDarkMode ? Colors.white : color,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildMenuItem({
    required IconData icon,
    required String title,
    String? description,
    String? badge,
    Widget? trailing,
    VoidCallback? onTap,
  }) {
    return Container(
      margin: const EdgeInsets.only(bottom: 8),
      child: Material(
        color: Colors.transparent,
        child: InkWell(
          onTap: onTap,
          borderRadius: BorderRadius.circular(8),
          child: Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: widget.isDarkMode 
                  ? const Color(0xFF2C2C2C).withValues(alpha: 0.5) 
                  : const Color(0xFFF8FAFC),
              borderRadius: BorderRadius.circular(8),
            ),
            child: Row(
              children: [
                Container(
                  padding: const EdgeInsets.all(8),
                  decoration: BoxDecoration(
                    color: widget.isDarkMode 
                        ? const Color(0xFF2C2C2C) 
                        : const Color(0xFFF1F5F9),
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: Icon(
                    icon,
                    size: 20,
                    color: widget.isDarkMode 
                        ? const Color(0xFFBB86FC) 
                        : const Color(0xFF374151),
                  ),
                ),
                const SizedBox(width: 16),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        children: [
                          Text(
                            title,
                            style: TextStyle(
                              fontWeight: FontWeight.w500,
                              color: widget.isDarkMode ? Colors.white : const Color(0xFF0F172A),
                            ),
                          ),
                          if (badge != null) ...[
                            const SizedBox(width: 8),
                            Container(
                              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                              decoration: BoxDecoration(
                                color: Colors.red,
                                borderRadius: BorderRadius.circular(10),
                              ),
                              child: Text(
                                badge,
                                style: const TextStyle(
                                  fontSize: 10,
                                  fontWeight: FontWeight.w600,
                                  color: Colors.white,
                                ),
                              ),
                            ),
                          ],
                        ],
                      ),
                      if (description != null) ...[
                        const SizedBox(height: 4),
                        Text(
                          description,
                          style: TextStyle(
                            fontSize: 14,
                            color: widget.isDarkMode ? const Color(0xFFB0B0B0) : const Color(0xFF6B7280),
                          ),
                        ),
                      ],
                    ],
                  ),
                ),
                if (trailing != null) trailing else const Icon(Icons.chevron_right, color: Colors.grey),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildManageFleetSection() {
    return Container(
      margin: const EdgeInsets.only(left: 16, bottom: 8),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: widget.isDarkMode ? const Color(0xFF2C2C2C) : const Color(0xFFF8FAFC),
        borderRadius: BorderRadius.circular(8),
        border: Border.all(
          color: widget.isDarkMode ? const Color(0xFF3A3A3A) : const Color(0xFFE5E7EB),
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Fleet Management',
            style: TextStyle(
              fontWeight: FontWeight.w600,
              color: widget.isDarkMode ? Colors.white : const Color(0xFF0F172A),
            ),
          ),
          const SizedBox(height: 12),
          _buildFleetItem('DRONE-001', 'MQ-9 Guardian', 'Active', Colors.green),
          _buildFleetItem('DRONE-002', 'DJI Matrice 300', 'Active', Colors.green),
          _buildFleetItem('DRONE-003', 'Autel EVO II Pro', 'Maintenance', Colors.orange),
        ],
      ),
    );
  }

  Widget _buildFleetItem(String id, String model, String status, Color statusColor) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 8),
      child: Row(
        children: [
          Icon(Icons.flight, size: 16, color: statusColor),
          const SizedBox(width: 8),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  id,
                  style: TextStyle(
                    fontWeight: FontWeight.w500,
                    color: widget.isDarkMode ? Colors.white : const Color(0xFF0F172A),
                  ),
                ),
                Text(
                  model,
                  style: TextStyle(
                    fontSize: 12,
                    color: widget.isDarkMode ? const Color(0xFFB0B0B0) : const Color(0xFF6B7280),
                  ),
                ),
              ],
            ),
          ),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
            decoration: BoxDecoration(
              color: statusColor.withValues(alpha: 0.1),
              borderRadius: BorderRadius.circular(12),
            ),
            child: Text(
              status,
              style: TextStyle(
                fontSize: 10,
                fontWeight: FontWeight.w600,
                color: statusColor,
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildAppSettingsSection() {
    return Container(
      margin: const EdgeInsets.only(left: 16, bottom: 8),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: widget.isDarkMode ? const Color(0xFF2C2C2C) : const Color(0xFFF8FAFC),
        borderRadius: BorderRadius.circular(8),
        border: Border.all(
          color: widget.isDarkMode ? const Color(0xFF3A3A3A) : const Color(0xFFE5E7EB),
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'App Settings',
            style: TextStyle(
              fontWeight: FontWeight.w600,
              color: widget.isDarkMode ? Colors.white : const Color(0xFF0F172A),
            ),
          ),
          const SizedBox(height: 12),
          _buildSettingItem('Units', 'Metric (km, kg)', Icons.straighten),
          _buildSettingItem('Time Zone', 'UTC-5 (EST)', Icons.access_time),
          _buildSettingItem('Map Style', 'Satellite View', Icons.map),
        ],
      ),
    );
  }

  Widget _buildLanguageSection() {
    return Container(
      margin: const EdgeInsets.only(left: 16, bottom: 8),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: widget.isDarkMode ? const Color(0xFF2C2C2C) : const Color(0xFFF8FAFC),
        borderRadius: BorderRadius.circular(8),
        border: Border.all(
          color: widget.isDarkMode ? const Color(0xFF3A3A3A) : const Color(0xFFE5E7EB),
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Language Selection',
            style: TextStyle(
              fontWeight: FontWeight.w600,
              color: widget.isDarkMode ? Colors.white : const Color(0xFF0F172A),
            ),
          ),
          const SizedBox(height: 12),
          _buildLanguageItem('English (US)', true),
          _buildLanguageItem('Spanish (ES)', false),
          _buildLanguageItem('French (FR)', false),
        ],
      ),
    );
  }

  Widget _buildRateFeedbackSection() {
    return Container(
      margin: const EdgeInsets.only(left: 16, bottom: 8),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: widget.isDarkMode ? const Color(0xFF2C2C2C) : const Color(0xFFF8FAFC),
        borderRadius: BorderRadius.circular(8),
        border: Border.all(
          color: widget.isDarkMode ? const Color(0xFF3A3A3A) : const Color(0xFFE5E7EB),
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Rate & Feedback',
            style: TextStyle(
              fontWeight: FontWeight.w600,
              color: widget.isDarkMode ? Colors.white : const Color(0xFF0F172A),
            ),
          ),
          const SizedBox(height: 12),
          Row(
            children: List.generate(5, (index) => Icon(
              Icons.star,
              size: 20,
              color: index < 4 ? Colors.amber : Colors.grey,
            )),
          ),
          const SizedBox(height: 8),
          Text(
            'Help us improve DroneOps by sharing your feedback.',
            style: TextStyle(
              fontSize: 12,
              color: widget.isDarkMode ? const Color(0xFFB0B0B0) : const Color(0xFF6B7280),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildSecurityDataSection() {
    return Container(
      margin: const EdgeInsets.only(left: 16, bottom: 8),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: widget.isDarkMode ? const Color(0xFF2C2C2C) : const Color(0xFFF8FAFC),
        borderRadius: BorderRadius.circular(8),
        border: Border.all(
          color: widget.isDarkMode ? const Color(0xFF3A3A3A) : const Color(0xFFE5E7EB),
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Security & Data',
            style: TextStyle(
              fontWeight: FontWeight.w600,
              color: widget.isDarkMode ? Colors.white : const Color(0xFF0F172A),
            ),
          ),
          const SizedBox(height: 12),
          _buildSettingItem('Role', 'Operations Manager', Icons.person),
          _buildSettingItem('Permissions', 'Full Access', Icons.security),
          _buildSettingItem('Data Export', 'Available', Icons.download),
        ],
      ),
    );
  }

  Widget _buildHelpSupportSection() {
    return Container(
      margin: const EdgeInsets.only(left: 16, bottom: 8),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: widget.isDarkMode ? const Color(0xFF2C2C2C) : const Color(0xFFF8FAFC),
        borderRadius: BorderRadius.circular(8),
        border: Border.all(
          color: widget.isDarkMode ? const Color(0xFF3A3A3A) : const Color(0xFFE5E7EB),
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Help & Support',
            style: TextStyle(
              fontWeight: FontWeight.w600,
              color: widget.isDarkMode ? Colors.white : const Color(0xFF0F172A),
            ),
          ),
          const SizedBox(height: 12),
          _buildHelpItem('User Guide', 'Complete setup and usage guide'),
          _buildHelpItem('Video Tutorials', 'Step-by-step video instructions'),
          _buildHelpItem('Contact Support', '24/7 technical assistance'),
        ],
      ),
    );
  }

  Widget _buildSettingItem(String label, String value, IconData icon) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 8),
      child: Row(
        children: [
          Icon(
            icon,
            size: 16,
            color: widget.isDarkMode ? const Color(0xFFBB86FC) : const Color(0xFF3B82F6),
          ),
          const SizedBox(width: 8),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  label,
                  style: TextStyle(
                    fontWeight: FontWeight.w500,
                    color: widget.isDarkMode ? Colors.white : const Color(0xFF0F172A),
                  ),
                ),
                Text(
                  value,
                  style: TextStyle(
                    fontSize: 12,
                    color: widget.isDarkMode ? const Color(0xFFB0B0B0) : const Color(0xFF6B7280),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildLanguageItem(String language, bool isSelected) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 8),
      child: Row(
        children: [
          Icon(
            isSelected ? Icons.radio_button_checked : Icons.radio_button_unchecked,
            size: 16,
            color: isSelected 
                ? (widget.isDarkMode ? const Color(0xFFBB86FC) : const Color(0xFF3B82F6))
                : Colors.grey,
          ),
          const SizedBox(width: 8),
          Text(
            language,
            style: TextStyle(
              fontWeight: isSelected ? FontWeight.w500 : FontWeight.normal,
              color: widget.isDarkMode ? Colors.white : const Color(0xFF0F172A),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildHelpItem(String title, String description) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 8),
      child: Row(
        children: [
          Icon(
            Icons.help_outline,
            size: 16,
            color: widget.isDarkMode ? const Color(0xFFBB86FC) : const Color(0xFF3B82F6),
          ),
          const SizedBox(width: 8),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title,
                  style: TextStyle(
                    fontWeight: FontWeight.w500,
                    color: widget.isDarkMode ? Colors.white : const Color(0xFF0F172A),
                  ),
                ),
                Text(
                  description,
                  style: TextStyle(
                    fontSize: 12,
                    color: widget.isDarkMode ? const Color(0xFFB0B0B0) : const Color(0xFF6B7280),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}