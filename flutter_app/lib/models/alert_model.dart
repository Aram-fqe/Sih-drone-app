class AlertData {
  final int id;
  final String type;
  final String severity;
  final String title;
  final String message;
  final String timestamp;

  const AlertData({
    required this.id,
    required this.type,
    required this.severity,
    required this.title,
    required this.message,
    required this.timestamp,
  });

  Map<String, dynamic> toJson() => {
    'id': id,
    'type': type,
    'severity': severity,
    'title': title,
    'message': message,
    'timestamp': timestamp,
  };

  factory AlertData.fromJson(Map<String, dynamic> json) => AlertData(
    id: json['id'],
    type: json['type'],
    severity: json['severity'],
    title: json['title'],
    message: json['message'],
    timestamp: json['timestamp'],
  );
}