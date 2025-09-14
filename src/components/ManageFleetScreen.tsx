import { useState } from 'react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { 
  ArrowLeft, 
  Plus, 
  Trash2, 
  Settings, 
  Battery, 
  Package, 
  Clock, 
  User, 
  Rocket, 
  RotateCcw, 
  Square, 
  Download,
  AlertCircle,
  CheckCircle,
  Activity,
  Calendar,
  ChevronDown,
  ChevronUp,
  Wrench
} from 'lucide-react';

interface ManageFleetScreenProps {
  onBack: () => void;
  isDarkMode?: boolean;
}

interface Drone {
  id: string;
  model: string;
  serialNumber: string;
  status: 'Available' | 'In-Mission' | 'Maintenance' | 'Offline';
  battery: number;
  payload: number;
  lastSync: string;
  operator?: string;
  firmwareVersion: string;
  maintenanceLogs: MaintenanceLog[];
}

interface MaintenanceLog {
  id: string;
  date: string;
  type: string;
  issueReported: string;
  actionTaken: string;
  technician: string;
  nextScheduled: string;
  statusAfter: 'Ready' | 'Under Repair';
}

const mockDrones: Drone[] = [
  {
    id: 'DRONE-001',
    model: 'MQ-9 Guardian',
    serialNumber: 'MQ9-2024-001',
    status: 'Available',
    battery: 92,
    payload: 85,
    lastSync: '2 min ago',
    operator: 'Sarah Williams',
    firmwareVersion: 'v2.4.1',
    maintenanceLogs: [
      {
        id: 'LOG-001',
        date: '2024-01-15',
        type: 'Routine Check',
        issueReported: 'Scheduled maintenance',
        actionTaken: 'Full system inspection, battery calibration',
        technician: 'Mike Johnson',
        nextScheduled: '2024-02-15',
        statusAfter: 'Ready'
      },
      {
        id: 'LOG-002',
        date: '2024-01-10',
        type: 'Repair',
        issueReported: 'Camera gimbal malfunction',
        actionTaken: 'Replaced gimbal motor assembly',
        technician: 'Lisa Chen',
        nextScheduled: '2024-02-15',
        statusAfter: 'Ready'
      }
    ]
  },
  {
    id: 'DRONE-002',
    model: 'DJI Matrice 300',
    serialNumber: 'DJI-2024-002',
    status: 'In-Mission',
    battery: 78,
    payload: 70,
    lastSync: 'Live',
    operator: 'Jake Morrison',
    firmwareVersion: 'v1.9.3',
    maintenanceLogs: [
      {
        id: 'LOG-003',
        date: '2024-01-12',
        type: 'Firmware Update',
        issueReported: 'Outdated firmware',
        actionTaken: 'Updated to v1.9.3',
        technician: 'Alex Rodriguez',
        nextScheduled: '2024-02-10',
        statusAfter: 'Ready'
      }
    ]
  },
  {
    id: 'DRONE-003',
    model: 'Autel EVO II Pro',
    serialNumber: 'AUT-2024-003',
    status: 'Maintenance',
    battery: 0,
    payload: 0,
    lastSync: '2 hours ago',
    firmwareVersion: 'v3.1.2',
    maintenanceLogs: [
      {
        id: 'LOG-004',
        date: '2024-01-16',
        type: 'Emergency Repair',
        issueReported: 'Hard landing damage',
        actionTaken: 'Propeller replacement, frame inspection',
        technician: 'Mike Johnson',
        nextScheduled: '2024-01-18',
        statusAfter: 'Under Repair'
      }
    ]
  },
  {
    id: 'DRONE-004',
    model: 'DJI Air 2S',
    serialNumber: 'DJI-2024-004',
    status: 'Offline',
    battery: 45,
    payload: 0,
    lastSync: '1 day ago',
    firmwareVersion: 'v2.1.0',
    maintenanceLogs: []
  }
];

export function ManageFleetScreen({ onBack, isDarkMode = false }: ManageFleetScreenProps) {
  const [drones, setDrones] = useState<Drone[]>(mockDrones);
  const [expandedMaintenance, setExpandedMaintenance] = useState<string[]>([]);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isAddMaintenanceOpen, setIsAddMaintenanceOpen] = useState(false);
  const [selectedDroneForMaintenance, setSelectedDroneForMaintenance] = useState<string>('');
  const [newDrone, setNewDrone] = useState({
    id: '',
    model: '',
    serialNumber: '',
    firmwareVersion: ''
  });
  const [newMaintenance, setNewMaintenance] = useState({
    type: '',
    issueReported: '',
    actionTaken: '',
    technician: '',
    nextScheduled: '',
    statusAfter: 'Ready' as const
  });

  const getStatusColor = (status: string) => {
    if (isDarkMode) {
      switch (status) {
        case 'Available': return 'bg-[#03DAC6] text-black';
        case 'In-Mission': return 'bg-[#BB86FC] text-black';
        case 'Maintenance': return 'bg-[#FFB74D] text-black';
        case 'Offline': return 'bg-[#CF6679] text-white';
        default: return 'bg-[#6b7280] text-white';
      }
    } else {
      switch (status) {
        case 'Available': return 'bg-green-500 text-white';
        case 'In-Mission': return 'bg-blue-500 text-white';
        case 'Maintenance': return 'bg-yellow-500 text-white';
        case 'Offline': return 'bg-red-500 text-white';
        default: return 'bg-gray-500 text-white';
      }
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Available': return <CheckCircle className="w-4 h-4" />;
      case 'In-Mission': return <Rocket className="w-4 h-4" />;
      case 'Maintenance': return <Wrench className="w-4 h-4" />;
      case 'Offline': return <AlertCircle className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  const toggleMaintenanceExpansion = (droneId: string) => {
    setExpandedMaintenance(prev => 
      prev.includes(droneId) 
        ? prev.filter(id => id !== droneId)
        : [...prev, droneId]
    );
  };

  const handleRegisterDrone = () => {
    if (!newDrone.id || !newDrone.model || !newDrone.serialNumber) return;
    
    const drone: Drone = {
      ...newDrone,
      status: 'Available',
      battery: 100,
      payload: 100,
      lastSync: 'Just now',
      maintenanceLogs: []
    };
    
    setDrones(prev => [...prev, drone]);
    setNewDrone({ id: '', model: '', serialNumber: '', firmwareVersion: '' });
    setIsRegisterOpen(false);
  };

  const handleDeleteDrone = (droneId: string) => {
    setDrones(prev => prev.filter(drone => drone.id !== droneId));
  };

  const handleAddMaintenance = () => {
    if (!selectedDroneForMaintenance || !newMaintenance.type || !newMaintenance.technician) return;

    const maintenanceLog: MaintenanceLog = {
      id: `LOG-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      ...newMaintenance
    };

    setDrones(prev => prev.map(drone => 
      drone.id === selectedDroneForMaintenance 
        ? { ...drone, maintenanceLogs: [...drone.maintenanceLogs, maintenanceLog] }
        : drone
    ));

    setNewMaintenance({
      type: '',
      issueReported: '',
      actionTaken: '',
      technician: '',
      nextScheduled: '',
      statusAfter: 'Ready'
    });
    setIsAddMaintenanceOpen(false);
    setSelectedDroneForMaintenance('');
  };

  const fleetStats = {
    total: drones.length,
    available: drones.filter(d => d.status === 'Available').length,
    deployed: drones.filter(d => d.status === 'In-Mission').length,
    maintenance: drones.filter(d => d.status === 'Maintenance').length,
    offline: drones.filter(d => d.status === 'Offline').length
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'bg-[#121212]' : 'bg-gray-50'
    }`}>
      {/* Top Bar */}
      <div className={`shadow-sm border-b px-4 py-4 ${
        isDarkMode 
          ? 'bg-[#1E1E1E] border-[#3A3A3A]' 
          : 'bg-white border-gray-200'
      }`}>
        <div className="flex items-center justify-between">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onBack} 
            className={`p-2 ${
              isDarkMode 
                ? 'text-[#E0E0E0] hover:bg-[#2C2C2C]' 
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          
          <h1 className={`text-lg font-semibold ${
            isDarkMode ? 'text-white' : 'text-slate-800'
          }`}>Manage Fleet</h1>
          
          <div className="w-10"></div> {/* Spacer for alignment */}
        </div>
      </div>

      {/* Fleet Controls */}
      <div className="p-4 space-y-4">
        <div className="flex justify-center">
          <Dialog open={isRegisterOpen} onOpenChange={setIsRegisterOpen}>
            <DialogTrigger asChild>
              <Button className={`flex items-center gap-2 px-6 py-3 rounded-xl ${
                isDarkMode 
                  ? 'bg-[#03DAC6] hover:bg-[#03DAC6]/90 text-black' 
                  : 'bg-green-500 hover:bg-green-600 text-white'
              }`}>
                <Plus className="w-4 h-4" />
                <span>Register New Drone</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Register New Drone</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Drone ID</label>
                  <Input
                    value={newDrone.id}
                    onChange={(e) => setNewDrone(prev => ({ ...prev, id: e.target.value }))}
                    placeholder="DRONE-005"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Model</label>
                  <Input
                    value={newDrone.model}
                    onChange={(e) => setNewDrone(prev => ({ ...prev, model: e.target.value }))}
                    placeholder="DJI Matrice 300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Serial Number</label>
                  <Input
                    value={newDrone.serialNumber}
                    onChange={(e) => setNewDrone(prev => ({ ...prev, serialNumber: e.target.value }))}
                    placeholder="DJI-2024-005"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Firmware Version</label>
                  <Input
                    value={newDrone.firmwareVersion}
                    onChange={(e) => setNewDrone(prev => ({ ...prev, firmwareVersion: e.target.value }))}
                    placeholder="v1.0.0"
                  />
                </div>
                <Button onClick={handleRegisterDrone} className="w-full bg-green-500 hover:bg-green-600">
                  Register Drone
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Add Maintenance Dialog */}
        <Dialog open={isAddMaintenanceOpen} onOpenChange={setIsAddMaintenanceOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add Maintenance Record</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Select Drone</label>
                <Select value={selectedDroneForMaintenance} onValueChange={setSelectedDroneForMaintenance}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose drone" />
                  </SelectTrigger>
                  <SelectContent>
                    {drones.map(drone => (
                      <SelectItem key={drone.id} value={drone.id}>
                        {drone.id} - {drone.model}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Maintenance Type</label>
                <Select value={newMaintenance.type} onValueChange={(value) => setNewMaintenance(prev => ({ ...prev, type: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Routine Check">Routine Check</SelectItem>
                    <SelectItem value="Repair">Repair</SelectItem>
                    <SelectItem value="Firmware Update">Firmware Update</SelectItem>
                    <SelectItem value="Emergency Repair">Emergency Repair</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Issue Reported</label>
                <Textarea
                  value={newMaintenance.issueReported}
                  onChange={(e) => setNewMaintenance(prev => ({ ...prev, issueReported: e.target.value }))}
                  placeholder="Describe the issue..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Action Taken</label>
                <Textarea
                  value={newMaintenance.actionTaken}
                  onChange={(e) => setNewMaintenance(prev => ({ ...prev, actionTaken: e.target.value }))}
                  placeholder="Describe actions taken..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Technician</label>
                <Input
                  value={newMaintenance.technician}
                  onChange={(e) => setNewMaintenance(prev => ({ ...prev, technician: e.target.value }))}
                  placeholder="Technician name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Next Scheduled</label>
                <Input
                  type="date"
                  value={newMaintenance.nextScheduled}
                  onChange={(e) => setNewMaintenance(prev => ({ ...prev, nextScheduled: e.target.value }))}
                />
              </div>
              <Button onClick={handleAddMaintenance} className="w-full bg-blue-500 hover:bg-blue-600">
                Add Maintenance Record
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Fleet Analytics */}
        <Card className={`shadow-lg border-0 ${
          isDarkMode ? 'bg-[#1E1E1E]' : 'bg-white'
        }`}>
          <CardHeader className="pb-3">
            <h3 className={`font-semibold ${
              isDarkMode ? 'text-white' : 'text-slate-800'
            }`}>Fleet Overview</h3>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className={`p-3 rounded-lg ${
                isDarkMode ? 'bg-[#BB86FC]/20' : 'bg-blue-50'
              }`}>
                <div className="flex items-center gap-2 mb-1">
                  <Activity className={`w-4 h-4 ${
                    isDarkMode ? 'text-[#BB86FC]' : 'text-blue-600'
                  }`} />
                  <span className={`text-sm font-medium ${
                    isDarkMode ? 'text-[#E0E0E0]' : 'text-blue-800'
                  }`}>Total Fleet</span>
                </div>
                <p className={`text-2xl font-semibold ${
                  isDarkMode ? 'text-white' : 'text-blue-900'
                }`}>{fleetStats.total}</p>
              </div>
              <div className={`p-3 rounded-lg ${
                isDarkMode ? 'bg-[#03DAC6]/20' : 'bg-green-50'
              }`}>
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle className={`w-4 h-4 ${
                    isDarkMode ? 'text-[#03DAC6]' : 'text-green-600'
                  }`} />
                  <span className={`text-sm font-medium ${
                    isDarkMode ? 'text-[#E0E0E0]' : 'text-green-800'
                  }`}>Available</span>
                </div>
                <p className={`text-2xl font-semibold ${
                  isDarkMode ? 'text-white' : 'text-green-900'
                }`}>{fleetStats.available}</p>
              </div>
              <div className={`p-3 rounded-lg ${
                isDarkMode ? 'bg-[#BB86FC]/20' : 'bg-purple-50'
              }`}>
                <div className="flex items-center gap-2 mb-1">
                  <Rocket className={`w-4 h-4 ${
                    isDarkMode ? 'text-[#BB86FC]' : 'text-purple-600'
                  }`} />
                  <span className={`text-sm font-medium ${
                    isDarkMode ? 'text-[#E0E0E0]' : 'text-purple-800'
                  }`}>Deployed</span>
                </div>
                <p className={`text-2xl font-semibold ${
                  isDarkMode ? 'text-white' : 'text-purple-900'
                }`}>{fleetStats.deployed}</p>
              </div>
              <div className={`p-3 rounded-lg ${
                isDarkMode ? 'bg-[#FFB74D]/20' : 'bg-yellow-50'
              }`}>
                <div className="flex items-center gap-2 mb-1">
                  <Wrench className={`w-4 h-4 ${
                    isDarkMode ? 'text-[#FFB74D]' : 'text-yellow-600'
                  }`} />
                  <span className={`text-sm font-medium ${
                    isDarkMode ? 'text-[#E0E0E0]' : 'text-yellow-800'
                  }`}>Maintenance</span>
                </div>
                <p className={`text-2xl font-semibold ${
                  isDarkMode ? 'text-white' : 'text-yellow-900'
                }`}>{fleetStats.maintenance}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Drone List */}
        <div className="space-y-4">
          {drones.map((drone) => (
            <Card key={drone.id} className={`shadow-lg border-0 ${
              isDarkMode ? 'bg-[#1E1E1E]' : 'bg-white'
            }`}>
              <CardContent className="p-4">
                {/* Drone Header */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className={`font-semibold ${
                        isDarkMode ? 'text-white' : 'text-slate-800'
                      }`}>{drone.id}</h3>
                      <Badge className={`${getStatusColor(drone.status)} flex items-center gap-1`}>
                        {getStatusIcon(drone.status)}
                        {drone.status}
                      </Badge>
                    </div>
                    <p className={`text-sm ${
                      isDarkMode ? 'text-[#E0E0E0]' : 'text-slate-600'
                    }`}>{drone.model}</p>
                    <p className={`text-xs ${
                      isDarkMode ? 'text-[#B0B0B0]' : 'text-slate-500'
                    }`}>S/N: {drone.serialNumber}</p>
                  </div>
                </div>

                {/* Drone Information Dropdown */}
                <div className="space-y-3">
                  <Collapsible>
                    <CollapsibleTrigger className="flex items-center justify-between w-full p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                      <div className="flex items-center gap-2">
                        <Activity className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-medium text-blue-800">Drone Information</span>
                      </div>
                      <ChevronDown className="w-4 h-4 text-blue-600" />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-3">
                      <div className="p-4 bg-white border rounded-lg space-y-4">
                        {/* Telemetry Data */}
                        <div className="grid grid-cols-3 gap-4">
                          <div className="flex items-center gap-2">
                            <Battery className={`w-4 h-4 ${drone.battery > 50 ? 'text-green-500' : drone.battery > 20 ? 'text-yellow-500' : 'text-red-500'}`} />
                            <div>
                              <p className="text-xs text-slate-500">Battery</p>
                              <p className="text-sm font-medium">{drone.battery}%</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Package className="w-4 h-4 text-blue-500" />
                            <div>
                              <p className="text-xs text-slate-500">Payload</p>
                              <p className="text-sm font-medium">{drone.payload}%</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-purple-500" />
                            <div>
                              <p className="text-xs text-slate-500">Last Sync</p>
                              <p className="text-sm font-medium">{drone.lastSync}</p>
                            </div>
                          </div>
                        </div>

                        {/* Additional Info */}
                        <div className="grid grid-cols-2 gap-4 pt-3 border-t">
                          <div>
                            <p className="text-xs text-slate-500">Firmware Version</p>
                            <p className="text-sm font-medium">{drone.firmwareVersion}</p>
                          </div>
                          {drone.operator && (
                            <div>
                              <p className="text-xs text-slate-500">Assigned Operator</p>
                              <p className="text-sm font-medium">{drone.operator}</p>
                            </div>
                          )}
                        </div>

                        {/* Quick Actions */}
                        <div className="pt-3 border-t">
                          <h5 className="text-sm font-medium text-slate-700 mb-3">Quick Actions</h5>
                          <div className="grid grid-cols-2 gap-3">
                            <Button size="sm" className="bg-green-500 hover:bg-green-600 text-white h-10 flex items-center justify-center gap-2">
                              <Rocket className="w-4 h-4" />
                              <span className="text-sm">Start Mission</span>
                            </Button>
                            <Button size="sm" variant="outline" className="border-blue-300 text-blue-600 hover:bg-blue-50 h-10 flex items-center justify-center gap-2">
                              <RotateCcw className="w-4 h-4" />
                              <span className="text-sm">Recall</span>
                            </Button>
                            <Button size="sm" variant="outline" className="border-red-300 text-red-600 hover:bg-red-50 h-10 flex items-center justify-center gap-2">
                              <Square className="w-4 h-4" />
                              <span className="text-sm">Emergency Land</span>
                            </Button>
                            <Button size="sm" variant="outline" className="border-purple-300 text-purple-600 hover:bg-purple-50 h-10 flex items-center justify-center gap-2">
                              <Download className="w-4 h-4" />
                              <span className="text-sm">Firmware Update</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>

                  {/* Maintenance Logs Dropdown */}
                  <Collapsible>
                    <CollapsibleTrigger className="flex items-center justify-between w-full p-3 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors">
                      <div className="flex items-center gap-2">
                        <Wrench className="w-4 h-4 text-yellow-600" />
                        <span className="text-sm font-medium text-yellow-800">Maintenance Logs ({drone.maintenanceLogs.length})</span>
                      </div>
                      <ChevronDown className="w-4 h-4 text-yellow-600" />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-3">
                      <div className="p-4 bg-white border rounded-lg">
                        {drone.maintenanceLogs.length === 0 ? (
                          <p className="text-sm text-slate-500 italic">No maintenance records found</p>
                        ) : (
                          <div className="space-y-3">
                            {drone.maintenanceLogs.map((log) => (
                              <div key={log.id} className="p-3 bg-slate-50 rounded-lg border-l-4 border-yellow-500">
                                <div className="flex items-center justify-between mb-2">
                                  <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-slate-500" />
                                    <span className="text-sm font-medium">{log.date}</span>
                                    <Badge variant="outline" className="text-xs">{log.type}</Badge>
                                  </div>
                                  <Badge className={log.statusAfter === 'Ready' ? 'bg-green-500' : 'bg-yellow-500'}>
                                    {log.statusAfter}
                                  </Badge>
                                </div>
                                <div className="space-y-1 text-sm">
                                  <p><span className="font-medium">Issue:</span> {log.issueReported}</p>
                                  <p><span className="font-medium">Action:</span> {log.actionTaken}</p>
                                  <p><span className="font-medium">Technician:</span> {log.technician}</p>
                                  <p><span className="font-medium">Next Service:</span> {log.nextScheduled}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                        <div className="mt-4">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => {
                              setSelectedDroneForMaintenance(drone.id);
                              setIsAddMaintenanceOpen(true);
                            }}
                            className="border-yellow-300 text-yellow-600 hover:bg-yellow-50"
                          >
                            <Plus className="w-3 h-3 mr-2" />
                            Add Maintenance Record
                          </Button>
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>

                  {/* Delete Drone Dropdown */}
                  <Collapsible>
                    <CollapsibleTrigger className="flex items-center justify-between w-full p-3 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-red-600" />
                        <span className="text-sm font-medium text-red-800">Danger Zone</span>
                      </div>
                      <ChevronDown className="w-4 h-4 text-red-600" />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-3">
                      <div className="p-4 bg-white border border-red-200 rounded-lg">
                        <div className="mb-4">
                          <h4 className="text-sm font-medium text-slate-800 mb-2">Delete Drone</h4>
                          <p className="text-xs text-slate-600 mb-3">
                            This action will permanently remove {drone.id} from your fleet and delete all associated maintenance records. This cannot be undone.
                          </p>
                        </div>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button size="sm" className="bg-red-500 hover:bg-red-600 text-white">
                              <Trash2 className="w-3 h-3 mr-2" />
                              Delete {drone.id}
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Drone</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete {drone.id}? This action cannot be undone and will remove all associated maintenance records.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDeleteDrone(drone.id)} className="bg-red-500 hover:bg-red-600">
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}