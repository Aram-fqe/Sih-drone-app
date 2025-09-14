import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/app_state_provider.dart';

class AlertsSection extends StatefulWidget {
  final bool isDarkMode;

  const AlertsSection({super.key, required this.isDarkMode});

  @override
  State<AlertsSection> createState() => _AlertsSectionState();
}

class _AlertsSectionState extends State<AlertsSection> {
  bool _expanded = false;

  @override
  Widget build(BuildContext context) {
    return Consumer<AppStateProvider>(
      builder: (context, appState, child) {
        final alerts = appState.alerts;
        
        return Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Header - Always Visible (matches website exactly)
            GestureDetector(
              onTap: () => setState(() => _expanded = !_expanded),
              child: Container(
                width: double.infinity,
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: widget.isDarkMode ? const Color(0xFF1E1E1E) : Colors.white,
                  borderRadius: BorderRadius.circular(8),
                  border: Border.all(
                    color: widget.isDarkMode ? const Color(0xFF3A3A3A) : const Color(0xFFE5E7EB),
                    width: 2,
                  ),
                  boxShadow: [
                    BoxShadow(
                      color: Colors.black.withValues(alpha: 0.1),
                      blurRadius: 8,
                      offset: const Offset(0, 2),
                    ),
                  ],
                ),
                child: LayoutBuilder(
                  builder: (context, constraints) {
                    return Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Flexible(
                          child: Row(
                            mainAxisSize: MainAxisSize.min,
                            children: [
                              Icon(
                                Icons.warning,
                                size: 20,
                                color: widget.isDarkMode ? const Color(0xFFCF6679) : const Color(0xFFEF4444),
                              ),
                              const SizedBox(width: 12),
                              Flexible(
                                child: Text(
                                  'System Alerts (${alerts.length})',
                                  style: TextStyle(
                                    fontSize: 16,
                                    fontWeight: FontWeight.w600,
                                    color: widget.isDarkMode ? Colors.white : const Color(0xFF0F172A),
                                  ),
                                  overflow: TextOverflow.ellipsis,
                                ),
                              ),
                            ],
                          ),
                        ),
                        Icon(
                          _expanded ? Icons.keyboard_arrow_down : Icons.keyboard_arrow_right,
                          color: widget.isDarkMode ? const Color(0xFFB0B0B0) : const Color(0xFF6B7280),
                        ),
                      ],
                    );
                  },
                ),
              ),
            ),
            
            // Expandable Content (matches website exactly)
            AnimatedContainer(
              duration: const Duration(milliseconds: 300),
              height: _expanded ? null : 0,
              child: _expanded ? Column(
                children: [
                  const SizedBox(height: 12),
                  ...alerts.map((alert) => Padding(
                    padding: const EdgeInsets.only(bottom: 12),
                    child: _buildAlertCard(
                      icon: _getAlertIcon(alert.type),
                      iconColor: _getAlertColor(alert.severity),
                      title: alert.title,
                      message: alert.message,
                      time: alert.timestamp,
                      priority: alert.severity,
                      type: alert.type,
                    ),
                  )),
                ],
              ) : const SizedBox.shrink(),
            ),
          ],
        );
      },
    );
  }

  Widget _buildAlertCard({
    required IconData icon,
    required Color iconColor,
    required String title,
    required String message,
    required String time,
    required String priority,
    required String type,
  }) {
    // Get severity styles matching website exactly
    final severityStyles = _getSeverityStyles(priority);
    
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment.centerLeft,
          end: Alignment.centerRight,
          colors: severityStyles['gradientColors'] as List<Color>,
        ),
        borderRadius: BorderRadius.circular(8),
        border: Border.all(
          color: severityStyles['borderColor'] as Color,
          width: 2,
        ),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.1),
            blurRadius: 8,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            width: 40,
            height: 40,
            decoration: BoxDecoration(
              color: severityStyles['iconBgColor'] as Color,
              borderRadius: BorderRadius.circular(8),
            ),
            child: Icon(
              icon,
              color: severityStyles['iconColor'] as Color,
              size: 20,
            ),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                LayoutBuilder(
                  builder: (context, constraints) {
                    return Row(
                      children: [
                        Expanded(
                          child: Text(
                            title,
                            style: TextStyle(
                              fontSize: 14,
                              fontWeight: FontWeight.w600,
                              color: widget.isDarkMode ? Colors.white : const Color(0xFF0F172A),
                            ),
                            overflow: TextOverflow.ellipsis,
                          ),
                        ),
                        const SizedBox(width: 8),
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                          decoration: BoxDecoration(
                            color: _getPriorityBadgeColor(priority),
                            borderRadius: BorderRadius.circular(12),
                          ),
                          child: Text(
                            priority,
                            style: TextStyle(
                              fontSize: 10,
                              fontWeight: FontWeight.w600,
                              color: _getPriorityBadgeTextColor(priority),
                            ),
                          ),
                        ),
                      ],
                    );
                  },
                ),
                const SizedBox(height: 8),
                Text(
                  message,
                  style: TextStyle(
                    fontSize: 14,
                    color: widget.isDarkMode ? const Color(0xFFE0E0E0) : const Color(0xFF374151),
                  ),
                ),
                const SizedBox(height: 8),
                Wrap(
                  children: [
                    Text(
                      type,
                      style: TextStyle(
                        fontSize: 12,
                        color: widget.isDarkMode ? const Color(0xFFB0B0B0) : const Color(0xFF6B7280),
                      ),
                    ),
                    Text(
                      ' • ',
                      style: TextStyle(
                        fontSize: 12,
                        color: widget.isDarkMode ? const Color(0xFFB0B0B0) : const Color(0xFF9CA3AF),
                      ),
                    ),
                    Text(
                      time,
                      style: TextStyle(
                        fontSize: 12,
                        color: widget.isDarkMode ? const Color(0xFFB0B0B0) : const Color(0xFF6B7280),
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Map<String, dynamic> _getSeverityStyles(String severity) {
    switch (severity) {
      case 'critical':
        return widget.isDarkMode ? {
          'gradientColors': [const Color(0xFFCF6679).withValues(alpha: 0.2), const Color(0xFFCF6679).withValues(alpha: 0.1)],
          'borderColor': const Color(0xFFCF6679).withValues(alpha: 0.3),
          'iconBgColor': const Color(0xFFCF6679).withValues(alpha: 0.3),
          'iconColor': const Color(0xFFCF6679),
        } : {
          'gradientColors': [const Color(0xFFFEF2F2), const Color(0xFFFEE2E2)],
          'borderColor': const Color(0xFFFCA5A5),
          'iconBgColor': const Color(0xFFFEE2E2),
          'iconColor': const Color(0xFFEF4444),
        };
      case 'warning':
        return widget.isDarkMode ? {
          'gradientColors': [const Color(0xFFFFB74D).withValues(alpha: 0.2), const Color(0xFFFFB74D).withValues(alpha: 0.1)],
          'borderColor': const Color(0xFFFFB74D).withValues(alpha: 0.3),
          'iconBgColor': const Color(0xFFFFB74D).withValues(alpha: 0.3),
          'iconColor': const Color(0xFFFFB74D),
        } : {
          'gradientColors': [const Color(0xFFFFF7ED), const Color(0xFFFED7AA)],
          'borderColor': const Color(0xFFFBBF24),
          'iconBgColor': const Color(0xFFFED7AA),
          'iconColor': const Color(0xFFF97316),
        };
      default:
        return widget.isDarkMode ? {
          'gradientColors': [const Color(0xFF03DAC6).withValues(alpha: 0.2), const Color(0xFF03DAC6).withValues(alpha: 0.1)],
          'borderColor': const Color(0xFF03DAC6).withValues(alpha: 0.3),
          'iconBgColor': const Color(0xFF03DAC6).withValues(alpha: 0.3),
          'iconColor': const Color(0xFF03DAC6),
        } : {
          'gradientColors': [const Color(0xFFF0FDF4), const Color(0xFFDCFCE7)],
          'borderColor': const Color(0xFF86EFAC),
          'iconBgColor': const Color(0xFFDCFCE7),
          'iconColor': const Color(0xFF10B981),
        };
    }
  }

  Color _getPriorityBadgeColor(String priority) {
    switch (priority) {
      case 'critical':
        return widget.isDarkMode ? const Color(0xFFCF6679) : const Color(0xFFEF4444);
      case 'warning':
        return widget.isDarkMode ? const Color(0xFFFFB74D) : const Color(0xFFF97316);
      default:
        return widget.isDarkMode ? const Color(0xFF03DAC6) : const Color(0xFF10B981);
    }
  }

  Color _getPriorityBadgeTextColor(String priority) {
    switch (priority) {
      case 'critical':
        return Colors.white;
      case 'warning':
        return widget.isDarkMode ? Colors.black : Colors.white;
      default:
        return widget.isDarkMode ? Colors.black : Colors.white;
    }
  }

  IconData _getAlertIcon(String type) {
    switch (type) {
      case 'weather':
        return Icons.cloud;
      case 'geofence':
        return Icons.location_off;
      case 'battery':
        return Icons.battery_alert;
      case 'communication':
        return Icons.signal_wifi_off;
      case 'system':
        return Icons.warning;
      default:
        return Icons.info;
    }
  }

  Color _getAlertColor(String severity) {
    switch (severity) {
      case 'critical':
        return const Color(0xFFEF4444);
      case 'warning':
        return const Color(0xFFF97316);
      case 'info':
        return const Color(0xFF3B82F6);
      default:
        return const Color(0xFF6B7280);
    }
  }
}