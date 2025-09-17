import 'package:flutter/material.dart';
import 'package:flutter_map_tile_caching/flutter_map_tile_caching.dart';
import 'package:provider/provider.dart';
import 'providers/app_state_provider.dart';
import 'screens/app_wrapper.dart';
import '../map.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  // Initialize tile caching for OSM tiles
  await FMTC.instance('OSM').manage.create();

  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => AppStateProvider()),
      ],
      child: Consumer<AppStateProvider>(
        builder: (context, appState, child) {
          return MaterialApp(
            title: 'DroneOps - Disaster Response',
            debugShowCheckedModeBanner: false,
            builder: (context, child) {
              return MediaQuery(
                data: MediaQuery.of(context).copyWith(
                  textScaler: TextScaler.linear(MediaQuery.of(context).textScaler.scale(1.0).clamp(0.8, 1.2)),
                ),
                child: child!,
              );
            },
            theme: ThemeData(
              useMaterial3: true,
              colorScheme: ColorScheme.fromSeed(
                seedColor: const Color(0xFF030213),
                brightness: Brightness.light,
              ),
              scaffoldBackgroundColor: const Color(0xFFF8F9FA),
              visualDensity: VisualDensity.adaptivePlatformDensity,
            ),
            darkTheme: ThemeData(
              useMaterial3: true,
              colorScheme: ColorScheme.fromSeed(
                seedColor: const Color(0xFFBB86FC),
                brightness: Brightness.dark,
              ).copyWith(
                primary: const Color(0xFFBB86FC),
                secondary: const Color(0xFF03DAC6),
                surface: const Color(0xFF121212),
                onSurface: const Color(0xFFE0E0E0),
              ),
              scaffoldBackgroundColor: const Color(0xFF121212),
              visualDensity: VisualDensity.adaptivePlatformDensity,
            ),
            themeMode: appState.isDarkMode ? ThemeMode.dark : ThemeMode.light,
            home: const AppWrapper(),
          );
        },
      ),
    );
  }
}

class PreCacheTilesButton extends StatefulWidget {
  const PreCacheTilesButton({super.key});

  @override
  State<PreCacheTilesButton> createState() => _PreCacheTilesButtonState();
}

class _PreCacheTilesButtonState extends State<PreCacheTilesButton> {
  bool _isLoading = false;

  Future<void> _downloadTiles() async {
    setState(() => _isLoading = true);

    final cacheManager = FMTC.instance('OSM');
    final north = 12.98;
    final south = 12.96;
    final east = 77.61;
    final west = 77.58;
    final zoomLevels = [14, 15, 16];

    await cacheManager.tileStore.downloadRegion(
      BoundingBox(north, east, south, west),
      zoomLevels,
    );

    setState(() => _isLoading = false);
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Tiles downloaded!')),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        ElevatedButton(
          onPressed: _isLoading ? null : _downloadTiles,
          child: const Text('Pre-Cache Map Tiles'),
        ),
        if (_isLoading)
          const Padding(
            padding: EdgeInsets.all(8.0),
            child: CircularProgressIndicator(),
          ),
      ],
    );
  }
}

class DroneMapScreen extends StatelessWidget {
  const DroneMapScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Drone Map')),
      body: Column(
        children: [
          const PreCacheTilesButton(),
          Expanded(child: DroneMap()),
        ],
      ),
    );
  }
}