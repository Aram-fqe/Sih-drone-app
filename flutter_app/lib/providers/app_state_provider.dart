import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../models/mission_model.dart';
import '../models/alert_model.dart';

class AppStateProvider extends ChangeNotifier {
  String _activeTab = 'dashboard';
  bool _isDarkMode = false;
  String _appState = 'onboarding'; // onboarding, auth, main
  bool _showSOSPanel = false;
  bool _showAddMissionModal = false;
  List<MissionData> _missions = [];
  List<AlertData> _alerts = [];

  // Getters
  String get activeTab => _activeTab;
  bool get isDarkMode => _isDarkMode;
  String get appState => _appState;
  bool get showSOSPanel => _showSOSPanel;
  bool get showAddMissionModal => _showAddMissionModal;
  List<MissionData> get missions => _missions;
  List<AlertData> get alerts => _alerts;

  AppStateProvider() {
    _loadInitialData();
    _initializeMockData();
  }

  void _loadInitialData() async {
    final prefs = await SharedPreferences.getInstance();
    _isDarkMode = prefs.getBool('droneops-dark-mode') ?? false;
    
    final hasCompletedOnboarding = prefs.getBool('droneops-onboarding-complete') ?? false;
    final hasCompletedAuth = prefs.getBool('droneops-auth-complete') ?? false;
    
    if (!hasCompletedOnboarding) {
      _appState = 'onboarding';
    } else if (!hasCompletedAuth) {
      _appState = 'auth';
    } else {
      _appState = 'main';
    }
    
    notifyListeners();
  }

  void _initializeMockData() {
    // Initialize mock missions - exactly matching website data
    _missions = [
      MissionData(
        droneId: 'DRONE-001',
        status: MissionStatus.inTransit,
        mission: Mission(
          droneModel: 'MQ-9 Guardian',
          payload: [
            PayloadItem(name: 'Medical Supplies', weight: '2.5 kg', priority: Priority.high),
            PayloadItem(name: 'Emergency Radio', weight: '0.8 kg', priority: Priority.medium),
          ],
          recipient: Recipient(
            name: 'Dr. Sarah Williams',
            contact: '+1 (555) 123-4567',
            location: 'Emergency Camp Alpha, Grid: 42.3601° N, 71.0589° W',
          ),
          telemetry: Telemetry(
            battery: 78,
            altitude: '245 ft',
            speed: '35 mph',
            connectivity: Connectivity.strong,
          ),
          liveLocation: LiveLocation(
            coordinates: '42.3598° N, 71.0595° W',
            lastUpdate: '2 sec ago',
            distanceToDestination: '2.3 km',
          ),
        ),
      ),
      MissionData(
        droneId: 'DRONE-002',
        status: MissionStatus.delivering,
        mission: Mission(
          droneModel: 'DJI Matrice 300',
          payload: [
            PayloadItem(name: 'Water Purification Kit', weight: '1.2 kg', priority: Priority.high),
            PayloadItem(name: 'Food Rations', weight: '3.0 kg', priority: Priority.medium),
            PayloadItem(name: 'Solar Charger', weight: '0.5 kg', priority: Priority.low),
          ],
          recipient: Recipient(
            name: 'Commander Jake Morrison',
            contact: '+1 (555) 987-6543',
            location: 'Rescue Station Beta, Grid: 42.3584° N, 71.0636° W',
          ),
          telemetry: Telemetry(
            battery: 92,
            altitude: '180 ft',
            speed: '28 mph',
            connectivity: Connectivity.strong,
          ),
          liveLocation: LiveLocation(
            coordinates: '42.3585° N, 71.0634° W',
            lastUpdate: 'Live',
            distanceToDestination: '150 m',
          ),
        ),
      ),
      MissionData(
        droneId: 'DRONE-003',
        status: MissionStatus.returning,
        mission: Mission(
          droneModel: 'Autel EVO II Pro',
          payload: [
            PayloadItem(name: 'Surveillance Equipment', weight: '1.8 kg', priority: Priority.medium),
          ],
          recipient: Recipient(
            name: 'Lt. Maria Rodriguez',
            contact: '+1 (555) 456-7890',
            location: 'Forward Operating Base Charlie',
          ),
          telemetry: Telemetry(
            battery: 45,
            altitude: '320 ft',
            speed: '42 mph',
            connectivity: Connectivity.weak,
          ),
          liveLocation: LiveLocation(
            coordinates: '42.3612° N, 71.0578° W',
            lastUpdate: '5 sec ago',
            distanceToDestination: '1.8 km',
          ),
        ),
      ),
    ];

    // Initialize mock alerts - exactly matching website data
    _alerts = [
      const AlertData(
        id: 1,
        type: 'weather',
        severity: 'warning',
        title: 'Severe Weather Alert',
        message: 'High winds detected in Sector 7. Flight operations may be affected.',
        timestamp: '2 min ago',
      ),
      const AlertData(
        id: 2,
        type: 'geofence',
        severity: 'critical',
        title: 'Geofence Violation',
        message: 'Drone DRN003 has breached designated flight zone.',
        timestamp: '15 min ago',
      ),
    ];

    notifyListeners();
  }

  void setActiveTab(String tab) {
    _activeTab = tab;
    notifyListeners();
  }

  void toggleDarkMode() async {
    _isDarkMode = !_isDarkMode;
    final prefs = await SharedPreferences.getInstance();
    await prefs.setBool('droneops-dark-mode', _isDarkMode);
    notifyListeners();
  }

  void completeOnboarding() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setBool('droneops-onboarding-complete', true);
    _appState = 'auth';
    notifyListeners();
  }

  void completeAuth() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setBool('droneops-auth-complete', true);
    _appState = 'main';
    notifyListeners();
  }

  void logout() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove('droneops-auth-complete');
    _appState = 'auth';
    notifyListeners();
  }

  void setSOSPanel(bool show) {
    _showSOSPanel = show;
    notifyListeners();
  }

  void toggleSOSPanel() {
    _showSOSPanel = !_showSOSPanel;
    notifyListeners();
  }

  void setAddMissionModal(bool show) {
    _showAddMissionModal = show;
    notifyListeners();
  }

  void toggleAddMissionModal() {
    _showAddMissionModal = !_showAddMissionModal;
    notifyListeners();
  }

  void addMission(MissionData mission) {
    _missions.insert(0, mission);
    notifyListeners();
  }

  void updateMission(String droneId, MissionData updatedMission) {
    final index = _missions.indexWhere((m) => m.droneId == droneId);
    if (index != -1) {
      _missions[index] = updatedMission;
      notifyListeners();
    }
  }

  void removeMission(String droneId) {
    _missions.removeWhere((m) => m.droneId == droneId);
    notifyListeners();
  }

  // Alert Management
  void addAlert(AlertData alert) {
    _alerts.insert(0, alert);
    notifyListeners();
  }

  void removeAlert(int id) {
    _alerts.removeWhere((a) => a.id == id);
    notifyListeners();
  }

  void clearAlerts() {
    _alerts.clear();
    notifyListeners();
  }
}