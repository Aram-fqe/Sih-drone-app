# DroneOps Emergency System

Drone operations management system with integrated automatic emergency calling functionality.

## Features

### Core Drone Operations
- **Mission Management**: Create, track, and manage drone missions
- **Real-time Monitoring**: Live telemetry and GPS tracking
- **Fleet Analytics**: Comprehensive reporting and statistics
- **Multi-user Support**: Role-based access control

### Emergency Calling System
- **Integrated SOS Button**: Red emergency button in top-right corner
- **Automatic 112 Calling**: One-tap emergency calling to emergency services
- **Location Sharing**: Automatically shares GPS location during emergency
- **Call Logging**: All emergency calls logged to backend with timestamp and location
- **Cross-platform**: Works on both Android and iOS
- **Fallback System**: Even if call fails, emergency alert is sent to backend

## Project Structure

```
NEW_SIH/
├── frontend/           # Flutter mobile app
│   ├── lib/
│   │   ├── main.dart
│   │   ├── screens/
│   │   │   ├── onboarding_screen.dart
│   │   │   ├── auth_screen.dart
│   │   │   ├── main_screen.dart
│   │   │   ├── reports_screen.dart
│   │   │   └── chatbot_screen.dart
│   │   ├── widgets/
│   │   │   └── sos_panel.dart      # Emergency SOS functionality
│   │   ├── services/
│   │   │   └── emergency_service.dart  # 112 calling service
│   │   └── providers/
│   │       └── app_state_provider.dart
│   ├── android/        # Android configuration
│   ├── ios/           # iOS configuration
│   └── pubspec.yaml
├── backend/           # Django REST API
│   ├── drone_backend/  # Main Django project
│   ├── emergency_api/  # Emergency calling API
│   ├── drone_app/     # Drone operations
│   ├── fleet_app/     # Fleet management
│   ├── auth_app/      # Authentication
│   ├── manage.py
│   └── requirements.txt
└── README.md
```

## Setup Instructions

### Backend Setup (Django)

1. Navigate to backend directory:
```bash
cd backend
```

2. Create virtual environment:
```bash
python -m venv venv
venv\Scripts\activate  # Windows
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Run migrations:
```bash
python manage.py makemigrations
python manage.py migrate
```

5. Start server:
```bash
python manage.py runserver
```

### Frontend Setup (Flutter)

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
flutter pub get
```

3. Run the app:
```bash
flutter run
```

## How Emergency SOS Works

1. **User clicks red SOS button** (top-right corner) → SOS panel opens
2. **User selects "Human Emergency"** → App requests phone and location permissions
3. **Location detected** → GPS coordinates captured automatically
4. **Emergency call initiated** → App automatically dials 112 using native phone app
5. **Call logged** → Success/failure status sent to backend with location data
6. **Fallback protection** → If call fails, emergency alert still sent to backend
7. **User feedback** → Success/failure notification displayed

## Permissions Setup

### Android (AndroidManifest.xml)
```xml
<uses-permission android:name="android.permission.CALL_PHONE" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
```

### iOS (Info.plist)
```xml
<key>LSApplicationQueriesSchemes</key>
<array>
    <string>tel</string>
</array>
<key>NSLocationWhenInUseUsageDescription</key>
<string>Location needed for emergency calls</string>
```

## API Endpoints

### Drone Operations
- `GET /api/missions/` - Get all missions
- `POST /api/missions/` - Create new mission
- `GET /api/fleet-stats/` - Get fleet statistics
- `GET /api/reports/` - Get reports data

### Emergency System
- `POST /api/emergency-calls/` - Log emergency call
- `GET /api/call-history/` - Get call history

## Database Schema (SQLite)

**EmergencyCall Model:**
- `phone_number` - Emergency number called
- `call_success` - Whether call was successful
- `timestamp` - When call was made
- `latitude/longitude` - GPS coordinates
- `user` - User who made the call (optional)

## Testing Emergency System

1. **Test SOS panel**: Click red SOS button in app header
2. **Test emergency call**: Select "Human Emergency" (will actually dial 112)
3. **Test logging**: Check Django admin for call records
4. **Test permissions**: Verify location and phone permissions work
5. **Test fallback**: Deny phone permission, verify backend still receives alert
6. **Test integration**: Ensure normal app flow still works (onboarding → auth → main)

## Security Notes

- Emergency calls work even without user authentication
- Location data is only collected during emergency situations
- All emergency calls are logged for safety and reporting
- App handles permission denials gracefully

## Production Deployment

1. Update `baseUrl` in `emergency_service.dart` to production server
2. Configure Django settings for production
3. Set up proper SSL certificates
4. Configure app store permissions and descriptions
5. Test emergency calling functionality thoroughly
6. Ensure compliance with emergency services regulations

## Contact

For support or questions about the Emergency Caller Agent system.