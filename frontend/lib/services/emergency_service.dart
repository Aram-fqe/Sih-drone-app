import 'package:url_launcher/url_launcher.dart';
import 'package:permission_handler/permission_handler.dart';
import 'package:geolocator/geolocator.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class EmergencyService {
  static const String emergencyNumber = '112';
  static const String operationalNumber = '8000494294';
  static const String baseUrl = 'https://ns2c9zrg-8000.inc1.devtunnels.ms/api';

  static Future<bool> makeEmergencyCall() async {
    return await _makeCall(emergencyNumber, 'emergency');
  }

  static Future<bool> makeOperationalCall() async {
    return await _makeCall(operationalNumber, 'operational');
  }

  static Future<bool> makeCall(String phoneNumber, String callType) async {
    return await _makeCall(phoneNumber, callType);
  }

  static Future<bool> _makeCall(String phoneNumber, String callType) async {
    try {
      // Get location first
      Position? location = await _getCurrentLocation();
      
      // Try to make the call
      bool callSuccess = await _attemptCall(phoneNumber);
      
      // Log the call regardless of success
      await _logEmergencyCall(callSuccess, location, phoneNumber, callType);
      
      return callSuccess;
    } catch (e) {
      // Even if call fails, log the attempt
      await _logEmergencyCall(false, null, phoneNumber, callType);
      return false;
    }
  }

  static Future<bool> _attemptCall(String phoneNumber) async {
    try {
      // Request phone permission
      PermissionStatus permission = await Permission.phone.request();
      
      if (permission.isGranted) {
        final Uri phoneUri = Uri(scheme: 'tel', path: phoneNumber);
        
        if (await canLaunchUrl(phoneUri)) {
          await launchUrl(phoneUri);
          return true;
        }
      }
      return false;
    } catch (e) {
      return false;
    }
  }

  static Future<Position?> _getCurrentLocation() async {
    try {
      LocationPermission permission = await Geolocator.checkPermission();
      if (permission == LocationPermission.denied) {
        permission = await Geolocator.requestPermission();
      }
      
      if (permission == LocationPermission.whileInUse || 
          permission == LocationPermission.always) {
        return await Geolocator.getCurrentPosition();
      }
      return null;
    } catch (e) {
      return null;
    }
  }

  static Future<void> _logEmergencyCall(bool success, Position? location, String phoneNumber, String callType) async {
    try {
      final response = await http.post(
        Uri.parse('$baseUrl/emergency-calls/'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({
          'phone_number': phoneNumber,
          'call_success': success,
          'call_type': callType,
          'timestamp': DateTime.now().toIso8601String(),
          'latitude': location?.latitude,
          'longitude': location?.longitude,
        }),
      );
    } catch (e) {
      // Silent fail for logging
    }
  }
}