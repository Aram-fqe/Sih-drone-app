import 'dart:async';
import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter_map/flutter_map.dart';
import 'package:latlong2/latlong.dart';
import 'package:mqtt_client/mqtt_client.dart';
import 'package:mqtt_client/mqtt_server_client.dart';
import 'package:flutter_map_tile_caching/flutter_map_tile_caching.dart';

class DroneMap extends StatefulWidget {
  @override
  _DroneMapState createState() => _DroneMapState();
}

class _DroneMapState extends State<DroneMap> {
  LatLng _dronePos = LatLng(12.9716, 77.5946);
  final MapController _mapController = MapController();
  late MqttServerClient client;

  @override
  void initState() {
    super.initState();
    _connectMQTT();
  }

  Future<void> _connectMQTT() async {
    client = MqttServerClient('broker.hivemq.com', '');
    client.port = 1883;
    client.logging(on: false);
    client.keepAlivePeriod = 20;
    client.onConnected = () => print('MQTT Connected');
    client.onDisconnected = () => print('MQTT Disconnected');
    client.onSubscribed = (topic) => print('Subscribed to $topic');

    try {
      await client.connect();
      client.subscribe('drone/gps', MqttQos.atMostOnce);

      client.updates!.listen((messages) {
        final payload = messages[0].payload as MqttPublishMessage;
        final pt = MqttPublishPayload.bytesToStringAsString(payload.payload.message);
        final data = jsonDecode(pt);
        LatLng newPos = LatLng(data['lat'], data['lng']);
        setState(() => _dronePos = newPos);
        _mapController.move(_dronePos, 16);
      });
    } catch (e) {
      print('MQTT connection error: $e');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Drone Map')),
      body: FlutterMap(
        mapController: _mapController,
        options: const MapOptions(
          center: LatLng(12.9716, 77.5946),
          zoom: 16,
        ),
        children: [
          TileLayer(
            urlTemplate: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            subdomains: const ['a', 'b', 'c'],
            tileProvider: FMTC.instance('OSM').getTileProvider(),
          ),
          MarkerLayer(
            markers: [
              Marker(
                width: 40,
                height: 40,
                point: _dronePos,
                builder: (ctx) => const Icon(Icons.airplanemode_active, color: Colors.blue, size: 36),
              ),
            ],
          ),
        ],
      ),
    );
  }
}