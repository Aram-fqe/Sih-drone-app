import 'package:flutter/material.dart';

class ReportsScreen extends StatefulWidget {
  final bool isDarkMode;

  const ReportsScreen({super.key, required this.isDarkMode});

  @override
  State<ReportsScreen> createState() => _ReportsScreenState();
}

class _ReportsScreenState extends State<ReportsScreen> {
  String dateFilter = 'month';
  String historyFilter = 'monthly';
  String? selectedZone;

  // Mock data matching website exactly
  final kpiCards = [
    {
      'title': 'Total Deliveries',
      'value': '523',
      'subtitle': 'This Month',
      'icon': Icons.local_shipping,
      'change': '+12.3%',
      'isPositive': true
    },
    {
      'title': 'Success Rate',
      'value': '98.2%',
      'subtitle': 'Successful Deliveries',
      'icon': Icons.check_circle,
      'change': '+2.1%',
      'isPositive': true
    },
    {
      'title': 'Avg Delivery Time',
      'value': '15 min',
      'subtitle': 'Response Time',
      'icon': Icons.schedule,
      'change': '-3.2 min',
      'isPositive': true
    },
    {
      'title': 'Drones Deployed',
      'value': '12',
      'subtitle': 'Currently Active',
      'icon': Icons.flight,
      'change': '+2',
      'isPositive': true
    },
    {
      'title': 'Failed Missions',
      'value': '11',
      'subtitle': 'This Month',
      'icon': Icons.cancel,
      'change': '-4',
      'isPositive': true
    }
  ];

  final disasterZones = [
    {'name': 'Hurricane Zone Alpha', 'deliveries': 87, 'status': 'high'},
    {'name': 'Earthquake Beta Region', 'deliveries': 134, 'status': 'critical'},
    {'name': 'Flood Zone Gamma', 'deliveries': 72, 'status': 'medium'},
    {'name': 'Wildfire Delta Area', 'deliveries': 156, 'status': 'critical'},
    {'name': 'Storm Charlie Sector', 'deliveries': 45, 'status': 'low'},
  ];

  final topItems = [
    {'name': 'Medical Supplies', 'count': 156, 'percentage': 29.8},
    {'name': 'Food Rations', 'count': 134, 'percentage': 25.6},
    {'name': 'Water Purification', 'count': 98, 'percentage': 18.7},
    {'name': 'Emergency Equipment', 'count': 87, 'percentage': 16.6},
    {'name': 'Communication Devices', 'count': 48, 'percentage': 9.3},
  ];

  @override
  Widget build(BuildContext context) {
    return Container(
      color: widget.isDarkMode ? const Color(0xFF121212) : const Color(0xFFF8F9FA),
      child: SingleChildScrollView(
        child: Column(
          children: [
            // Header matching website
            Container(
              width: double.infinity,
              padding: const EdgeInsets.all(24),
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  begin: Alignment.centerLeft,
                  end: Alignment.centerRight,
                  colors: widget.isDarkMode
                      ? [const Color(0xFF1E1E1E), const Color(0xFF232323)]
                      : [const Color(0xFF1E293B), const Color(0xFF334155)],
                ),
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const Text(
                    'Reports & Analytics',
                    style: TextStyle(
                      fontSize: 20,
                      fontWeight: FontWeight.w600,
                      color: Colors.white,
                    ),
                  ),
                  Row(
                    children: [
                      const Icon(Icons.filter_list, color: Colors.white, size: 16),
                      const SizedBox(width: 8),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                        decoration: BoxDecoration(
                          color: Colors.white.withValues(alpha: 0.1),
                          borderRadius: BorderRadius.circular(6),
                          border: Border.all(color: Colors.white.withValues(alpha: 0.2)),
                        ),
                        child: DropdownButton<String>(
                          value: dateFilter,
                          dropdownColor: widget.isDarkMode ? const Color(0xFF1E1E1E) : null,
                          underline: const SizedBox(),
                          style: const TextStyle(color: Colors.white, fontSize: 14),
                          items: ['day', 'week', 'month', 'custom']
                              .map((e) => DropdownMenuItem(value: e, child: Text(e)))
                              .toList(),
                          onChanged: (value) => setState(() => dateFilter = value!),
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
            
            Padding(
              padding: const EdgeInsets.all(16),
              child: Column(
                children: [
                  // KPI Summary Cards
                  GridView.count(
                    shrinkWrap: true,
                    physics: const NeverScrollableScrollPhysics(),
                    crossAxisCount: 2,
                    childAspectRatio: 1.2,
                    mainAxisSpacing: 12,
                    crossAxisSpacing: 12,
                    children: kpiCards.map((kpi) => _buildKPICard(kpi)).toList(),
                  ),
                  
                  const SizedBox(height: 24),
                  
                  // Charts Section
                  _buildDeliveryChart(),
                  
                  const SizedBox(height: 24),
                  
                  // Drone Utilization and Response Time
                  Row(
                    children: [
                      Expanded(child: _buildDroneUtilization()),
                      const SizedBox(width: 16),
                      Expanded(child: _buildResponseTimeChart()),
                    ],
                  ),
                  
                  const SizedBox(height: 24),
                  
                  // Disaster Zones Map
                  _buildDisasterZonesMap(),
                  
                  const SizedBox(height: 24),
                  
                  // Mission History and Insights
                  Row(
                    children: [
                      Expanded(child: _buildMostDeliveredItems()),
                      const SizedBox(width: 16),
                      Expanded(child: _buildDroneHealthSummary()),
                    ],
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildKPICard(Map<String, dynamic> kpi) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: widget.isDarkMode ? const Color(0xFF1E1E1E) : Colors.white,
        borderRadius: BorderRadius.circular(8),
        border: Border.all(
          color: widget.isDarkMode ? const Color(0xFF3A3A3A) : const Color(0xFFE5E7EB),
        ),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.1),
            blurRadius: 8,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Container(
                padding: const EdgeInsets.all(8),
                decoration: BoxDecoration(
                  color: widget.isDarkMode 
                      ? const Color(0xFFBB86FC).withValues(alpha: 0.2) 
                      : const Color(0xFF3B82F6).withValues(alpha: 0.1),
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Icon(
                  kpi['icon'] as IconData,
                  size: 20,
                  color: widget.isDarkMode 
                      ? const Color(0xFFBB86FC) 
                      : const Color(0xFF3B82F6),
                ),
              ),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                decoration: BoxDecoration(
                  color: kpi['isPositive'] 
                      ? (widget.isDarkMode 
                          ? const Color(0xFF03DAC6).withValues(alpha: 0.2) 
                          : const Color(0xFF10B981).withValues(alpha: 0.1))
                      : (widget.isDarkMode 
                          ? const Color(0xFFCF6679).withValues(alpha: 0.2) 
                          : const Color(0xFFEF4444).withValues(alpha: 0.1)),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Text(
                  kpi['change'] as String,
                  style: TextStyle(
                    fontSize: 10,
                    fontWeight: FontWeight.w600,
                    color: kpi['isPositive'] 
                        ? (widget.isDarkMode 
                            ? const Color(0xFF03DAC6) 
                            : const Color(0xFF10B981))
                        : (widget.isDarkMode 
                            ? const Color(0xFFCF6679) 
                            : const Color(0xFFEF4444)),
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 12),
          Text(
            kpi['value'] as String,
            style: TextStyle(
              fontSize: 24,
              fontWeight: FontWeight.bold,
              color: widget.isDarkMode ? Colors.white : const Color(0xFF0F172A),
            ),
          ),
          Text(
            kpi['subtitle'] as String,
            style: TextStyle(
              fontSize: 12,
              color: widget.isDarkMode ? const Color(0xFFB0B0B0) : const Color(0xFF6B7280),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildDeliveryChart() {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: widget.isDarkMode ? const Color(0xFF1E1E1E) : Colors.white,
        borderRadius: BorderRadius.circular(8),
        border: Border.all(
          color: widget.isDarkMode ? const Color(0xFF3A3A3A) : const Color(0xFFE5E7EB),
        ),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.1),
            blurRadius: 8,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(
                Icons.trending_up,
                size: 20,
                color: widget.isDarkMode ? const Color(0xFF03DAC6) : const Color(0xFF10B981),
              ),
              const SizedBox(width: 8),
              Text(
                'Delivery Success Rate',
                style: TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.w600,
                  color: widget.isDarkMode ? Colors.white : const Color(0xFF0F172A),
                ),
              ),
            ],
          ),
          const SizedBox(height: 16),
          Container(
            height: 180,
            decoration: BoxDecoration(
              color: widget.isDarkMode ? const Color(0xFF2C2C2C) : const Color(0xFFF8FAFC),
              borderRadius: BorderRadius.circular(8),
            ),
            child: const Center(
              child: Text(
                'Chart Placeholder\n(Bar Chart showing monthly delivery success)',
                textAlign: TextAlign.center,
                style: TextStyle(color: Colors.grey),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildDroneUtilization() {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: widget.isDarkMode ? const Color(0xFF1E1E1E) : Colors.white,
        borderRadius: BorderRadius.circular(8),
        border: Border.all(
          color: widget.isDarkMode ? const Color(0xFF3A3A3A) : const Color(0xFFE5E7EB),
        ),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.1),
            blurRadius: 8,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(
                Icons.donut_small,
                size: 20,
                color: widget.isDarkMode ? const Color(0xFFBB86FC) : const Color(0xFF3B82F6),
              ),
              const SizedBox(width: 8),
              Text(
                'Drone Utilization',
                style: TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.w600,
                  color: widget.isDarkMode ? Colors.white : const Color(0xFF0F172A),
                ),
              ),
            ],
          ),
          const SizedBox(height: 16),
          Container(
            height: 120,
            decoration: BoxDecoration(
              color: widget.isDarkMode ? const Color(0xFF2C2C2C) : const Color(0xFFF8FAFC),
              borderRadius: BorderRadius.circular(8),
            ),
            child: const Center(
              child: Text(
                'Pie Chart\n68% Active, 15% Maintenance, 17% Idle',
                textAlign: TextAlign.center,
                style: TextStyle(color: Colors.grey),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildResponseTimeChart() {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: widget.isDarkMode ? const Color(0xFF1E1E1E) : Colors.white,
        borderRadius: BorderRadius.circular(8),
        border: Border.all(
          color: widget.isDarkMode ? const Color(0xFF3A3A3A) : const Color(0xFFE5E7EB),
        ),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.1),
            blurRadius: 8,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(
                Icons.schedule,
                size: 20,
                color: widget.isDarkMode ? const Color(0xFF03DAC6) : const Color(0xFFF59E0B),
              ),
              const SizedBox(width: 8),
              Text(
                'Response Time Trend',
                style: TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.w600,
                  color: widget.isDarkMode ? Colors.white : const Color(0xFF0F172A),
                ),
              ),
            ],
          ),
          const SizedBox(height: 16),
          Container(
            height: 120,
            decoration: BoxDecoration(
              color: widget.isDarkMode ? const Color(0xFF2C2C2C) : const Color(0xFFF8FAFC),
              borderRadius: BorderRadius.circular(8),
            ),
            child: const Center(
              child: Text(
                'Line Chart\nAvg 15 min response time',
                textAlign: TextAlign.center,
                style: TextStyle(color: Colors.grey),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildDisasterZonesMap() {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: widget.isDarkMode ? const Color(0xFF1E1E1E) : Colors.white,
        borderRadius: BorderRadius.circular(8),
        border: Border.all(
          color: widget.isDarkMode ? const Color(0xFF3A3A3A) : const Color(0xFFE5E7EB),
        ),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.1),
            blurRadius: 8,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(
                Icons.location_on,
                size: 20,
                color: widget.isDarkMode ? const Color(0xFFCF6679) : const Color(0xFFEF4444),
              ),
              const SizedBox(width: 8),
              Text(
                'Disaster Zones Served',
                style: TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.w600,
                  color: widget.isDarkMode ? Colors.white : const Color(0xFF0F172A),
                ),
              ),
            ],
          ),
          const SizedBox(height: 16),
          Container(
            height: 200,
            decoration: BoxDecoration(
              color: widget.isDarkMode ? const Color(0xFF2C2C2C) : const Color(0xFFF1F5F9),
              borderRadius: BorderRadius.circular(8),
            ),
            child: const Center(
              child: Text(
                'Interactive Map Placeholder\nShowing disaster zones with delivery counts',
                textAlign: TextAlign.center,
                style: TextStyle(color: Colors.grey),
              ),
            ),
          ),
          const SizedBox(height: 16),
          GridView.count(
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            crossAxisCount: 2,
            childAspectRatio: 3,
            mainAxisSpacing: 8,
            crossAxisSpacing: 8,
            children: disasterZones.take(4).map((zone) => Container(
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
                      Container(
                        width: 12,
                        height: 12,
                        decoration: BoxDecoration(
                          color: zone['status'] == 'critical' ? Colors.red :
                                 zone['status'] == 'high' ? Colors.orange :
                                 zone['status'] == 'medium' ? Colors.yellow :
                                 Colors.green,
                          shape: BoxShape.circle,
                        ),
                      ),
                      const SizedBox(width: 8),
                      Expanded(
                        child: Text(
                          zone['name'] as String,
                          style: TextStyle(
                            fontSize: 12,
                            fontWeight: FontWeight.w500,
                            color: widget.isDarkMode ? const Color(0xFFE0E0E0) : const Color(0xFF374151),
                          ),
                          overflow: TextOverflow.ellipsis,
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 4),
                  Text(
                    '${zone['deliveries']} deliveries',
                    style: TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.bold,
                      color: widget.isDarkMode ? const Color(0xFFBB86FC) : const Color(0xFF3B82F6),
                    ),
                  ),
                ],
              ),
            )).toList(),
          ),
        ],
      ),
    );
  }

  Widget _buildMostDeliveredItems() {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: widget.isDarkMode ? const Color(0xFF1E1E1E) : Colors.white,
        borderRadius: BorderRadius.circular(8),
        border: Border.all(
          color: widget.isDarkMode ? const Color(0xFF3A3A3A) : const Color(0xFFE5E7EB),
        ),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.1),
            blurRadius: 8,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(
                Icons.local_shipping,
                size: 20,
                color: widget.isDarkMode ? const Color(0xFF03DAC6) : const Color(0xFF10B981),
              ),
              const SizedBox(width: 8),
              Text(
                'Most Delivered Items',
                style: TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.w600,
                  color: widget.isDarkMode ? Colors.white : const Color(0xFF0F172A),
                ),
              ),
            ],
          ),
          const SizedBox(height: 16),
          ...topItems.map((item) => Padding(
            padding: const EdgeInsets.only(bottom: 12),
            child: Column(
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      item['name'] as String,
                      style: TextStyle(
                        fontWeight: FontWeight.w500,
                        color: widget.isDarkMode ? Colors.white : const Color(0xFF0F172A),
                      ),
                    ),
                    Text(
                      '${item['count']}',
                      style: TextStyle(
                        fontSize: 12,
                        color: widget.isDarkMode ? const Color(0xFFB0B0B0) : const Color(0xFF6B7280),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 4),
                LinearProgressIndicator(
                  value: (item['percentage'] as double) / 100,
                  backgroundColor: widget.isDarkMode 
                      ? const Color(0xFF3A3A3A) 
                      : const Color(0xFFE5E7EB),
                  valueColor: AlwaysStoppedAnimation<Color>(
                    widget.isDarkMode ? const Color(0xFFBB86FC) : const Color(0xFF3B82F6),
                  ),
                ),
              ],
            ),
          )),
        ],
      ),
    );
  }

  Widget _buildDroneHealthSummary() {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: widget.isDarkMode ? const Color(0xFF1E1E1E) : Colors.white,
        borderRadius: BorderRadius.circular(8),
        border: Border.all(
          color: widget.isDarkMode ? const Color(0xFF3A3A3A) : const Color(0xFFE5E7EB),
        ),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.1),
            blurRadius: 8,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(
                Icons.battery_full,
                size: 20,
                color: widget.isDarkMode ? const Color(0xFFFFB74D) : const Color(0xFFF59E0B),
              ),
              const SizedBox(width: 8),
              Text(
                'Drone Health Summary',
                style: TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.w600,
                  color: widget.isDarkMode ? Colors.white : const Color(0xFF0F172A),
                ),
              ),
            ],
          ),
          const SizedBox(height: 16),
          _buildHealthItem('Operational', '8 drones', const Color(0xFF10B981)),
          const SizedBox(height: 12),
          _buildHealthItem('Maintenance Due', '3 drones', const Color(0xFFF59E0B)),
          const SizedBox(height: 12),
          _buildHealthItem('Needs Repair', '1 drone', const Color(0xFFEF4444)),
          const SizedBox(height: 16),
          Container(
            padding: const EdgeInsets.only(top: 12),
            decoration: BoxDecoration(
              border: Border(
                top: BorderSide(
                  color: widget.isDarkMode ? const Color(0xFF3A3A3A) : const Color(0xFFE5E7EB),
                ),
              ),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Average Battery Cycles',
                  style: TextStyle(
                    fontSize: 14,
                    color: widget.isDarkMode ? const Color(0xFFB0B0B0) : const Color(0xFF6B7280),
                  ),
                ),
                const SizedBox(height: 8),
                Row(
                  children: [
                    Expanded(
                      child: LinearProgressIndicator(
                        value: 0.73,
                        backgroundColor: widget.isDarkMode 
                            ? const Color(0xFF3A3A3A) 
                            : const Color(0xFFE5E7EB),
                        valueColor: AlwaysStoppedAnimation<Color>(
                          widget.isDarkMode ? const Color(0xFF03DAC6) : const Color(0xFF10B981),
                        ),
                      ),
                    ),
                    const SizedBox(width: 8),
                    Text(
                      '730/1000',
                      style: TextStyle(
                        fontSize: 12,
                        fontWeight: FontWeight.w500,
                        color: widget.isDarkMode ? Colors.white : const Color(0xFF374151),
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

  Widget _buildHealthItem(String label, String value, Color color) {
    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: color.withValues(alpha: widget.isDarkMode ? 0.2 : 0.1),
        borderRadius: BorderRadius.circular(8),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Row(
            children: [
              Container(
                width: 12,
                height: 12,
                decoration: BoxDecoration(
                  color: color,
                  shape: BoxShape.circle,
                ),
              ),
              const SizedBox(width: 12),
              Text(
                label,
                style: TextStyle(
                  fontWeight: FontWeight.w500,
                  color: widget.isDarkMode ? Colors.white : const Color(0xFF0F172A),
                ),
              ),
            ],
          ),
          Text(
            value,
            style: TextStyle(
              fontWeight: FontWeight.bold,
              color: color,
            ),
          ),
        ],
      ),
    );
  }
}