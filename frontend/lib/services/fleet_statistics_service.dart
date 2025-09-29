import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class FleetStatisticsService {
  static const String baseUrl = 'https://ns2c9zrg-8000.inc1.devtunnels.ms/api';
  static const FlutterSecureStorage _storage = FlutterSecureStorage();

  static Future<Map<String, String>> _getHeaders() async {
    final token = await _storage.read(key: 'auth_token');
    return {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer $token',
    };
  }

  static Future<List<Map<String, dynamic>>> getFleetStatistics({String? month}) async {
    try {
      final headers = await _getHeaders();
      String url = '$baseUrl/fleet-statistics/';
      if (month != null) {
        url += '?month=$month';
      }
      
      final response = await http.get(Uri.parse(url), headers: headers);
      
      if (response.statusCode == 200) {
        final List<dynamic> data = json.decode(response.body);
        return data.cast<Map<String, dynamic>>();
      }
      return [];
    } catch (e) {
      return [];
    }
  }

  static Future<Map<String, dynamic>> getAggregatedStats() async {
    try {
      final stats = await getFleetStatistics();
      if (stats.isEmpty) return _getMockData();
      
      int totalDeliveries = 0;
      int successfulDeliveries = 0;
      double totalResponseTime = 0;
      int activeDrones = 0;
      
      for (var stat in stats) {
        totalDeliveries += ((stat['successful_deliveries'] ?? 0) as int) + ((stat['unsuccessful_deliveries'] ?? 0) as int);
        successfulDeliveries += (stat['successful_deliveries'] ?? 0) as int;
        totalResponseTime += (stat['average_response_time'] ?? 0) as double;
        activeDrones = (stat['active_drones'] ?? 0) as int;
      }
      
      return {
        'totalDeliveries': totalDeliveries,
        'successRate': totalDeliveries > 0 ? (successfulDeliveries / totalDeliveries * 100) : 0,
        'avgResponseTime': stats.isNotEmpty ? totalResponseTime / stats.length : 0,
        'activeDrones': activeDrones,
        'monthlyData': stats,
      };
    } catch (e) {
      return _getMockData();
    }
  }

  static Map<String, dynamic> _getMockData() {
    return {
      'totalDeliveries': 523,
      'successRate': 98.2,
      'avgResponseTime': 15.0,
      'activeDrones': 12,
      'monthlyData': [
        {'month': '2024-01', 'successful_deliveries': 45, 'unsuccessful_deliveries': 2, 'average_response_time': 16.5},
        {'month': '2024-02', 'successful_deliveries': 52, 'unsuccessful_deliveries': 1, 'average_response_time': 15.2},
        {'month': '2024-03', 'successful_deliveries': 48, 'unsuccessful_deliveries': 3, 'average_response_time': 14.8},
        {'month': '2024-04', 'successful_deliveries': 61, 'unsuccessful_deliveries': 2, 'average_response_time': 13.9},
        {'month': '2024-05', 'successful_deliveries': 58, 'unsuccessful_deliveries': 1, 'average_response_time': 15.1},
        {'month': '2024-06', 'successful_deliveries': 67, 'unsuccessful_deliveries': 2, 'average_response_time': 14.5},
      ],
    };
  }
}