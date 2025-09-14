import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Alert, AlertDescription } from './ui/alert';
import { Badge } from './ui/badge';
import { 
  Plane, 
  Package, 
  Clock, 
  AlertTriangle, 
  CloudRain, 
  Shield,
  Plus,
  Search,
  FileText,
  Activity
} from 'lucide-react';

interface DashboardScreenProps {
  isDarkMode?: boolean;
}

export function DashboardScreen({ isDarkMode = false }: DashboardScreenProps) {
  const [selectedAction, setSelectedAction] = useState<string | null>(null);

  // Mock data for dashboard stats
  const missionStats = {
    active: 12,
    completed: 847,
    pending: 5,
    failed: 3
  };

  const emergencyAlerts = [
    {
      id: 1,
      type: 'weather',
      severity: 'warning',
      title: 'Severe Weather Alert',
      message: 'High winds detected in Sector 7. Flight operations may be affected.',
      timestamp: '2 min ago'
    },
    {
      id: 2,
      type: 'geofence',
      severity: 'critical',
      title: 'Geofence Violation',
      message: 'DRONE-003 has entered restricted airspace. Immediate action required.',
      timestamp: '5 min ago'
    }
  ];

  const quickActions = [
    {
      id: 'deploy',
      label: 'Deploy Drone',
      icon: Plane,
      color: 'bg-blue-600 hover:bg-blue-700',
      description: 'Launch new mission'
    },
    {
      id: 'track',
      label: 'Track Deliveries',
      icon: Package,
      color: 'bg-green-600 hover:bg-green-700',
      description: 'Monitor packages'
    },
    {
      id: 'report',
      label: 'Create Report',
      icon: FileText,
      color: 'bg-orange-600 hover:bg-orange-700',
      description: 'Generate analytics'
    }
  ];

  return (
    <div className="pb-4">
      {/* Dashboard Title */}
      <div className="px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Mission Control
            </h1>
            <p className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              Real-time disaster response operations
            </p>
          </div>
          <Badge className={`${isDarkMode ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-700'}`}>
            <Activity className="w-3 h-3 mr-1" />
            System Active
          </Badge>
        </div>

        {/* Mission Overview Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Active Missions Card */}
          <Card className="bg-blue-600 border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <Plane className="w-5 h-5 text-white" />
                </div>
                <span className="text-white font-semibold">Active</span>
              </div>
              <div className="text-3xl font-bold text-white mb-1">{missionStats.active}</div>
              <p className="text-blue-100 text-sm">Missions in progress</p>
            </CardContent>
          </Card>

          {/* Deliveries Completed Card */}
          <Card className="bg-green-600 border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <Package className="w-5 h-5 text-white" />
                </div>
                <span className="text-white font-semibold">Completed</span>
              </div>
              <div className="text-3xl font-bold text-white mb-1">{missionStats.completed}</div>
              <p className="text-green-100 text-sm">Successful deliveries</p>
            </CardContent>
          </Card>

          {/* Pending Missions Card */}
          <Card className="bg-orange-500 border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-black/10 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-black" />
                </div>
                <span className="text-black font-semibold">Pending</span>
              </div>
              <div className="text-3xl font-bold text-black mb-1">{missionStats.pending}</div>
              <p className="text-orange-900 text-sm">Awaiting deployment</p>
            </CardContent>
          </Card>

          {/* Failed/Delayed Missions Card */}
          <Card className="bg-red-600 border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-white" />
                </div>
                <span className="text-white font-semibold">Failed</span>
              </div>
              <div className="text-3xl font-bold text-white mb-1">{missionStats.failed}</div>
              <p className="text-red-100 text-sm">Require attention</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions Section */}
        <div className="mb-6">
          <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 gap-3">
            {quickActions.map((action) => (
              <Button
                key={action.id}
                onClick={() => setSelectedAction(action.id)}
                className={`${action.color} text-white h-16 flex items-center justify-start gap-4 px-6 rounded-xl shadow-lg transition-all duration-200 hover:scale-[1.02]`}
              >
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <action.icon className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <div className="font-semibold">{action.label}</div>
                  <div className="text-sm opacity-90">{action.description}</div>
                </div>
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Emergency Alerts Section */}
      <div className="px-4">
        <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
          Emergency Alerts
        </h3>
        <div className="space-y-3">
          {emergencyAlerts.map((alert) => (
            <Alert
              key={alert.id}
              className={`transition-colors duration-300 ${
                alert.severity === 'critical'
                  ? isDarkMode
                    ? 'bg-red-900/20 border-red-800 text-red-200'
                    : 'bg-red-50 border-red-200 text-red-800'
                  : isDarkMode
                    ? 'bg-yellow-900/20 border-yellow-800 text-yellow-200'
                    : 'bg-yellow-50 border-yellow-200 text-yellow-800'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  alert.severity === 'critical'
                    ? isDarkMode
                      ? 'bg-red-800/30'
                      : 'bg-red-100'
                    : isDarkMode
                      ? 'bg-yellow-800/30'
                      : 'bg-yellow-100'
                }`}>
                  {alert.type === 'weather' ? (
                    <CloudRain className="w-4 h-4" />
                  ) : (
                    <Shield className="w-4 h-4" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-semibold text-sm">{alert.title}</h4>
                    <Badge variant={alert.severity === 'critical' ? 'destructive' : 'secondary'}>
                      {alert.severity}
                    </Badge>
                  </div>
                  <AlertDescription className="text-sm mb-2">
                    {alert.message}
                  </AlertDescription>
                  <p className={`text-xs ${
                    isDarkMode ? 'text-slate-400' : 'text-slate-500'
                  }`}>
                    {alert.timestamp}
                  </p>
                </div>
              </div>
            </Alert>
          ))}
        </div>
      </div>

      {/* Action Confirmation */}
      {selectedAction && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className={`max-w-sm w-full ${isDarkMode ? 'bg-slate-800' : 'bg-white'}`}>
            <CardContent className="p-6">
              <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                Action Selected
              </h3>
              <p className={`text-sm mb-4 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                {quickActions.find(a => a.id === selectedAction)?.label} feature will be available soon.
              </p>
              <Button
                onClick={() => setSelectedAction(null)}
                className="w-full"
              >
                Close
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}