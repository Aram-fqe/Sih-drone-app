import 'package:flutter/material.dart';
import 'package:fl_chart/fl_chart.dart';
import '../services/fleet_statistics_service.dart';

class ReportsScreen extends StatefulWidget {
  final bool isDarkMode;

  const ReportsScreen({super.key, required this.isDarkMode});

  @override
  State<ReportsScreen> createState() => _ReportsScreenState();
}

class _ReportsScreenState extends State<ReportsScreen> {
  String dateFilter = 'January';
  String historyFilter = 'monthly';
  String? selectedZone;
  Map<String, dynamic> fleetStats = {};
  bool isLoading = true;
  Map<String, bool> _healthItemExpanded = {};

  @override
  void initState() {
    super.initState();
    _healthItemExpanded = {
      'operational': false,
      'maintenance': false,
      'repair': false,
    };
    _loadFleetStatistics();
  }

  Future<void> _loadFleetStatistics() async {
    final stats = await FleetStatisticsService.getAggregatedStats();
    setState(() {
      fleetStats = stats;
      isLoading = false;
    });
  }

  List<Map<String, dynamic>> get kpiCards {
    if (fleetStats.isEmpty) return [];
    return [
      {
        'title': 'Total Deliveries',
        'value': '${fleetStats['totalDeliveries'] ?? 0}',
        'subtitle': 'This Month',
        'icon': Icons.local_shipping,
        'change': '+12.3%',
        'isPositive': true
      },
      {
        'title': 'Success Rate',
        'value': '${(fleetStats['successRate'] ?? 0).toStringAsFixed(1)}%',
        'subtitle': 'Successful Deliveries',
        'icon': Icons.check_circle,
        'change': '+2.1%',
        'isPositive': true
      },
      {
        'title': 'Avg Delivery Time',
        'value':
            '${(fleetStats['avgResponseTime'] ?? 0).toStringAsFixed(0)} min',
        'subtitle': 'Response Time',
        'icon': Icons.schedule,
        'change': '-3.2 min',
        'isPositive': true
      },
      {
        'title': 'Drones Deployed',
        'value': '${fleetStats['activeDrones'] ?? 0}',
        'subtitle': 'Currently Active',
        'icon': Icons.flight,
        'change': '+2',
        'isPositive': true
      },
      {
        'title': 'Failed Missions',
        'value': '${_getFailedMissions()}',
        'subtitle': 'This Month',
        'icon': Icons.cancel,
        'change': '-4',
        'isPositive': true
      }
    ];
  }

  int _getFailedMissions() {
    if (fleetStats['monthlyData'] == null) return 0;
    return (fleetStats['monthlyData'] as List).fold<int>(0,
        (sum, month) => sum + ((month['unsuccessful_deliveries'] ?? 0) as int));
  }

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
      color:
          widget.isDarkMode ? const Color(0xFF121212) : const Color(0xFFF8F9FA),
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
                      const Icon(Icons.filter_list,
                          color: Colors.white, size: 16),
                      const SizedBox(width: 8),
                      Container(
                        padding: const EdgeInsets.symmetric(
                            horizontal: 12, vertical: 6),
                        decoration: BoxDecoration(
                          color: Colors.white.withValues(alpha: 0.1),
                          borderRadius: BorderRadius.circular(6),
                          border: Border.all(
                              color: Colors.white.withValues(alpha: 0.2)),
                        ),
                        child: DropdownButton<String>(
                          value: dateFilter,
                          dropdownColor: widget.isDarkMode
                              ? const Color(0xFF1E1E1E)
                              : null,
                          underline: const SizedBox(),
                          style: TextStyle(
                              color: widget.isDarkMode
                                  ? Colors.white
                                  : Colors.black,
                              fontSize: 14),
                          items: [
                            'January',
                            'February',
                            'March',
                            'April',
                            'May',
                            'June',
                            'July',
                            'August',
                            'September',
                            'October',
                            'November',
                            'December'
                          ]
                              .map((e) =>
                                  DropdownMenuItem(value: e, child: Text(e)))
                              .toList(),
                          onChanged: (value) =>
                              setState(() => dateFilter = value!),
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
                  if (isLoading)
                    const Center(child: CircularProgressIndicator())
                  else
                    GridView.count(
                      shrinkWrap: true,
                      physics: const NeverScrollableScrollPhysics(),
                      crossAxisCount: 2,
                      childAspectRatio: 1.2,
                      mainAxisSpacing: 12,
                      crossAxisSpacing: 12,
                      children:
                          kpiCards.map((kpi) => _buildKPICard(kpi)).toList(),
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
                  // _buildDisasterZonesMap(),

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
          color: widget.isDarkMode
              ? const Color(0xFF3A3A3A)
              : const Color(0xFFE5E7EB),
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
              color: widget.isDarkMode
                  ? const Color(0xFFB0B0B0)
                  : const Color(0xFF6B7280),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildDeliveryChart() {
    final screenWidth = MediaQuery.of(context).size.width;
    final titleFontSize = screenWidth < 350 ? 14.0 : 16.0;
    
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: widget.isDarkMode ? const Color(0xFF1E1E1E) : Colors.white,
        borderRadius: BorderRadius.circular(8),
        border: Border.all(
          color: widget.isDarkMode
              ? const Color(0xFF3A3A3A)
              : const Color(0xFFE5E7EB),
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
                color: widget.isDarkMode
                    ? const Color(0xFF03DAC6)
                    : const Color(0xFF10B981),
              ),
              const SizedBox(width: 8),
              Expanded(
                child: Text(
                  'Delivery Success Rate',
                  style: TextStyle(
                    fontSize: titleFontSize,
                    fontWeight: FontWeight.w600,
                    color: widget.isDarkMode
                        ? Colors.white
                        : const Color(0xFF0F172A),
                  ),
                  maxLines: 2,
                  overflow: TextOverflow.ellipsis,
                ),
              ),
            ],
          ),
          const SizedBox(height: 16),
          Container(
            height: 180,
            child: isLoading
                ? const Center(child: CircularProgressIndicator())
                : _buildDeliveryBarChart(),
          ),
        ],
      ),
    );
  }

  Widget _buildDroneUtilization() {
    final screenWidth = MediaQuery.of(context).size.width;
    final titleFontSize = screenWidth < 350 ? 14.0 : 16.0;
    
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: widget.isDarkMode ? const Color(0xFF1E1E1E) : Colors.white,
        borderRadius: BorderRadius.circular(8),
        border: Border.all(
          color: widget.isDarkMode
              ? const Color(0xFF3A3A3A)
              : const Color(0xFFE5E7EB),
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
                color: widget.isDarkMode
                    ? const Color(0xFFBB86FC)
                    : const Color(0xFF3B82F6),
              ),
              const SizedBox(width: 8),
              Expanded(
                child: Text(
                  'Drone Utilization',
                  style: TextStyle(
                    fontSize: titleFontSize,
                    fontWeight: FontWeight.w600,
                    color: widget.isDarkMode
                        ? Colors.white
                        : const Color(0xFF0F172A),
                  ),
                  maxLines: 2,
                  overflow: TextOverflow.ellipsis,
                ),
              ),
            ],
          ),
          const SizedBox(height: 16),
          Container(
            height: 120,
            child: isLoading
                ? const Center(child: CircularProgressIndicator())
                : _buildDroneUtilizationPieChart(),
          ),
        ],
      ),
    );
  }

  Widget _buildResponseTimeChart() {
    final screenWidth = MediaQuery.of(context).size.width;
    final titleFontSize = screenWidth < 350 ? 14.0 : 16.0;
    
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: widget.isDarkMode ? const Color(0xFF1E1E1E) : Colors.white,
        borderRadius: BorderRadius.circular(8),
        border: Border.all(
          color: widget.isDarkMode
              ? const Color(0xFF3A3A3A)
              : const Color(0xFFE5E7EB),
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
                color: widget.isDarkMode
                    ? const Color(0xFF03DAC6)
                    : const Color(0xFFF59E0B),
              ),
              const SizedBox(width: 8),
              Expanded(
                child: Text(
                  'Response Time Trend',
                  style: TextStyle(
                    fontSize: titleFontSize,
                    fontWeight: FontWeight.w600,
                    color: widget.isDarkMode
                        ? Colors.white
                        : const Color(0xFF0F172A),
                  ),
                  maxLines: 2,
                  overflow: TextOverflow.ellipsis,
                ),
              ),
            ],
          ),
          const SizedBox(height: 16),
          Container(
            height: 120,
            child: isLoading
                ? const Center(child: CircularProgressIndicator())
                : _buildResponseTimeLineChart(),
          ),
        ],
      ),
    );
  }

  // Widget _buildDisasterZonesMap() {
  //   return Container(
  //     padding: const EdgeInsets.all(16),
  //     decoration: BoxDecoration(
  //       color: widget.isDarkMode ? const Color(0xFF1E1E1E) : Colors.white,
  //       borderRadius: BorderRadius.circular(8),
  //       border: Border.all(
  //         color: widget.isDarkMode ? const Color(0xFF3A3A3A) : const Color(0xFFE5E7EB),
  //       ),
  //       boxShadow: [
  //         BoxShadow(
  //           color: Colors.black.withValues(alpha: 0.1),
  //           blurRadius: 8,
  //           offset: const Offset(0, 2),
  //         ),
  //       ],
  //     ),
  //     child: Column(
  //       crossAxisAlignment: CrossAxisAlignment.start,
  //       children: [
  //         Row(
  //           children: [
  //             Icon(
  //               Icons.location_on,
  //               size: 20,
  //               color: widget.isDarkMode ? const Color(0xFFCF6679) : const Color(0xFFEF4444),
  //             ),
  //             const SizedBox(width: 8),
  //             Text(
  //               'Disaster Zones Served',
  //               style: TextStyle(
  //                 fontSize: 16,
  //                 fontWeight: FontWeight.w600,
  //                 color: widget.isDarkMode ? Colors.white : const Color(0xFF0F172A),
  //               ),
  //             ),
  //           ],
  //         ),
  //         const SizedBox(height: 16),
  //         Container(
  //           height: 200,
  //           decoration: BoxDecoration(
  //             color: widget.isDarkMode ? const Color(0xFF2C2C2C) : const Color(0xFFF1F5F9),
  //             borderRadius: BorderRadius.circular(8),
  //           ),
  //           child: const Center(
  //             child: Text(
  //               'Interactive Map Placeholder\nShowing disaster zones with delivery counts',
  //               textAlign: TextAlign.center,
  //               style: TextStyle(color: Colors.grey),
  //             ),
  //           ),
  //         ),
  //         const SizedBox(height: 16),
  //         GridView.count(
  //           shrinkWrap: true,
  //           physics: const NeverScrollableScrollPhysics(),
  //           crossAxisCount: 2,
  //           childAspectRatio: 3,
  //           mainAxisSpacing: 8,
  //           crossAxisSpacing: 8,
  //           children: disasterZones.take(4).map((zone) => Container(
  //             padding: const EdgeInsets.all(12),
  //             decoration: BoxDecoration(
  //               color: widget.isDarkMode ? const Color(0xFF2C2C2C) : const Color(0xFFF8FAFC),
  //               borderRadius: BorderRadius.circular(8),
  //             ),
  //             child: Column(
  //               crossAxisAlignment: CrossAxisAlignment.start,
  //               children: [
  //                 Row(
  //                   children: [
  //                     Container(
  //                       width: 12,
  //                       height: 12,
  //                       decoration: BoxDecoration(
  //                         color: zone['status'] == 'critical' ? Colors.red :
  //                                zone['status'] == 'high' ? Colors.orange :
  //                                zone['status'] == 'medium' ? Colors.yellow :
  //                                Colors.green,
  //                         shape: BoxShape.circle,
  //                       ),
  //                     ),
  //                     const SizedBox(width: 8),
  //                     Expanded(
  //                       child: Text(
  //                         zone['name'] as String,
  //                         style: TextStyle(
  //                           fontSize: 12,
  //                           fontWeight: FontWeight.w500,
  //                           color: widget.isDarkMode ? const Color(0xFFE0E0E0) : const Color(0xFF374151),
  //                         ),
  //                         overflow: TextOverflow.ellipsis,
  //                       ),
  //                     ),
  //                   ],
  //                 ),
  //                 const SizedBox(height: 4),
  //                 Text(
  //                   '${zone['deliveries']} deliveries',
  //                   style: TextStyle(
  //                     fontSize: 16,
  //                     fontWeight: FontWeight.bold,
  //                     color: widget.isDarkMode ? const Color(0xFFBB86FC) : const Color(0xFF3B82F6),
  //                   ),
  //                 ),
  //               ],
  //             ),
  //           )).toList(),
  //         ),
  //       ],
  //     ),
  //   );
  // }

  Widget _buildMostDeliveredItems() {
    final screenWidth = MediaQuery.of(context).size.width;
    final titleFontSize = screenWidth < 350 ? 14.0 : 16.0;
    final itemFontSize = screenWidth < 350 ? 13.0 : 15.0;
    
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: widget.isDarkMode ? const Color(0xFF1E1E1E) : Colors.white,
        borderRadius: BorderRadius.circular(8),
        border: Border.all(
          color: widget.isDarkMode
              ? const Color(0xFF3A3A3A)
              : const Color(0xFFE5E7EB),
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
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  Icon(
                    Icons.local_shipping,
                    size: 20,
                    color: widget.isDarkMode
                        ? const Color(0xFF03DAC6)
                        : const Color(0xFF10B981),
                  ),
                  const SizedBox(width: 8),
                  Text(
                    'Most Delivered',
                    style: TextStyle(
                      fontSize: titleFontSize,
                      fontWeight: FontWeight.w600,
                      color: widget.isDarkMode
                          ? Colors.white
                          : const Color(0xFF0F172A),
                    ),
                  ),
                ],
              ),
              Padding(
                padding: const EdgeInsets.only(left: 28),
                child: Text(
                  'Items',
                  style: TextStyle(
                    fontSize: titleFontSize,
                    fontWeight: FontWeight.w600,
                    color: widget.isDarkMode
                        ? Colors.white
                        : const Color(0xFF0F172A),
                  ),
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
                        Expanded(
                          flex: 3,
                          child: Text(
                            item['name'] as String,
                            style: TextStyle(
                              fontSize: itemFontSize,
                              fontWeight: FontWeight.w500,
                              color: widget.isDarkMode
                                  ? Colors.white
                                  : const Color(0xFF0F172A),
                            ),
                            maxLines: 2,
                            overflow: TextOverflow.visible,
                          ),
                        ),
                        const SizedBox(width: 4),
                        Expanded(
                          flex: 1,
                          child: Text(
                            '${item['count']}',
                            style: TextStyle(
                              fontSize: 12,
                              fontWeight: FontWeight.w600,
                              color: widget.isDarkMode
                                  ? const Color(0xFFB0B0B0)
                                  : const Color(0xFF6B7280),
                            ),
                            textAlign: TextAlign.end,
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
                        widget.isDarkMode
                            ? const Color(0xFFBB86FC)
                            : const Color(0xFF3B82F6),
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
    final screenWidth = MediaQuery.of(context).size.width;
    final titleFontSize = screenWidth < 350 ? 14.0 : 16.0;
    
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: widget.isDarkMode ? const Color(0xFF1E1E1E) : Colors.white,
        borderRadius: BorderRadius.circular(8),
        border: Border.all(
          color: widget.isDarkMode
              ? const Color(0xFF3A3A3A)
              : const Color(0xFFE5E7EB),
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
                color: widget.isDarkMode
                    ? const Color(0xFFFFB74D)
                    : const Color(0xFFF59E0B),
              ),
              const SizedBox(width: 8),
              Expanded(
                child: Text(
                  'Drone Health Summary',
                  style: TextStyle(
                    fontSize: titleFontSize,
                    fontWeight: FontWeight.w600,
                    color: widget.isDarkMode
                        ? Colors.white
                        : const Color(0xFF0F172A),
                  ),
                  maxLines: 2,
                  overflow: TextOverflow.ellipsis,
                ),
              ),
            ],
          ),
          const SizedBox(height: 16),
          _buildHealthItem('Operational', '8 drones', const Color(0xFF10B981), 'operational'),
          const SizedBox(height: 12),
          _buildHealthItem(
              'Maintenance Due', '3 drones', const Color(0xFFF59E0B), 'maintenance'),
          const SizedBox(height: 12),
          _buildHealthItem('Needs Repair', '1 drone', const Color(0xFFEF4444), 'repair'),
          const SizedBox(height: 16),
          Container(
            padding: const EdgeInsets.only(top: 12),
            decoration: BoxDecoration(
              border: Border(
                top: BorderSide(
                  color: widget.isDarkMode
                      ? const Color(0xFF3A3A3A)
                      : const Color(0xFFE5E7EB),
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
                    color: widget.isDarkMode
                        ? const Color(0xFFB0B0B0)
                        : const Color(0xFF6B7280),
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
                          widget.isDarkMode
                              ? const Color(0xFF03DAC6)
                              : const Color(0xFF10B981),
                        ),
                      ),
                    ),
                    const SizedBox(width: 8),
                    Text(
                      '730/1000',
                      style: TextStyle(
                        fontSize: 12,
                        fontWeight: FontWeight.w500,
                        color: widget.isDarkMode
                            ? Colors.white
                            : const Color(0xFF374151),
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

  Widget _buildHealthItem(String label, String value, Color color, String itemKey) {
    final screenWidth = MediaQuery.of(context).size.width;
    final labelFontSize = screenWidth < 350 ? 12.0 : 14.0;
    final valueFontSize = screenWidth < 350 ? 11.0 : 13.0;
    final isExpanded = _healthItemExpanded[itemKey] ?? false;
    
    return GestureDetector(
      onTap: () {
        setState(() {
          _healthItemExpanded[itemKey] = !(_healthItemExpanded[itemKey] ?? false);
        });
      },
      child: Container(
        padding: const EdgeInsets.all(12),
        decoration: BoxDecoration(
          color: color.withValues(alpha: widget.isDarkMode ? 0.2 : 0.1),
          borderRadius: BorderRadius.circular(8),
        ),
        child: Row(
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
            Expanded(
              child: Text(
                isExpanded ? value : label,
                style: TextStyle(
                  fontSize: labelFontSize,
                  fontWeight: FontWeight.w500,
                  color: widget.isDarkMode
                      ? Colors.white
                      : const Color(0xFF0F172A),
                ),
                maxLines: 2,
                overflow: TextOverflow.ellipsis,
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildDeliveryBarChart() {
    final monthlyData = fleetStats['monthlyData'] as List? ?? [];
    if (monthlyData.isEmpty) {
      return const Center(child: Text('No data available'));
    }

    return BarChart(
      BarChartData(
        alignment: BarChartAlignment.spaceAround,
        maxY: monthlyData.fold(
                0.0,
                (max, data) => (data['successful_deliveries'] +
                                data['unsuccessful_deliveries'])
                            .toDouble() >
                        max
                    ? (data['successful_deliveries'] +
                            data['unsuccessful_deliveries'])
                        .toDouble()
                    : max) *
            1.2,
        barTouchData: BarTouchData(enabled: true),
        titlesData: FlTitlesData(
          show: true,
          bottomTitles: AxisTitles(
            sideTitles: SideTitles(
              showTitles: true,
              getTitlesWidget: (value, meta) {
                if (value.toInt() < monthlyData.length) {
                  final month = monthlyData[value.toInt()]['month']
                      .toString()
                      .split('-')[1];
                  return Text(month,
                      style: TextStyle(
                        color:
                            widget.isDarkMode ? Colors.white70 : Colors.black54,
                        fontSize: 12,
                      ));
                }
                return const Text('');
              },
            ),
          ),
          leftTitles: AxisTitles(sideTitles: SideTitles(showTitles: false)),
          topTitles: AxisTitles(sideTitles: SideTitles(showTitles: false)),
          rightTitles: AxisTitles(sideTitles: SideTitles(showTitles: false)),
        ),
        borderData: FlBorderData(show: false),
        barGroups: monthlyData.asMap().entries.map((entry) {
          final index = entry.key;
          final data = entry.value;
          return BarChartGroupData(
            x: index,
            barRods: [
              BarChartRodData(
                toY: (data['successful_deliveries'] +
                        data['unsuccessful_deliveries'])
                    .toDouble(),
                color: widget.isDarkMode
                    ? const Color(0xFF03DAC6)
                    : const Color(0xFF10B981),
                width: 16,
                borderRadius: BorderRadius.circular(4),
              ),
            ],
          );
        }).toList(),
      ),
    );
  }

  Widget _buildDroneUtilizationPieChart() {
    return PieChart(
      PieChartData(
        sectionsSpace: 2,
        centerSpaceRadius: 30,
        sections: [
          PieChartSectionData(
            color: widget.isDarkMode
                ? const Color(0xFF03DAC6)
                : const Color(0xFF10B981),
            value: 68,
            title: '68%',
            radius: 35,
            titleStyle: const TextStyle(
                fontSize: 12, fontWeight: FontWeight.bold, color: Colors.white),
          ),
          PieChartSectionData(
            color: widget.isDarkMode
                ? const Color(0xFFFFB74D)
                : const Color(0xFFF59E0B),
            value: 15,
            title: '15%',
            radius: 35,
            titleStyle: const TextStyle(
                fontSize: 12, fontWeight: FontWeight.bold, color: Colors.white),
          ),
          PieChartSectionData(
            color: widget.isDarkMode
                ? const Color(0xFF90A4AE)
                : const Color(0xFF6B7280),
            value: 17,
            title: '17%',
            radius: 35,
            titleStyle: const TextStyle(
                fontSize: 12, fontWeight: FontWeight.bold, color: Colors.white),
          ),
        ],
      ),
    );
  }

  Widget _buildResponseTimeLineChart() {
    final monthlyData = fleetStats['monthlyData'] as List? ?? [];
    if (monthlyData.isEmpty) {
      return const Center(child: Text('No data available'));
    }

    return LineChart(
      LineChartData(
        gridData: FlGridData(show: false),
        titlesData: FlTitlesData(
          bottomTitles: AxisTitles(
            sideTitles: SideTitles(
              showTitles: true,
              getTitlesWidget: (value, meta) {
                if (value.toInt() < monthlyData.length) {
                  final month = monthlyData[value.toInt()]['month']
                      .toString()
                      .split('-')[1];
                  return Text(month,
                      style: TextStyle(
                        color:
                            widget.isDarkMode ? Colors.white70 : Colors.black54,
                        fontSize: 10,
                      ));
                }
                return const Text('');
              },
            ),
          ),
          leftTitles: AxisTitles(sideTitles: SideTitles(showTitles: false)),
          topTitles: AxisTitles(sideTitles: SideTitles(showTitles: false)),
          rightTitles: AxisTitles(sideTitles: SideTitles(showTitles: false)),
        ),
        borderData: FlBorderData(show: false),
        lineBarsData: [
          LineChartBarData(
            spots: monthlyData.asMap().entries.map((entry) {
              return FlSpot(entry.key.toDouble(),
                  entry.value['average_response_time'].toDouble());
            }).toList(),
            isCurved: true,
            color: widget.isDarkMode
                ? const Color(0xFFFFB74D)
                : const Color(0xFFF59E0B),
            barWidth: 3,
            dotData: FlDotData(
              show: true,
              getDotPainter: (spot, percent, barData, index) {
                return FlDotCirclePainter(
                  radius: 4,
                  color: widget.isDarkMode
                      ? const Color(0xFFFFB74D)
                      : const Color(0xFFF59E0B),
                  strokeWidth: 2,
                  strokeColor: Colors.white,
                );
              },
            ),
            belowBarData: BarAreaData(
              show: true,
              color: (widget.isDarkMode
                      ? const Color(0xFFFFB74D)
                      : const Color(0xFFF59E0B))
                  .withValues(alpha: 0.3),
            ),
          ),
        ],
      ),
    );
  }
}
