import 'package:dio/dio.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class AuthService {
  static const String _baseUrl = 'https://ns2c9zrg-8000.inc1.devtunnels.ms'; // Use localhost
  static const FlutterSecureStorage _storage = FlutterSecureStorage();
  
  final Dio _dio = Dio(BaseOptions(
    baseUrl: _baseUrl,
    connectTimeout: const Duration(seconds: 10),
    receiveTimeout: const Duration(seconds: 10),
  ));

  // Login user
  Future<Map<String, dynamic>> login(String username, String password) async {
    try {
      final response = await _dio.post('/api/auth/login/', data: {
        'username': username,
        'password': password,
      });
      
      if (response.data['success']) {
        await _saveUserData(response.data);
        return {'success': true, 'data': response.data};
      }
      return {'success': false, 'message': response.data['message']};
    } on DioException catch (e) {
      if (e.response?.statusCode == 400) {
        return {'success': false, 'message': 'Invalid username or password.'};
      }
      return {'success': false, 'message': 'Network error. Please try again.'};
    }
  }

  // Register user
  Future<Map<String, dynamic>> register(String username, String email, String password) async {
    try {
      final response = await _dio.post('/api/auth/register/', data: {
        'username': username,
        'email': email,
        'password': password,
      });
      
      if (response.data['success']) {
        await _saveUserData(response.data);
        return {'success': true, 'data': response.data};
      }
      return {'success': false, 'message': response.data['message']};
    } on DioException catch (e) {
      if (e.response?.statusCode == 400) {
        final errors = e.response?.data['errors'];
        if (errors != null && errors['username'] != null) {
          return {'success': false, 'message': 'User already exists'};
        }
      }
      return {'success': false, 'message': 'Registration failed. Please try again.'};
    }
  }

  // Save user data and tokens
  Future<void> _saveUserData(Map<String, dynamic> data) async {
    await _storage.write(key: 'access_token', value: data['tokens']['access']);
    await _storage.write(key: 'refresh_token', value: data['tokens']['refresh']);
    await _storage.write(key: 'username', value: data['user']['username']);
    await _storage.write(key: 'email', value: data['user']['email']);
    await _storage.write(key: 'user_id', value: data['user']['id'].toString());
  }

  // Get stored token
  Future<String?> getToken() async {
    return await _storage.read(key: 'access_token');
  }

  // Get user data
  Future<Map<String, String?>> getUserData() async {
    return {
      'username': await _storage.read(key: 'username'),
      'email': await _storage.read(key: 'email'),
      'user_id': await _storage.read(key: 'user_id'),
    };
  }

  // Check if user is logged in
  Future<bool> isLoggedIn() async {
    final token = await getToken();
    return token != null;
  }

  // Logout
  Future<void> logout() async {
    await _storage.deleteAll();
  }
}