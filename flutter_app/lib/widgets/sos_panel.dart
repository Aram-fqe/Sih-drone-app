import 'package:flutter/material.dart';

class SOSPanel extends StatefulWidget {
  final bool isDarkMode;
  final VoidCallback onClose;

  const SOSPanel({
    super.key,
    required this.isDarkMode,
    required this.onClose,
  });

  @override
  State<SOSPanel> createState() => _SOSPanelState();
}

class _SOSPanelState extends State<SOSPanel> with TickerProviderStateMixin {
  String? selectedEmergency;
  bool showConfirmation = false;
  bool gpsShared = false;
  bool showContacts = false;
  late AnimationController _animationController;
  late Animation<double> _scaleAnimation;

  final recipients = [
    {'name': 'Command Center', 'role': 'Primary Control', 'status': 'active'},
    {'name': 'Field Teams', 'role': 'Ground Response', 'status': 'active'},
    {'name': 'Drone Pilots', 'role': 'Flight Operations', 'status': 'active'},
    {'name': 'Medical Support', 'role': 'Healthcare', 'status': 'inactive'},
  ];

  final emergencyContacts = [
    {'name': 'NDRF Helpline', 'number': '1078', 'icon': '🚨'},
    {'name': 'CISF Emergency', 'number': '1122', 'icon': '🛡️'},
    {'name': 'Local Police', 'number': '100', 'icon': '👮'},
    {'name': 'Medical/Ambulance', 'number': '108', 'icon': '🚑'},
  ];

  @override
  void initState() {
    super.initState();
    _animationController = AnimationController(
      duration: const Duration(milliseconds: 300),
      vsync: this,
    );
    _scaleAnimation = Tween<double>(begin: 0.9, end: 1.0).animate(
      CurvedAnimation(parent: _animationController, curve: Curves.easeOut),
    );
    _animationController.forward();
  }

  @override
  void dispose() {
    _animationController.dispose();
    super.dispose();
  }

  void handleHumanEmergency() {
    setState(() {
      selectedEmergency = 'human';
      gpsShared = true;
      showContacts = true;
    });
  }

  void handleOperationalEmergency() {
    setState(() {
      selectedEmergency = 'operational';
    });
  }

  void handleSendSOS() {
    setState(() {
      showConfirmation = true;
    });
  }

  void confirmSOS() {
    setState(() {
      showConfirmation = false;
    });
    widget.onClose();
    // Reset state
    Future.delayed(const Duration(milliseconds: 300), () {
      if (mounted) {
        setState(() {
          selectedEmergency = null;
          gpsShared = false;
          showContacts = false;
        });
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Material(
      color: Colors.black.withValues(alpha: 0.5),
      child: Center(
        child: AnimatedBuilder(
          animation: _scaleAnimation,
          builder: (context, child) {
            return Transform.scale(
              scale: _scaleAnimation.value,
              child: ConstrainedBox(
                constraints: BoxConstraints(
                  maxWidth: 400,
                  maxHeight: MediaQuery.of(context).size.height * 0.9,
                ),
                child: Container(
                  width: MediaQuery.of(context).size.width * 0.9,
                  margin: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: widget.isDarkMode ? const Color(0xFF1E1E1E) : Colors.white,
                  borderRadius: BorderRadius.circular(16),
                  boxShadow: [
                    BoxShadow(
                      color: Colors.black.withValues(alpha: 0.3),
                      blurRadius: 20,
                      offset: const Offset(0, 10),
                    ),
                  ],
                ),
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    // Header
                    Container(
                      padding: const EdgeInsets.all(16),
                      decoration: BoxDecoration(
                        color: widget.isDarkMode ? const Color(0xFFCF6679) : const Color(0xFFEF4444),
                        borderRadius: const BorderRadius.only(
                          topLeft: Radius.circular(16),
                          topRight: Radius.circular(16),
                        ),
                      ),
                      child: Stack(
                        children: [
                          Positioned(
                            left: 0,
                            top: 0,
                            child: GestureDetector(
                              onTap: widget.onClose,
                              child: Container(
                                width: 32,
                                height: 32,
                                decoration: BoxDecoration(
                                  color: Colors.red.shade700.withValues(alpha: 0.3),
                                  borderRadius: BorderRadius.circular(16),
                                ),
                                child: const Icon(
                                  Icons.close,
                                  color: Colors.white,
                                  size: 16,
                                ),
                              ),
                            ),
                          ),
                          Center(
                            child: Column(
                              children: [
                                const Text(
                                  'SOS – Emergency Alert',
                                  style: TextStyle(
                                    color: Colors.white,
                                    fontSize: 18,
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                                const SizedBox(height: 4),
                                Text(
                                  'Choose the type of emergency. Alerts will be sent immediately.',
                                  style: TextStyle(
                                    color: Colors.red.shade100,
                                    fontSize: 14,
                                  ),
                                  textAlign: TextAlign.center,
                                ),
                              ],
                            ),
                          ),
                        ],
                      ),
                    ),
                    
                    // Emergency Categories
                    Padding(
                      padding: const EdgeInsets.all(16),
                      child: Column(
                        children: [
                          // Human Emergency
                          GestureDetector(
                            onTap: handleHumanEmergency,
                            child: Container(
                              width: double.infinity,
                              padding: const EdgeInsets.all(16),
                              decoration: BoxDecoration(
                                color: selectedEmergency == 'human'
                                    ? const Color(0xFFEF4444)
                                    : const Color(0xFFEF5350),
                                borderRadius: BorderRadius.circular(12),
                                boxShadow: selectedEmergency == 'human'
                                    ? [
                                        BoxShadow(
                                          color: const Color(0xFFEF4444).withValues(alpha: 0.3),
                                          blurRadius: 8,
                                          offset: const Offset(0, 4),
                                        ),
                                      ]
                                    : null,
                              ),
                              child: const Row(
                                children: [
                                  Icon(Icons.warning, color: Colors.white, size: 24),
                                  SizedBox(width: 12),
                                  Expanded(
                                    child: Column(
                                      crossAxisAlignment: CrossAxisAlignment.start,
                                      children: [
                                        Text(
                                          '🚨 Human Emergency',
                                          style: TextStyle(
                                            color: Colors.white,
                                            fontWeight: FontWeight.bold,
                                            fontSize: 16,
                                          ),
                                        ),
                                        Text(
                                          'Top Priority - Immediate Response',
                                          style: TextStyle(
                                            color: Colors.white70,
                                            fontSize: 14,
                                          ),
                                        ),
                                      ],
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ),
                          
                          // Human Emergency Actions
                          if (selectedEmergency == 'human') ...[
                            const SizedBox(height: 12),
                            Container(
                              padding: const EdgeInsets.all(16),
                              decoration: BoxDecoration(
                                color: Colors.red.shade50,
                                border: Border.all(color: Colors.red.shade200, width: 2),
                                borderRadius: BorderRadius.circular(12),
                              ),
                              child: Column(
                                children: [
                                  // GPS Status
                                  if (gpsShared)
                                    Container(
                                      padding: const EdgeInsets.all(8),
                                      decoration: BoxDecoration(
                                        color: Colors.green.shade100,
                                        borderRadius: BorderRadius.circular(8),
                                      ),
                                      child: const Row(
                                        children: [
                                          Icon(Icons.location_on, color: Colors.green, size: 16),
                                          SizedBox(width: 8),
                                          Text(
                                            'Live GPS Location Shared',
                                            style: TextStyle(
                                              color: Colors.green,
                                              fontWeight: FontWeight.w500,
                                              fontSize: 14,
                                            ),
                                          ),
                                          Spacer(),
                                          Icon(Icons.check_circle, color: Colors.green, size: 16),
                                        ],
                                      ),
                                    ),
                                  
                                  if (showContacts) ...[
                                    const SizedBox(height: 12),
                                    const Align(
                                      alignment: Alignment.centerLeft,
                                      child: Text(
                                        'Quick Contact Numbers:',
                                        style: TextStyle(
                                          fontWeight: FontWeight.w500,
                                          color: Colors.black87,
                                          fontSize: 14,
                                        ),
                                      ),
                                    ),
                                    const SizedBox(height: 8),
                                    LayoutBuilder(
                                      builder: (context, constraints) {
                                        return GridView.count(
                                          shrinkWrap: true,
                                          physics: const NeverScrollableScrollPhysics(),
                                          crossAxisCount: constraints.maxWidth > 300 ? 2 : 1,
                                          childAspectRatio: constraints.maxWidth > 300 ? 2.5 : 4,
                                          mainAxisSpacing: 8,
                                          crossAxisSpacing: 8,
                                          children: emergencyContacts.map((contact) => Container(
                                        padding: const EdgeInsets.all(8),
                                        decoration: BoxDecoration(
                                          color: Colors.white,
                                          border: Border.all(color: Colors.red.shade200),
                                          borderRadius: BorderRadius.circular(8),
                                        ),
                                        child: Row(
                                          children: [
                                            Text(
                                              contact['icon']!,
                                              style: const TextStyle(fontSize: 16),
                                            ),
                                            const SizedBox(width: 8),
                                            Expanded(
                                              child: Column(
                                                crossAxisAlignment: CrossAxisAlignment.start,
                                                mainAxisAlignment: MainAxisAlignment.center,
                                                children: [
                                                  Text(
                                                    contact['name']!,
                                                    style: const TextStyle(
                                                      fontSize: 10,
                                                      fontWeight: FontWeight.w500,
                                                      color: Colors.black87,
                                                    ),
                                                    overflow: TextOverflow.ellipsis,
                                                  ),
                                                  Text(
                                                    contact['number']!,
                                                    style: const TextStyle(
                                                      fontSize: 10,
                                                      color: Colors.blue,
                                                    ),
                                                  ),
                                                ],
                                              ),
                                            ),
                                          ],
                                        ),
                                          )).toList(),
                                        );
                                      },
                                    ),
                                  ],
                                  
                                  const SizedBox(height: 12),
                                  Container(
                                    padding: const EdgeInsets.all(12),
                                    decoration: BoxDecoration(
                                      color: Colors.red.shade100,
                                      borderRadius: BorderRadius.circular(8),
                                    ),
                                    child: Column(
                                      children: [
                                        Text(
                                          '🚨 Priority Rescue Alert',
                                          style: TextStyle(
                                            fontWeight: FontWeight.w500,
                                            color: Colors.red.shade800,
                                            fontSize: 14,
                                          ),
                                        ),
                                        const SizedBox(height: 4),
                                        Text(
                                          'Command Center + Field Teams will be notified immediately',
                                          style: TextStyle(
                                            color: Colors.red.shade700,
                                            fontSize: 12,
                                          ),
                                          textAlign: TextAlign.center,
                                        ),
                                      ],
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ],
                          
                          const SizedBox(height: 12),
                          
                          // Operational Emergency
                          GestureDetector(
                            onTap: handleOperationalEmergency,
                            child: Container(
                              width: double.infinity,
                              padding: const EdgeInsets.all(16),
                              decoration: BoxDecoration(
                                color: selectedEmergency == 'operational'
                                    ? const Color(0xFFFBC02D)
                                    : const Color(0xFFFFEB3B),
                                borderRadius: BorderRadius.circular(12),
                                boxShadow: selectedEmergency == 'operational'
                                    ? [
                                        BoxShadow(
                                          color: const Color(0xFFFBC02D).withValues(alpha: 0.3),
                                          blurRadius: 8,
                                          offset: const Offset(0, 4),
                                        ),
                                      ]
                                    : null,
                              ),
                              child: const Row(
                                children: [
                                  Icon(Icons.warning_amber, color: Colors.black, size: 24),
                                  SizedBox(width: 12),
                                  Expanded(
                                    child: Column(
                                      crossAxisAlignment: CrossAxisAlignment.start,
                                      children: [
                                        Text(
                                          '🛑 Operational Emergency',
                                          style: TextStyle(
                                            color: Colors.black,
                                            fontWeight: FontWeight.bold,
                                            fontSize: 16,
                                          ),
                                        ),
                                        Text(
                                          'Drone/Mission Critical Issue',
                                          style: TextStyle(
                                            color: Colors.black87,
                                            fontSize: 14,
                                          ),
                                        ),
                                      ],
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ),
                          
                          // Operational Emergency Actions
                          if (selectedEmergency == 'operational') ...[
                            const SizedBox(height: 12),
                            Container(
                              padding: const EdgeInsets.all(16),
                              decoration: BoxDecoration(
                                color: Colors.yellow.shade50,
                                border: Border.all(color: Colors.yellow.shade200, width: 2),
                                borderRadius: BorderRadius.circular(12),
                              ),
                              child: Column(
                                children: [
                                  Row(
                                    children: [
                                      Expanded(
                                        child: Container(
                                          padding: const EdgeInsets.all(12),
                                          decoration: BoxDecoration(
                                            color: Colors.white,
                                            border: Border.all(color: Colors.yellow.shade200),
                                            borderRadius: BorderRadius.circular(8),
                                          ),
                                          child: const Row(
                                            children: [
                                              Icon(Icons.refresh, color: Colors.blue, size: 16),
                                              SizedBox(width: 8),
                                              Text(
                                                'Recall Drone',
                                                style: TextStyle(
                                                  fontWeight: FontWeight.w500,
                                                  color: Colors.black87,
                                                  fontSize: 14,
                                                ),
                                              ),
                                            ],
                                          ),
                                        ),
                                      ),
                                      const SizedBox(width: 8),
                                      Expanded(
                                        child: Container(
                                          padding: const EdgeInsets.all(12),
                                          decoration: BoxDecoration(
                                            color: Colors.white,
                                            border: Border.all(color: Colors.yellow.shade200),
                                            borderRadius: BorderRadius.circular(8),
                                          ),
                                          child: const Row(
                                            children: [
                                              Icon(Icons.flight_land, color: Colors.red, size: 16),
                                              SizedBox(width: 8),
                                              Text(
                                                'Emergency Land',
                                                style: TextStyle(
                                                  fontWeight: FontWeight.w500,
                                                  color: Colors.black87,
                                                  fontSize: 14,
                                                ),
                                              ),
                                            ],
                                          ),
                                        ),
                                      ),
                                    ],
                                  ),
                                  const SizedBox(height: 8),
                                  Container(
                                    width: double.infinity,
                                    padding: const EdgeInsets.all(12),
                                    decoration: BoxDecoration(
                                      color: Colors.white,
                                      border: Border.all(color: Colors.yellow.shade200),
                                      borderRadius: BorderRadius.circular(8),
                                    ),
                                    child: const Row(
                                      children: [
                                        Icon(Icons.people, color: Colors.green, size: 16),
                                        SizedBox(width: 8),
                                        Text(
                                          'Notify Team Members',
                                          style: TextStyle(
                                            fontWeight: FontWeight.w500,
                                            color: Colors.black87,
                                            fontSize: 14,
                                          ),
                                        ),
                                      ],
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ],
                        ],
                      ),
                    ),
                    
                    // Recipients Preview
                    Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 16),
                      child: Container(
                        padding: const EdgeInsets.all(12),
                        decoration: BoxDecoration(
                          color: widget.isDarkMode ? const Color(0xFF2C2C2C) : Colors.grey.shade50,
                          border: Border.all(
                            color: widget.isDarkMode ? const Color(0xFF3A3A3A) : Colors.grey.shade200,
                          ),
                          borderRadius: BorderRadius.circular(12),
                        ),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              'Alert Recipients:',
                              style: TextStyle(
                                fontSize: 14,
                                fontWeight: FontWeight.w500,
                                color: widget.isDarkMode ? const Color(0xFFE0E0E0) : Colors.grey.shade700,
                              ),
                            ),
                            const SizedBox(height: 8),
                            Wrap(
                              spacing: 8,
                              runSpacing: 8,
                              children: recipients.map((recipient) => Container(
                                padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
                                decoration: BoxDecoration(
                                  color: recipient['status'] == 'active'
                                      ? Colors.blue.shade100
                                      : Colors.grey.shade100,
                                  border: Border.all(
                                    color: recipient['status'] == 'active'
                                        ? Colors.blue.shade200
                                        : Colors.grey.shade200,
                                  ),
                                  borderRadius: BorderRadius.circular(20),
                                ),
                                child: Text(
                                  recipient['name']!,
                                  style: TextStyle(
                                    fontSize: 12,
                                    fontWeight: FontWeight.w500,
                                    color: recipient['status'] == 'active'
                                        ? Colors.blue.shade700
                                        : Colors.grey.shade500,
                                  ),
                                ),
                              )).toList(),
                            ),
                          ],
                        ),
                      ),
                    ),
                    
                    // Send SOS Button
                    Container(
                      padding: const EdgeInsets.all(16),
                      decoration: BoxDecoration(
                        border: Border(
                          top: BorderSide(
                            color: widget.isDarkMode ? const Color(0xFF3A3A3A) : Colors.grey.shade200,
                          ),
                        ),
                      ),
                      child: SizedBox(
                        width: double.infinity,
                        child: ElevatedButton(
                          onPressed: selectedEmergency != null ? handleSendSOS : null,
                          style: ElevatedButton.styleFrom(
                            backgroundColor: selectedEmergency != null
                                ? (widget.isDarkMode ? const Color(0xFFCF6679) : const Color(0xFFEF4444))
                                : Colors.grey.shade400,
                            padding: const EdgeInsets.symmetric(vertical: 16),
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(12),
                            ),
                            elevation: selectedEmergency != null ? 8 : 0,
                          ),
                          child: const Text(
                            'SEND ALERT NOW',
                            style: TextStyle(
                              color: Colors.white,
                              fontWeight: FontWeight.bold,
                              fontSize: 16,
                            ),
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
                ),
              ),
            );
          },
        ),
      ),
    );
  }
}