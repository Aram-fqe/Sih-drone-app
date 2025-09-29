import 'dart:convert';
import 'package:http/http.dart' as http;

class ChatService {
  static const String baseUrl = 'https://ns2c9zrg-8000.inc1.devtunnels.ms/api/chatbot';
  
  static String? _authToken;
  
  static void setAuthToken(String token) {
    _authToken = token;
  }
  
  static Map<String, String> get _headers => {
    'Content-Type': 'application/json',
    if (_authToken != null) 'Authorization': 'Bearer $_authToken',
  };

  static Future<Map<String, dynamic>> sendMessage({
    required String message,
    String? sessionId,
  }) async {
    try {
      final response = await http.post(
        Uri.parse('$baseUrl/chat/'),
        headers: _headers,
        body: jsonEncode({
          'message': message,
          if (sessionId != null) 'session_id': sessionId,
        }),
      );

      if (response.statusCode == 200) {
        return jsonDecode(response.body);
      } else {
        throw Exception('Failed to send message: ${response.statusCode}');
      }
    } catch (e) {
      throw Exception('Network error: $e');
    }
  }

  static Future<Map<String, dynamic>> executeQuickAction({
    required String actionType,
    Map<String, dynamic>? data,
    String? sessionId,
  }) async {
    try {
      final response = await http.post(
        Uri.parse('$baseUrl/quick-action/'),
        headers: _headers,
        body: jsonEncode({
          'action_type': actionType,
          'data': data ?? {},
          if (sessionId != null) 'session_id': sessionId,
        }),
      );

      if (response.statusCode == 200) {
        return jsonDecode(response.body);
      } else {
        throw Exception('Failed to execute quick action: ${response.statusCode}');
      }
    } catch (e) {
      throw Exception('Network error: $e');
    }
  }
}