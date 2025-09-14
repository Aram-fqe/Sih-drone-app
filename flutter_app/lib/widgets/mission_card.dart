import 'package:flutter/material.dart';
import '../models/mission_model.dart';

class MissionCard extends StatefulWidget {
  final MissionData missionData;
  final bool isDarkMode;

  const MissionCard({
    super.key,
    required this.missionData,
    required this.isDarkMode,
  });

  @override
  State<MissionCard> createState() => _MissionCardState();
}

class _MissionCardState extends State<MissionCard> {
  bool _expanded = false;
  bool _dropdownOpen = false;

  @override
  Widget build(BuildContext context) {
    if (_expanded) {
      return _buildExpandedCard();
    }
    return _buildCompactCard();
  }

  Widget _buildCompactCard() {
    return Container(
      margin: const EdgeInsets.only(bottom: 16),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment.centerLeft,
          end: Alignment.centerRight,
          colors: _getStatusGradient(),
        ),
        borderRadius: BorderRadius.circular(12),
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
      child: Material(
        color: Colors.transparent,
        child: InkWell(
          onTap: () => setState(() => _expanded = true),
          borderRadius: BorderRadius.circular(12),
          child: Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              children: [
                Row(
                  children: [
                    // Drone Status Icon
                    Container(
                      width: 56,
                      height: 56,
                      decoration: BoxDecoration(
                        color: _getDroneStatusBg(),
                        shape: BoxShape.circle,
                      ),
                      child: Stack(
                        children: [
                          Center(
                            child: Icon(
                              Icons.flight,
                              size: 32,
                              color: _getDroneIconColor(),
                            ),
                          ),
                          Positioned(
                            top: 0,
                            right: 0,
                            child: Container(
                              width: 20,
                              height: 20,
                              decoration: BoxDecoration(
                                color: _getStatusIndicatorColor(),
                                shape: BoxShape.circle,
                              ),
                              child: Container(
                                margin: const EdgeInsets.all(4),
                                decoration: const BoxDecoration(
                                  color: Colors.white,
                                  shape: BoxShape.circle,
                                ),
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(width: 16),
                    
                    // Drone Info
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            widget.missionData.droneId,
                            style: TextStyle(
                              fontSize: 18,
                              fontWeight: FontWeight.w600,
                              color: widget.isDarkMode ? Colors.white : const Color(0xFF0F172A),
                            ),
                          ),
                          Text(
                            widget.missionData.mission.droneModel,
                            style: TextStyle(
                              fontSize: 14,
                              color: widget.isDarkMode ? const Color(0xFFB0B0B0) : const Color(0xFF6B7280),
                            ),
                          ),
                        ],
                      ),
                    ),
                    
                    // Status Badge
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.end,
                      children: [
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                          decoration: BoxDecoration(
                            color: _getStatusColor(),
                            borderRadius: BorderRadius.circular(20),
                          ),
                          child: Text(
                            _getStatusText(),
                            style: const TextStyle(
                              color: Colors.white,
                              fontSize: 12,
                              fontWeight: FontWeight.w600,
                            ),
                          ),
                        ),
                        const SizedBox(height: 4),
                        Text(
                          'Click for details',
                          style: TextStyle(
                            fontSize: 12,
                            color: widget.isDarkMode ? const Color(0xFFB0B0B0) : const Color(0xFF6B7280),
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
                
                const SizedBox(height: 16),
                
                // Live Location Section
                _buildLiveLocationSection(),
                
                const SizedBox(height: 16),
                
                // Quick Telemetry
                _buildQuickTelemetry(),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildExpandedCard() {
    return Container(
      margin: const EdgeInsets.only(bottom: 16),
      decoration: BoxDecoration(
        color: widget.isDarkMode ? const Color(0xFF1E1E1E) : Colors.white,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(
          color: widget.isDarkMode ? const Color(0xFFBB86FC) : const Color(0xFF3B82F6),
          width: 2,
        ),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.2),
            blurRadius: 16,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Column(
        children: [
          // Header
          Container(
            decoration: BoxDecoration(
              gradient: LinearGradient(
                begin: Alignment.centerLeft,
                end: Alignment.centerRight,
                colors: widget.isDarkMode
                    ? [const Color(0xFF1E1E1E), const Color(0xFF222222)]
                    : [const Color(0xFF0F172A), const Color(0xFF374151)],
              ),
              borderRadius: const BorderRadius.only(
                topLeft: Radius.circular(12),
                topRight: Radius.circular(12),
              ),
            ),
            padding: const EdgeInsets.all(16),
            child: Column(
              children: [
                Row(
                  children: [
                    IconButton(
                      onPressed: () => setState(() => _expanded = false),
                      icon: const Icon(Icons.arrow_back, color: Colors.white),
                    ),
                    Expanded(
                      child: Text(
                        '${widget.missionData.droneId} - ${widget.missionData.mission.droneModel}',
                        style: const TextStyle(
                          color: Colors.white,
                          fontSize: 16,
                          fontWeight: FontWeight.w600,
                        ),
                        textAlign: TextAlign.center,
                      ),
                    ),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                      decoration: BoxDecoration(
                        color: _getStatusColor(),
                        borderRadius: BorderRadius.circular(20),
                      ),
                      child: Text(
                        _getStatusText(),
                        style: const TextStyle(
                          color: Colors.white,
                          fontSize: 12,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                    ),
                  ],
                ),
                
                const SizedBox(height: 16),
                
                // Map Section
                Container(
                  height: 128,
                  decoration: BoxDecoration(
                    color: const Color(0xFF374151),
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: Stack(
                    children: [
                      Container(
                        decoration: BoxDecoration(
                          color: const Color(0xFF4B5563),
                          borderRadius: BorderRadius.circular(8),
                        ),
                        child: const Center(
                          child: Text(
                            'Live Map View',
                            style: TextStyle(color: Colors.white70),
                          ),
                        ),
                      ),
                      Positioned(
                        top: 8,
                        left: 8,
                        child: Container(
                          width: 12,
                          height: 12,
                          decoration: const BoxDecoration(
                            color: Colors.red,
                            shape: BoxShape.circle,
                          ),
                        ),
                      ),
                      const Positioned(
                        bottom: 8,
                        right: 8,
                        child: Text(
                          'Live Feed',
                          style: TextStyle(
                            color: Colors.white,
                            fontSize: 12,
                            backgroundColor: Colors.black54,
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
          
          // Content
          Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              children: [
                _buildPayloadDetails(),
                const SizedBox(height: 16),
                _buildRecipientInfo(),
                const SizedBox(height: 16),
                _buildTelemetryDetails(),
                const SizedBox(height: 16),
                _buildActionButtons(),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildLiveLocationSection() {
    return Container(
      decoration: BoxDecoration(
        color: widget.isDarkMode ? const Color(0xFF2C2C2C) : const Color(0xFFF8FAFC),
        borderRadius: BorderRadius.circular(8),
        border: Border.all(
          color: widget.isDarkMode ? const Color(0xFF3A3A3A) : const Color(0xFFE5E7EB),
        ),
      ),
      child: Column(
        children: [
          InkWell(
            onTap: () => setState(() => _dropdownOpen = !_dropdownOpen),
            child: Padding(
              padding: const EdgeInsets.all(12),
              child: Row(
                children: [
                  const Icon(Icons.navigation, color: Color(0xFF3B82F6), size: 16),
                  const SizedBox(width: 8),
                  const Text(
                    'Live Location',
                    style: TextStyle(fontWeight: FontWeight.w500),
                  ),
                  const SizedBox(width: 8),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                    decoration: BoxDecoration(
                      color: widget.missionData.mission.liveLocation.lastUpdate == 'Live'
                          ? const Color(0xFFDCFCE7)
                          : const Color(0xFFDBEAFE),
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: Text(
                      widget.missionData.mission.liveLocation.lastUpdate,
                      style: TextStyle(
                        fontSize: 12,
                        color: widget.missionData.mission.liveLocation.lastUpdate == 'Live'
                            ? const Color(0xFF166534)
                            : const Color(0xFF1E40AF),
                      ),
                    ),
                  ),
                  const Spacer(),
                  Icon(
                    _dropdownOpen ? Icons.keyboard_arrow_up : Icons.keyboard_arrow_down,
                    color: Colors.grey,
                  ),
                ],
              ),
            ),
          ),
          
          if (_dropdownOpen) ...[
            const Divider(height: 1),
            Padding(
              padding: const EdgeInsets.all(12),
              child: Column(
                children: [
                  Row(
                    children: [
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            const Text('Coordinates', style: TextStyle(fontSize: 12, color: Colors.grey)),
                            Text(
                              widget.missionData.mission.liveLocation.coordinates,
                              style: const TextStyle(fontSize: 12, fontFamily: 'monospace'),
                            ),
                          ],
                        ),
                      ),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            const Text('Distance to Target', style: TextStyle(fontSize: 12, color: Colors.grey)),
                            Text(
                              widget.missionData.mission.liveLocation.distanceToDestination,
                              style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w600, color: Color(0xFF3B82F6)),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                  
                  const SizedBox(height: 12),
                  
                  // Progress indicator
                  Container(
                    height: 8,
                    decoration: BoxDecoration(
                      color: Colors.grey.withValues(alpha: 0.2),
                      borderRadius: BorderRadius.circular(4),
                    ),
                    child: Stack(
                      children: [
                        LayoutBuilder(
                          builder: (context, constraints) {
                            return Container(
                              width: constraints.maxWidth * _getProgressValue(),
                              height: 8,
                              decoration: BoxDecoration(
                                color: _getStatusColor(),
                                borderRadius: BorderRadius.circular(4),
                              ),
                            );
                          },
                        ),
                      ],
                    ),
                  ),
                  
                  const SizedBox(height: 12),
                  
                  SizedBox(
                    width: double.infinity,
                    child: ElevatedButton.icon(
                      onPressed: () {},
                      icon: const Icon(Icons.map, size: 16),
                      label: const Text('View Live Location on Map'),
                      style: ElevatedButton.styleFrom(
                        backgroundColor: const Color(0xFF3B82F6),
                        foregroundColor: Colors.white,
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ],
      ),
    );
  }

  Widget _buildQuickTelemetry() {
    return LayoutBuilder(
      builder: (context, constraints) {
        return Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Flexible(
              child: Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  const Icon(Icons.battery_full, color: Color(0xFF10B981), size: 16),
                  const SizedBox(width: 4),
                  Text('${widget.missionData.mission.telemetry.battery}%'),
                  const SizedBox(width: 8),
                  Flexible(
                    child: Text(
                      widget.missionData.mission.telemetry.speed,
                      overflow: TextOverflow.ellipsis,
                    ),
                  ),
                  const SizedBox(width: 8),
                  Container(
                    width: 12,
                    height: 12,
                    decoration: BoxDecoration(
                      color: _getConnectivityColor(),
                      shape: BoxShape.circle,
                    ),
                  ),
                  const SizedBox(width: 4),
                  Flexible(
                    child: Text(
                      widget.missionData.mission.telemetry.connectivity.name,
                      style: const TextStyle(fontSize: 12),
                      overflow: TextOverflow.ellipsis,
                    ),
                  ),
                ],
              ),
            ),
            Text(widget.missionData.mission.telemetry.altitude),
          ],
        );
      },
    );
  }

  Widget _buildPayloadDetails() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Row(
          children: [
            Icon(Icons.inventory, color: Color(0xFF3B82F6), size: 16),
            SizedBox(width: 8),
            Text('Payload Details', style: TextStyle(fontWeight: FontWeight.w600)),
          ],
        ),
        const SizedBox(height: 8),
        ...widget.missionData.mission.payload.map((item) => Container(
          margin: const EdgeInsets.only(bottom: 8),
          padding: const EdgeInsets.all(12),
          decoration: BoxDecoration(
            color: widget.isDarkMode ? const Color(0xFF2C2C2C) : const Color(0xFFF8FAFC),
            borderRadius: BorderRadius.circular(8),
          ),
          child: Row(
            children: [
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(item.name, style: const TextStyle(fontWeight: FontWeight.w500)),
                    Text(item.weight, style: const TextStyle(fontSize: 12, color: Colors.grey)),
                  ],
                ),
              ),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                decoration: BoxDecoration(
                  color: _getPriorityColor(item.priority),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Text(
                  item.priority.name.toUpperCase(),
                  style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w600),
                ),
              ),
            ],
          ),
        )),
      ],
    );
  }

  Widget _buildRecipientInfo() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Row(
          children: [
            Icon(Icons.location_on, color: Color(0xFF10B981), size: 16),
            SizedBox(width: 8),
            Text('Recipient Information', style: TextStyle(fontWeight: FontWeight.w600)),
          ],
        ),
        const SizedBox(height: 8),
        Container(
          padding: const EdgeInsets.all(12),
          decoration: BoxDecoration(
            color: widget.isDarkMode ? const Color(0xFF2C2C2C) : const Color(0xFFF8FAFC),
            borderRadius: BorderRadius.circular(8),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                widget.missionData.mission.recipient.name,
                style: const TextStyle(fontWeight: FontWeight.w500),
              ),
              const SizedBox(height: 4),
              Row(
                children: [
                  const Icon(Icons.phone, size: 12, color: Colors.grey),
                  const SizedBox(width: 4),
                  Text(
                    widget.missionData.mission.recipient.contact,
                    style: const TextStyle(fontSize: 12, color: Colors.grey),
                  ),
                ],
              ),
              const SizedBox(height: 4),
              Text(
                widget.missionData.mission.recipient.location,
                style: const TextStyle(fontSize: 12, color: Colors.grey),
              ),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildTelemetryDetails() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          children: [
            Icon(Icons.flight, color: _getDroneIconColor(), size: 16),
            const SizedBox(width: 8),
            const Text('Live Telemetry', style: TextStyle(fontWeight: FontWeight.w600)),
          ],
        ),
        const SizedBox(height: 8),
        LayoutBuilder(
          builder: (context, constraints) {
            return GridView.count(
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              crossAxisCount: constraints.maxWidth > 400 ? 2 : 1,
              childAspectRatio: constraints.maxWidth > 400 ? 2 : 3,
              mainAxisSpacing: 8,
              crossAxisSpacing: 8,
              children: [
                _buildTelemetryItem('Battery', '${widget.missionData.mission.telemetry.battery}%', Icons.battery_full, const Color(0xFF10B981)),
                _buildTelemetryItem('Altitude', widget.missionData.mission.telemetry.altitude, Icons.height, const Color(0xFF3B82F6)),
                _buildTelemetryItem('Speed', widget.missionData.mission.telemetry.speed, Icons.speed, const Color(0xFF10B981)),
                _buildTelemetryItem('Signal', widget.missionData.mission.telemetry.connectivity.name, Icons.signal_cellular_alt, _getConnectivityColor()),
              ],
            );
          },
        ),
      ],
    );
  }

  Widget _buildTelemetryItem(String label, String value, IconData icon, Color color) {
    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: widget.isDarkMode ? const Color(0xFF2C2C2C) : const Color(0xFFF8FAFC),
        borderRadius: BorderRadius.circular(8),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(icon, size: 16, color: color),
              const SizedBox(width: 4),
              Text(label, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w500)),
            ],
          ),
          const SizedBox(height: 4),
          Text(value, style: TextStyle(fontSize: 16, fontWeight: FontWeight.w600, color: color)),
        ],
      ),
    );
  }

  Widget _buildActionButtons() {
    return LayoutBuilder(
      builder: (context, constraints) {
        if (constraints.maxWidth < 400) {
          return Column(
            children: [
              SizedBox(
                width: double.infinity,
                child: OutlinedButton.icon(
                  onPressed: () {},
                  icon: const Icon(Icons.refresh, size: 12),
                  label: const Text('Recall'),
                ),
              ),
              const SizedBox(height: 8),
              Row(
                children: [
                  Expanded(
                    child: OutlinedButton.icon(
                      onPressed: () {},
                      icon: const Icon(Icons.flash_on, size: 12),
                      label: const Text('Emergency'),
                    ),
                  ),
                  const SizedBox(width: 8),
                  Expanded(
                    child: OutlinedButton.icon(
                      onPressed: () {},
                      icon: const Icon(Icons.share, size: 12),
                      label: const Text('Share'),
                    ),
                  ),
                ],
              ),
            ],
          );
        }
        return Row(
          children: [
            Expanded(
              child: OutlinedButton.icon(
                onPressed: () {},
                icon: const Icon(Icons.refresh, size: 12),
                label: const Text('Recall'),
              ),
            ),
            const SizedBox(width: 8),
            Expanded(
              child: OutlinedButton.icon(
                onPressed: () {},
                icon: const Icon(Icons.flash_on, size: 12),
                label: const Text('Emergency Land'),
              ),
            ),
            const SizedBox(width: 8),
            Expanded(
              child: OutlinedButton.icon(
                onPressed: () {},
                icon: const Icon(Icons.share, size: 12),
                label: const Text('Share Track'),
              ),
            ),
          ],
        );
      },
    );
  }

  List<Color> _getStatusGradient() {
    switch (widget.missionData.status) {
      case MissionStatus.inTransit:
        return widget.isDarkMode
            ? [const Color(0xFFBB86FC).withValues(alpha: 0.2), const Color(0xFFBB86FC).withValues(alpha: 0.1)]
            : [const Color(0xFF3B82F6).withValues(alpha: 0.2), const Color(0xFF2563EB).withValues(alpha: 0.1)];
      case MissionStatus.delivering:
        return widget.isDarkMode
            ? [const Color(0xFFCF6679).withValues(alpha: 0.2), const Color(0xFFCF6679).withValues(alpha: 0.1)]
            : [const Color(0xFFF97316).withValues(alpha: 0.2), const Color(0xFFEA580C).withValues(alpha: 0.1)];
      case MissionStatus.returning:
        return widget.isDarkMode
            ? [const Color(0xFF03DAC6).withValues(alpha: 0.2), const Color(0xFF03DAC6).withValues(alpha: 0.1)]
            : [const Color(0xFF10B981).withValues(alpha: 0.2), const Color(0xFF059669).withValues(alpha: 0.1)];
      case MissionStatus.standby:
        return [const Color(0xFF6B7280).withValues(alpha: 0.2), const Color(0xFF4B5563).withValues(alpha: 0.1)];
    }
  }

  Color _getStatusColor() {
    switch (widget.missionData.status) {
      case MissionStatus.inTransit:
        return widget.isDarkMode ? const Color(0xFFBB86FC) : const Color(0xFF3B82F6);
      case MissionStatus.delivering:
        return widget.isDarkMode ? const Color(0xFFCF6679) : const Color(0xFFF97316);
      case MissionStatus.returning:
        return widget.isDarkMode ? const Color(0xFF03DAC6) : const Color(0xFF10B981);
      case MissionStatus.standby:
        return const Color(0xFF6B7280);
    }
  }

  String _getStatusText() {
    switch (widget.missionData.status) {
      case MissionStatus.inTransit:
        return 'In Transit';
      case MissionStatus.delivering:
        return 'Delivering';
      case MissionStatus.returning:
        return 'Returning';
      case MissionStatus.standby:
        return 'Standby';
    }
  }

  Color _getDroneStatusBg() {
    switch (widget.missionData.status) {
      case MissionStatus.inTransit:
      case MissionStatus.delivering:
        return widget.isDarkMode ? const Color(0xFF10B981).withValues(alpha: 0.2) : const Color(0xFFDCFCE7);
      case MissionStatus.returning:
        return widget.isDarkMode ? const Color(0xFFFBBF24).withValues(alpha: 0.2) : const Color(0xFFFEF3C7);
      case MissionStatus.standby:
        return widget.isDarkMode ? const Color(0xFFEF4444).withValues(alpha: 0.2) : const Color(0xFFFEE2E2);
    }
  }

  Color _getDroneIconColor() {
    switch (widget.missionData.status) {
      case MissionStatus.inTransit:
      case MissionStatus.delivering:
        return const Color(0xFF10B981);
      case MissionStatus.returning:
        return const Color(0xFFFBBF24);
      case MissionStatus.standby:
        return const Color(0xFFEF4444);
    }
  }

  Color _getStatusIndicatorColor() {
    switch (widget.missionData.status) {
      case MissionStatus.inTransit:
      case MissionStatus.delivering:
        return const Color(0xFF10B981);
      case MissionStatus.returning:
        return const Color(0xFFFBBF24);
      case MissionStatus.standby:
        return const Color(0xFFEF4444);
    }
  }

  Color _getConnectivityColor() {
    switch (widget.missionData.mission.telemetry.connectivity) {
      case Connectivity.strong:
        return const Color(0xFF10B981);
      case Connectivity.weak:
        return const Color(0xFFF97316);
      case Connectivity.lost:
        return const Color(0xFFEF4444);
    }
  }

  Color _getPriorityColor(Priority priority) {
    switch (priority) {
      case Priority.high:
        return widget.isDarkMode ? const Color(0xFFFCA5A5) : const Color(0xFFEF4444);
      case Priority.medium:
        return widget.isDarkMode ? const Color(0xFFDDD6FE) : const Color(0xFF8B5CF6);
      case Priority.low:
        return widget.isDarkMode ? const Color(0xFFA7F3D0) : const Color(0xFF10B981);
    }
  }

  double _getProgressValue() {
    switch (widget.missionData.status) {
      case MissionStatus.inTransit:
        return 0.33;
      case MissionStatus.delivering:
        return 0.83;
      case MissionStatus.returning:
        return 0.67;
      case MissionStatus.standby:
        return 0.0;
    }
  }
}