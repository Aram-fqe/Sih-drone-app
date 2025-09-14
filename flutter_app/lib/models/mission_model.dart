enum MissionStatus { inTransit, delivering, returning, standby }

enum Priority { high, medium, low }

enum Connectivity { strong, weak, lost }

class PayloadItem {
  final String name;
  final String weight;
  final Priority priority;

  PayloadItem({
    required this.name,
    required this.weight,
    required this.priority,
  });

  Map<String, dynamic> toJson() => {
    'name': name,
    'weight': weight,
    'priority': priority.toString().split('.').last.toUpperCase(),
  };

  factory PayloadItem.fromJson(Map<String, dynamic> json) => PayloadItem(
    name: json['name'],
    weight: json['weight'],
    priority: Priority.values.firstWhere(
      (p) => p.toString().split('.').last.toUpperCase() == json['priority'].toString().toUpperCase(),
    ),
  );
}

class Recipient {
  final String name;
  final String contact;
  final String location;

  Recipient({
    required this.name,
    required this.contact,
    required this.location,
  });

  Map<String, dynamic> toJson() => {
    'name': name,
    'contact': contact,
    'location': location,
  };

  factory Recipient.fromJson(Map<String, dynamic> json) => Recipient(
    name: json['name'],
    contact: json['contact'],
    location: json['location'],
  );
}

class Telemetry {
  final int battery;
  final String altitude;
  final String speed;
  final Connectivity connectivity;

  Telemetry({
    required this.battery,
    required this.altitude,
    required this.speed,
    required this.connectivity,
  });

  Map<String, dynamic> toJson() => {
    'battery': battery,
    'altitude': altitude,
    'speed': speed,
    'connectivity': connectivity.toString().split('.').last.toUpperCase(),
  };

  factory Telemetry.fromJson(Map<String, dynamic> json) => Telemetry(
    battery: json['battery'],
    altitude: json['altitude'],
    speed: json['speed'],
    connectivity: Connectivity.values.firstWhere(
      (c) => c.toString().split('.').last.toUpperCase() == json['connectivity'].toString().toUpperCase(),
    ),
  );
}

class LiveLocation {
  final String coordinates;
  final String lastUpdate;
  final String distanceToDestination;

  LiveLocation({
    required this.coordinates,
    required this.lastUpdate,
    required this.distanceToDestination,
  });

  Map<String, dynamic> toJson() => {
    'coordinates': coordinates,
    'lastUpdate': lastUpdate,
    'distanceToDestination': distanceToDestination,
  };

  factory LiveLocation.fromJson(Map<String, dynamic> json) => LiveLocation(
    coordinates: json['coordinates'],
    lastUpdate: json['lastUpdate'],
    distanceToDestination: json['distanceToDestination'],
  );
}

class Mission {
  final String droneModel;
  final List<PayloadItem> payload;
  final Recipient recipient;
  final Telemetry telemetry;
  final LiveLocation liveLocation;

  Mission({
    required this.droneModel,
    required this.payload,
    required this.recipient,
    required this.telemetry,
    required this.liveLocation,
  });

  Map<String, dynamic> toJson() => {
    'droneModel': droneModel,
    'payload': payload.map((p) => p.toJson()).toList(),
    'recipient': recipient.toJson(),
    'telemetry': telemetry.toJson(),
    'liveLocation': liveLocation.toJson(),
  };

  factory Mission.fromJson(Map<String, dynamic> json) => Mission(
    droneModel: json['droneModel'],
    payload: (json['payload'] as List).map((p) => PayloadItem.fromJson(p)).toList(),
    recipient: Recipient.fromJson(json['recipient']),
    telemetry: Telemetry.fromJson(json['telemetry']),
    liveLocation: LiveLocation.fromJson(json['liveLocation']),
  );
}

class MissionData {
  final String droneId;
  final MissionStatus status;
  final Mission mission;

  MissionData({
    required this.droneId,
    required this.status,
    required this.mission,
  });

  Map<String, dynamic> toJson() => {
    'droneId': droneId,
    'status': status.toString().split('.').last.toUpperCase(),
    'mission': mission.toJson(),
  };

  factory MissionData.fromJson(Map<String, dynamic> json) => MissionData(
    droneId: json['droneId'],
    status: MissionStatus.values.firstWhere(
      (s) => s.toString().split('.').last.toUpperCase() == json['status'].toString().toUpperCase().replaceAll(' ', ''),
    ),
    mission: Mission.fromJson(json['mission']),
  );
}