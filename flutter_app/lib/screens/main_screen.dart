import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/app_state_provider.dart';
import '../widgets/top_bar.dart';
import '../widgets/bottom_navbar.dart';
import '../widgets/desktop_sidebar.dart';
import '../widgets/desktop_header.dart';
import '../widgets/sos_panel.dart';
import '../widgets/add_mission_modal.dart';
import '../widgets/mission_card.dart';
import '../widgets/alerts_section.dart';
import 'reports_screen.dart';
import 'chatbot_screen.dart';
import 'profile_screen.dart';

class MainScreen extends StatelessWidget {
  final bool isDarkMode;

  const MainScreen({super.key, required this.isDarkMode});

  bool _isDesktop(BuildContext context) {
    final mediaQuery = MediaQuery.of(context);
    final size = mediaQuery.size;
    
    // Use desktop layout based on available space for content
    return size.width > size.height * 1.2 && 
           mediaQuery.orientation == Orientation.landscape;
  }

  @override
  Widget build(BuildContext context) {
    final isDesktop = _isDesktop(context);
    
    return Consumer<AppStateProvider>(
      builder: (context, appState, child) {
        return Scaffold(
          backgroundColor: isDarkMode ? const Color(0xFF121212) : const Color(0xFFF8F9FA),
          body: Stack(
            children: [
              if (isDesktop)
                _buildDesktopLayout(context, appState)
              else
                _buildMobileLayout(context, appState),
              
              ..._buildOverlays(appState),
            ],
          ),
        );
      },
    );
  }



  List<Widget> _buildOverlays(AppStateProvider appState) {
    return [
      if (appState.showSOSPanel)
        Positioned.fill(
          child: SOSPanel(
            isDarkMode: isDarkMode,
            onClose: () => appState.setSOSPanel(false),
          ),
        ),
      if (appState.showAddMissionModal)
        Positioned.fill(
          child: AddMissionModal(
            isDarkMode: isDarkMode,
            onClose: () => appState.setAddMissionModal(false),
          ),
        ),
    ];
  }

  Widget _buildMobileLayout(BuildContext context, AppStateProvider appState) {
    return SafeArea(
      child: Column(
        children: [
          TopBar(
            isDarkMode: isDarkMode,
            onSOSClick: () => appState.toggleSOSPanel(),
          ),
          Expanded(
            child: _buildContent(appState.activeTab, context, appState),
          ),
          BottomNavbar(
            activeTab: appState.activeTab,
            onTabChange: (tab) => appState.setActiveTab(tab),
            isDarkMode: isDarkMode,
          ),
        ],
      ),
    );
  }

  Widget _buildDashboardContent(BuildContext context, AppStateProvider appState) {
    return _isDesktop(context) 
        ? _buildDesktopDashboard(appState)
        : _buildMobileDashboard(appState);
  }

  Widget _buildDesktopDashboard(AppStateProvider appState) {
    final missionWidgets = _buildMissionCards(appState.missions);
    
    return CustomScrollView(
      slivers: [
        SliverList(
          delegate: SliverChildBuilderDelegate(
            (context, index) {
              if (index < missionWidgets.length) {
                return missionWidgets[index];
              }
              if (index == missionWidgets.length && appState.missions.isNotEmpty) {
                return const SizedBox(height: 32);
              }
              if (index == missionWidgets.length + (appState.missions.isNotEmpty ? 1 : 0)) {
                return AlertsSection(isDarkMode: isDarkMode);
              }
              return null;
            },
            childCount: missionWidgets.length + (appState.missions.isNotEmpty ? 1 : 0) + 1,
          ),
        ),
      ],
    );
  }

  Widget _buildMobileDashboard(AppStateProvider appState) {
    return Column(
      children: [
        _buildMobileHeader(appState),
        Expanded(
          child: SingleChildScrollView(
            padding: const EdgeInsets.all(16),
            child: Column(
              children: [
                ..._buildMissionCards(appState.missions),
                const SizedBox(height: 24),
                AlertsSection(isDarkMode: isDarkMode),
                const SizedBox(height: 80),
              ],
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildMobileHeader(AppStateProvider appState) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
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
            'Active Missions',
            style: TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.w600,
              color: isDarkMode ? Colors.white : const Color(0xFF0F172A),
            ),
          ),
          ElevatedButton.icon(
            onPressed: () => appState.toggleAddMissionModal(),
            icon: const Icon(Icons.add, size: 16),
            label: const Text('Add'),
            style: ElevatedButton.styleFrom(
              backgroundColor: isDarkMode 
                  ? const Color(0xFF03DAC6) 
                  : const Color(0xFF2563EB),
              foregroundColor: isDarkMode ? Colors.black : Colors.white,
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(8),
              ),
              elevation: 8,
            ),
          ),
        ],
      ),
    );
  }

  List<Widget> _buildMissionCards(List missions) {
    return List.generate(
      missions.length,
      (index) => Padding(
        key: ValueKey('mission-$index'),
        padding: const EdgeInsets.only(bottom: 24),
        child: MissionCard(
          missionData: missions[index],
          isDarkMode: isDarkMode,
        ),
      ),
    );
  }

  Widget _buildDesktopLayout(BuildContext context, AppStateProvider appState) {
    return Row(
      children: [
        DesktopSidebar(
          activeTab: appState.activeTab,
          onTabChange: (tab) => appState.setActiveTab(tab),
          isDarkMode: isDarkMode,
          onSOSClick: () => appState.toggleSOSPanel(),
        ),
        Expanded(
          child: Column(
            children: [
              DesktopHeader(
                title: _getScreenTitle(appState.activeTab),
                isDarkMode: isDarkMode,
                onAddClick: appState.activeTab == 'dashboard' 
                    ? () => appState.toggleAddMissionModal() 
                    : null,
              ),
              Expanded(
                child: Padding(
                  padding: const EdgeInsets.all(32),
                  child: _buildContent(appState.activeTab, context, appState),
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildContent(String activeTab, BuildContext context, AppStateProvider appState) {
    switch (activeTab) {
      case 'reports':
        return ReportsScreen(isDarkMode: isDarkMode);
      case 'chat':
        return ChatbotScreen(isDarkMode: isDarkMode);
      case 'profile':
        return ProfileScreen(isDarkMode: isDarkMode);
      case 'dashboard':
      default:
        return _buildDashboardContent(context, appState);
    }
  }

  String _getScreenTitle(String activeTab) {
    switch (activeTab) {
      case 'reports':
        return 'Report Stats';
      case 'chat':
        return 'AI Chat Bot';
      case 'profile':
        return 'Profile';
      case 'dashboard':
      default:
        return 'Active Missions';
    }
  }
}