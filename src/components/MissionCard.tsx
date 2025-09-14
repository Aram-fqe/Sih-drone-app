import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { MapPin, Battery, Package, Phone, ArrowLeft, Share, RotateCcw, Zap, Navigation, Radio, ChevronDown, ChevronUp, X, Plane } from 'lucide-react';
import { Progress } from './ui/progress';
import { ImageWithFallback } from './figma/ImageWithFallback';
// Using Lucide Plane icon as drone symbol

interface MissionCardProps {
  droneId: string;
  status: 'In Transit' | 'Delivering' | 'Returning' | 'Standby';
  mission: {
    droneModel: string;
    payload: { name: string; weight: string; priority: 'High' | 'Medium' | 'Low' }[];
    recipient: { name: string; contact: string; location: string };
    telemetry: { battery: number; altitude: string; speed: string; connectivity: 'Strong' | 'Weak' | 'Lost' };
    liveLocation: { coordinates: string; lastUpdate: string; distanceToDestination: string };
  };
  isDarkMode?: boolean;
}

export function MissionCard({ droneId, status, mission, isDarkMode = false }: MissionCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showLiveMap, setShowLiveMap] = useState(false);

  const statusColors = {
    'In Transit': isDarkMode ? 'bg-[#BB86FC]' : 'bg-blue-500',
    'Delivering': isDarkMode ? 'bg-[#CF6679]' : 'bg-orange-500', 
    'Returning': isDarkMode ? 'bg-[#03DAC6]' : 'bg-green-500',
    'Standby': 'bg-gray-500'
  };

  // Drone status colors based on operational state
  const getDroneStatusColor = (status: string) => {
    switch (status) {
      case 'In Transit':
      case 'Delivering':
        return 'text-green-500'; // 🟢 Active/Online
      case 'Returning':
        return 'text-yellow-500'; // 🟡 Idle/Standby
      case 'Standby':
        return 'text-red-500'; // 🔴 Offline/Disconnected
      default:
        return 'text-gray-500';
    }
  };

  // Get drone icon color class
  const getDroneIconColor = (status: string) => {
    switch (status) {
      case 'In Transit':
      case 'Delivering':
        return 'text-green-500'; // 🟢 Green for Active/Online
      case 'Returning':
        return 'text-yellow-500'; // 🟡 Yellow for Idle/Standby
      case 'Standby':
        return 'text-red-500'; // 🔴 Red for Offline/Disconnected
      default:
        return 'text-gray-500';
    }
  };

  const getDroneStatusBg = (status: string, isDark: boolean) => {
    switch (status) {
      case 'In Transit':
      case 'Delivering':
        return isDark ? 'bg-green-500/20' : 'bg-green-100'; // Active
      case 'Returning':
        return isDark ? 'bg-yellow-500/20' : 'bg-yellow-100'; // Standby
      case 'Standby':
        return isDark ? 'bg-red-500/20' : 'bg-red-100'; // Offline
      default:
        return isDark ? 'bg-gray-500/20' : 'bg-gray-100';
    }
  };

  const statusGradients = {
    'In Transit': isDarkMode ? 'from-[#BB86FC]/20 to-[#BB86FC]/10' : 'from-blue-500/20 to-blue-600/10',
    'Delivering': isDarkMode ? 'from-[#CF6679]/20 to-[#CF6679]/10' : 'from-orange-500/20 to-orange-600/10',
    'Returning': isDarkMode ? 'from-[#03DAC6]/20 to-[#03DAC6]/10' : 'from-green-500/20 to-green-600/10',
    'Standby': 'from-gray-500/20 to-gray-600/10'
  };

  if (expanded) {
    return (
      <Card className={`w-full mb-4 overflow-hidden border-2 shadow-xl ${
        isDarkMode ? 'bg-[#1E1E1E] border-[#BB86FC]' : 'border-blue-200'
      }`}>
        <div className={`${
          isDarkMode 
            ? 'bg-gradient-to-r from-[#1E1E1E] to-[#222222]' 
            : 'bg-gradient-to-r from-slate-800 to-slate-700'
        } p-4 text-white`}>
          <div className="flex items-center justify-between mb-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setExpanded(false)}
              className="text-white hover:bg-white/20 p-2"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h3 className="font-semibold">{droneId} - {mission.droneModel}</h3>
            <Badge className={`${statusColors[status]} text-white`}>
              {status}
            </Badge>
          </div>
          
          {/* Map Section */}
          <div className="bg-slate-700 rounded-lg p-4 mb-4">
            <div className="relative h-32 bg-slate-600 rounded-lg overflow-hidden">
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1637118024908-9ab4c9ac9391?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcm9uZSUyMGFlcmlhbCUyMHZpZXclMjBkaXNhc3RlciUyMG1hbmFnZW1lbnR8ZW58MXx8fHwxNzU3NzcxOTI3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Live drone location"
                className="w-full h-full object-cover opacity-70"
              />
              <div className="absolute top-2 left-2 bg-red-500 w-3 h-3 rounded-full animate-pulse"></div>
              <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                Live Feed
              </div>
            </div>
            <p className="text-xs text-slate-300 mt-2">Real-time tracking: Path from HQ to {mission.recipient.location}</p>
          </div>
        </div>

        <CardContent className="p-4 space-y-4">
          {/* Payload Details */}
          <div>
            <h4 className={`font-semibold mb-2 flex items-center gap-2 ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}>
              <Package className="w-4 h-4 text-blue-600" />
              Payload Details
            </h4>
            <div className="space-y-2">
              {mission.payload.map((item, idx) => (
                <div key={idx} className={`flex justify-between items-center p-2 rounded ${
                  isDarkMode ? 'bg-[#2C2C2C]' : 'bg-slate-50'
                }`}>
                  <div>
                    <p className={`font-medium ${
                      isDarkMode ? 'text-white' : 'text-slate-900'
                    }`}>{item.name}</p>
                    <p className={`text-sm ${
                      isDarkMode ? 'text-[#B0B0B0]' : 'text-gray-600'
                    }`}>{item.weight}</p>
                  </div>
                  {isDarkMode ? (
                    <div className={`px-2 py-1 rounded text-sm font-medium ${
                      item.priority === 'High' 
                        ? 'bg-red-200 text-black' 
                        : item.priority === 'Medium' 
                          ? 'bg-purple-200 text-black'
                          : 'bg-green-200 text-black'
                    }`}>
                      {item.priority}
                    </div>
                  ) : (
                    <Badge variant={item.priority === 'High' ? 'destructive' : item.priority === 'Medium' ? 'default' : 'secondary'}>
                      {item.priority}
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Recipient Info */}
          <div>
            <h4 className={`font-semibold mb-2 flex items-center gap-2 ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}>
              <MapPin className="w-4 h-4 text-green-600" />
              Recipient Information
            </h4>
            <div className={`p-3 rounded ${
              isDarkMode ? 'bg-[#2C2C2C]' : 'bg-slate-50'
            }`}>
              <p className={`font-medium ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}>{mission.recipient.name}</p>
              <p className={`text-sm flex items-center gap-1 ${
                isDarkMode ? 'text-[#B0B0B0]' : 'text-gray-600'
              }`}>
                <Phone className="w-3 h-3" />
                {mission.recipient.contact}
              </p>
              <p className={`text-sm ${
                isDarkMode ? 'text-[#B0B0B0]' : 'text-gray-600'
              }`}>{mission.recipient.location}</p>
            </div>
          </div>

          {/* Telemetry */}
          <div>
            <h4 className={`font-semibold mb-2 flex items-center gap-2 ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}>
              <Plane className={`w-5 h-5 ${getDroneIconColor(status)}`} />
              Live Telemetry
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <div className={`p-3 rounded ${
                isDarkMode ? 'bg-[#2C2C2C]' : 'bg-slate-50'
              }`}>
                <div className="flex items-center gap-2 mb-1">
                  <Battery className="w-4 h-4 text-green-600" />
                  <span className={`text-sm font-medium ${
                    isDarkMode ? 'text-white' : 'text-slate-900'
                  }`}>Battery</span>
                </div>
                <Progress value={mission.telemetry.battery} className="mb-1" />
                <p className={`text-xs ${
                  isDarkMode ? 'text-[#B0B0B0]' : 'text-gray-600'
                }`}>{mission.telemetry.battery}%</p>
              </div>
              <div className={`p-3 rounded ${
                isDarkMode ? 'bg-[#2C2C2C]' : 'bg-slate-50'
              }`}>
                <p className={`text-sm font-medium ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}>Altitude</p>
                <p className="text-lg font-semibold text-blue-600">{mission.telemetry.altitude}</p>
              </div>
              <div className={`p-3 rounded ${
                isDarkMode ? 'bg-[#2C2C2C]' : 'bg-slate-50'
              }`}>
                <p className={`text-sm font-medium ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}>Speed</p>
                <p className="text-lg font-semibold text-green-600">{mission.telemetry.speed}</p>
              </div>
              <div className={`p-3 rounded ${
                isDarkMode ? 'bg-[#2C2C2C]' : 'bg-slate-50'
              }`}>
                <p className={`text-sm font-medium ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}>Signal</p>
                <p className={`text-lg font-semibold ${
                  mission.telemetry.connectivity === 'Strong' ? 'text-green-600' : 
                  mission.telemetry.connectivity === 'Weak' ? 'text-orange-600' : 'text-red-600'
                }`}>
                  {mission.telemetry.connectivity}
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-3 gap-2 pt-2">
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <RotateCcw className="w-3 h-3" />
              Recall
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Zap className="w-3 h-3" />
              Emergency Land
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Share className="w-3 h-3" />
              Share Track
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Live Map Modal
  if (showLiveMap) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg w-full max-w-md max-h-[80vh] overflow-hidden">
          <div className="bg-gradient-to-r from-slate-800 to-slate-700 p-4 text-white">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">{droneId} - Live Location</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowLiveMap(false)}
                className="text-white hover:bg-white/20 p-2"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          <div className="p-4">
            {/* Live Map */}
            <div className="relative h-64 bg-slate-100 rounded-lg overflow-hidden mb-4">
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1637118024908-9ab4c9ac9391?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcm9uZSUyMGFlcmlhbCUyMHZpZXclMjBkaXNhc3RlciUyMG1hbmFnZW1lbnR8ZW58MXx8fHwxNzU3NzcxOTI3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Live drone map view"
                className="w-full h-full object-cover"
              />
              {/* Drone marker */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  <div className="w-6 h-6 bg-red-600 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
                  <div className="absolute -top-1 -left-1 w-8 h-8 bg-red-600/30 rounded-full animate-ping"></div>
                </div>
              </div>
              {/* HQ marker */}
              <div className="absolute bottom-4 left-4">
                <div className="w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-lg"></div>
                <span className="absolute -bottom-6 -left-2 text-xs font-medium text-slate-700">HQ</span>
              </div>
              {/* Target marker */}
              <div className="absolute top-4 right-4">
                <div className="w-4 h-4 bg-green-600 rounded-full border-2 border-white shadow-lg"></div>
                <span className="absolute -bottom-6 -right-4 text-xs font-medium text-slate-700">Target</span>
              </div>
              {/* Live indicator */}
              <div className="absolute top-3 left-3 bg-red-600 text-white px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                LIVE
              </div>
            </div>

            {/* Location Details */}
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-50 p-3 rounded">
                  <p className="text-xs text-gray-500 mb-1">Current Position</p>
                  <p className="text-sm font-mono">{mission.liveLocation.coordinates}</p>
                </div>
                <div className="bg-slate-50 p-3 rounded">
                  <p className="text-xs text-gray-500 mb-1">Distance to Target</p>
                  <p className="text-sm font-semibold text-blue-600">{mission.liveLocation.distanceToDestination}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="bg-slate-50 p-3 rounded text-center">
                  <p className="text-xs text-gray-500 mb-1">Altitude</p>
                  <p className="font-semibold text-blue-600">{mission.telemetry.altitude}</p>
                </div>
                <div className="bg-slate-50 p-3 rounded text-center">
                  <p className="text-xs text-gray-500 mb-1">Speed</p>
                  <p className="font-semibold text-green-600">{mission.telemetry.speed}</p>
                </div>
                <div className="bg-slate-50 p-3 rounded text-center">
                  <p className="text-xs text-gray-500 mb-1">Battery</p>
                  <p className="font-semibold text-orange-600">{mission.telemetry.battery}%</p>
                </div>
              </div>

              <div className="bg-blue-50 p-3 rounded border-l-4 border-blue-500">
                <div className="flex items-center gap-2 mb-1">
                  <Radio className="w-4 h-4 text-blue-600" />
                  <span className="font-medium text-blue-800">Real-time Tracking Active</span>
                </div>
                <p className="text-sm text-blue-700">Last update: {mission.liveLocation.lastUpdate}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Card 
      className={`w-full mb-4 cursor-pointer transition-all hover:shadow-lg border-2 hover:scale-[1.02] ${
        isDarkMode 
          ? 'bg-[#1E1E1E] border-[#3A3A3A] hover:border-[#BB86FC] hover:shadow-[0_0_20px_rgba(187,134,252,0.3)] text-[#E0E0E0]' 
          : 'hover:border-blue-200 hover:shadow-xl'
      } bg-gradient-to-r ${statusGradients[status]}`}
      onClick={() => setExpanded(true)}
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 rounded-full flex items-center justify-center relative ${
              getDroneStatusBg(status, isDarkMode)
            }`}>
              <Plane className={`w-8 h-8 ${getDroneIconColor(status)} transition-colors duration-200`} />
              {/* Status indicator dot */}
              <div className={`absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center ${
                status === 'In Transit' || status === 'Delivering' 
                  ? 'bg-green-500' 
                  : status === 'Returning'
                    ? 'bg-yellow-500'
                    : 'bg-red-500'
              }`}>
                <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse"></div>
              </div>
            </div>
            <div>
              <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{droneId}</h3>
              <p className={`text-sm ${isDarkMode ? 'text-[#B0B0B0]' : 'text-gray-600'}`}>{mission.droneModel}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <Badge className={`${statusColors[status]} text-white mb-1 px-3 py-1`}>
                {status}
              </Badge>
              <p className={`text-xs ${isDarkMode ? 'text-[#B0B0B0]' : 'text-gray-500'}`}>Click for details</p>
            </div>
          </div>
        </div>

        {/* Live Location Dropdown */}
        <div className={`rounded-lg border ${
          isDarkMode ? 'bg-[#2C2C2C] border-[#3A3A3A]' : 'bg-slate-50'
        }`}>
          <div 
            className={`flex items-center justify-between p-3 cursor-pointer transition-colors ${
              isDarkMode ? 'hover:bg-[#3A3A3A]' : 'hover:bg-slate-100'
            }`}
            onClick={(e) => {
              e.stopPropagation();
              setDropdownOpen(!dropdownOpen);
            }}
          >
            <div className="flex items-center gap-2">
              <Navigation className="w-4 h-4 text-blue-600" />
              <span className={`text-sm font-medium ${
                isDarkMode ? 'text-[#E0E0E0]' : 'text-slate-700'
              }`}>Live Location</span>
              <div className="flex items-center gap-1">
                <Radio className="w-3 h-3 text-green-500" />
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  mission.liveLocation.lastUpdate === 'Live' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-blue-100 text-blue-700'
                }`}>
                  {mission.liveLocation.lastUpdate}
                </span>
              </div>
            </div>
            {dropdownOpen ? (
              <ChevronUp className="w-4 h-4 text-gray-500" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-500" />
            )}
          </div>
          
          {dropdownOpen && (
            <div className="px-3 pb-3 border-t border-slate-200">
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Coordinates</p>
                  <p className="text-sm font-mono text-slate-700">{mission.liveLocation.coordinates}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Distance to Target</p>
                  <p className="text-sm font-semibold text-blue-600">{mission.liveLocation.distanceToDestination}</p>
                </div>
              </div>

              {/* Mini progress indicator */}
              <div className="mb-3">
                <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                  <span>HQ</span>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-red-500 animate-pulse" />
                    <span>Live</span>
                  </div>
                  <span>Target</span>
                </div>
                <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`absolute left-0 top-0 h-full ${
                      status === 'In Transit' ? 'bg-blue-500 w-1/3' :
                      status === 'Delivering' ? 'bg-orange-500 w-5/6' :
                      status === 'Returning' ? 'bg-green-500 w-2/3' :
                      'bg-gray-400 w-0'
                    } transition-all duration-1000`}
                  ></div>
                  <div 
                    className={`absolute top-0 h-full w-1 ${
                      status === 'In Transit' ? 'left-1/3 bg-blue-700' :
                      status === 'Delivering' ? 'left-5/6 bg-orange-700' :
                      status === 'Returning' ? 'left-2/3 bg-green-700' :
                      'left-0 bg-gray-600'
                    } animate-pulse`}
                  ></div>
                </div>
              </div>

              {/* Live Location Button */}
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowLiveMap(true);
                }}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
                size="sm"
              >
                <MapPin className="w-4 h-4" />
                View Live Location on Map
              </Button>
            </div>
          )}
        </div>

        {/* Quick telemetry */}
        <div className="flex items-center justify-between mt-4 text-sm">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Battery className="w-4 h-4 text-green-600" />
              <span className={`font-medium ${isDarkMode ? 'text-[#E0E0E0]' : 'text-gray-700'}`}>{mission.telemetry.battery}%</span>
            </div>
            <div className="flex items-center gap-2">
              <span className={`font-medium ${isDarkMode ? 'text-[#E0E0E0]' : 'text-gray-700'}`}>{mission.telemetry.speed}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${
                mission.telemetry.connectivity === 'Strong' ? 'bg-green-500' :
                mission.telemetry.connectivity === 'Weak' ? 'bg-orange-500' :
                'bg-red-500'
              }`}></div>
              <span className={`text-xs ${isDarkMode ? 'text-[#B0B0B0]' : 'text-gray-500'}`}>{mission.telemetry.connectivity}</span>
            </div>
          </div>
          <span className={`font-medium ${isDarkMode ? 'text-[#E0E0E0]' : 'text-gray-700'}`}>{mission.telemetry.altitude}</span>
        </div>
      </CardContent>
    </Card>
  );
}