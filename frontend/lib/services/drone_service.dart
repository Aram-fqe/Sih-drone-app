import 'package:dio/dio.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class DroneService {
  static const String _baseUrl = 'https://ns2c9zrg-8000.inc1.devtunnels.ms';
  static const FlutterSecureStorage _storage = FlutterSecureStorage();
  
  final Dio _dio = Dio(BaseOptions(
    baseUrl: _baseUrl,
    connectTimeout: const Duration(seconds: 10),
    receiveTimeout: const Duration(seconds: 10),
  ));

  // Add authorization header
  Future<void> _addAuthHeader() async {
    final token = await _storage.read(key: 'access_token');
    if (token != null) {
      _dio.options.headers['Authorization'] = 'Bearer $token';
    }
  }

  // Create new drone mission
  Future<Map<String, dynamic>> createMission({
    required double latitude,
    required double longitude,
    required Map<String, dynamic> packageDetails,
    required String urgencyLevel,
    int? assignedPilot,
    String? additionalNote,
  }) async {
    try {
      await _addAuthHeader();
      
      final response = await _dio.post('/api/drones/add/', data: {
        'location_latitude': latitude,
        'location_longitude': longitude,
        'package_details': packageDetails,
        'urgency_level': urgencyLevel,
        'assigned_pilot': assignedPilot,
        'additional_note': additionalNote ?? '',
        'status': 'Active',
      });
      
      if (response.statusCode == 201) {
        return {'success': true, 'data': response.data};
      }
      return {'success': false, 'message': 'Failed to create mission'};
    } on DioException catch (e) {
      if (e.response?.statusCode == 401) {
        return {'success': false, 'message': 'Authentication required'};
      }
      return {'success': false, 'message': 'Network error. Please try again.'};
    }
  }

  // Get all drones
  Future<Map<String, dynamic>> getDrones({String? urgency, String? status}) async {
    try {
      await _addAuthHeader();
      
      Map<String, dynamic> queryParams = {};
      if (urgency != null) queryParams['urgency'] = urgency;
      if (status != null) queryParams['status'] = status;
      
      final response = await _dio.get('/api/drones/', queryParameters: queryParams);
      
      if (response.statusCode == 200) {
        return {'success': true, 'data': response.data};
      }
      return {'success': false, 'message': 'Failed to fetch drones'};
    } on DioException catch (e) {
      if (e.response?.statusCode == 401) {
        return {'success': false, 'message': 'Authentication required'};
      }
      return {'success': false, 'message': 'Network error. Please try again.'};
    }
  }

  // Get all users (pilots)
  Future<Map<String, dynamic>> getUsers() async {
    try {
      await _addAuthHeader();
      
      final response = await _dio.get('/api/auth/users/');
      
      if (response.statusCode == 200) {
        return {'success': true, 'data': response.data};
      }
      return {'success': false, 'message': 'Failed to fetch users'};
    } on DioException catch (e) {
      if (e.response?.statusCode == 401) {
        return {'success': false, 'message': 'Authentication required'};
      }
      return {'success': false, 'message': 'Network error. Please try again.'};
    }
  }

  // Get package types
  Future<Map<String, dynamic>> getPackageTypes() async {
    return {
      'success': true,
      'data': [
        {'value': 'medical', 'label': 'Medical Supplies', 'weight': '2.5 kg', 'icon': '🏥'},
        {'value': 'food', 'label': 'Food & Water', 'weight': '3.0 kg', 'icon': '🍞'},
        {'value': 'rescue', 'label': 'Rescue Kit', 'weight': '1.8 kg', 'icon': '🛟'},
        {'value': 'communication', 'label': 'Communication Equipment', 'weight': '1.2 kg', 'icon': '📡'},
        {'value': 'shelter', 'label': 'Emergency Shelter', 'weight': '4.5 kg', 'icon': '⛺'},
        {'value': 'tools', 'label': 'Rescue Tools', 'weight': '3.2 kg', 'icon': '🔧'},
        {'value': 'blankets', 'label': 'Blankets & Clothing', 'weight': '2.0 kg', 'icon': '🧥'},
      ]
    };
  }

  // Get disaster zones
  Future<Map<String, dynamic>> getDisasterZones() async {
    return {
      'success': true,
      'data': [
        {'value': 'zone-alpha', 'label': 'Emergency Camp Alpha', 'coords': '42.3601° N, 71.0589° W'},
        {'value': 'zone-beta', 'label': 'Rescue Station Beta', 'coords': '42.3584° N, 71.0636° W'},
        {'value': 'zone-charlie', 'label': 'Forward Operating Base Charlie', 'coords': '42.3612° N, 71.0578° W'},
        {'value': 'zone-delta', 'label': 'Evacuation Point Delta', 'coords': '42.3595° N, 71.0612° W'},
      ]
    };
  }
}