import { useState } from 'react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Progress } from './ui/progress';
import { Slider } from './ui/slider';
import { 
  ArrowLeft, 
  Shield, 
  Users, 
  Key, 
  Download,
  CheckCircle,
  AlertCircle,
  Clock,
  User
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface SecurityDataScreenProps {
  onBack: () => void;
  isDarkMode?: boolean;
}

interface Role {
  id: string;
  name: string;
  description: string;
  icon: string;
}

interface Permission {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
}

interface SecurityLog {
  id: string;
  action: string;
  user: string;
  timestamp: string;
  type: 'role' | 'permission' | 'export';
}

const roles: Role[] = [
  { id: 'admin', name: 'Admin', description: 'Full Access - Complete system control', icon: '👑' },
  { id: 'manager', name: 'Manager', description: 'Management Access - Team oversight', icon: '👤' },
  { id: 'operator', name: 'Operator', description: 'Operational Access - Field operations', icon: '🚁' },
  { id: 'viewer', name: 'Viewer', description: 'Read-Only Access - View permissions only', icon: '👁️' }
];

const initialPermissions: Permission[] = [
  { id: 'view', name: 'View Only', description: 'Read access to dashboards and reports', enabled: true },
  { id: 'edit_deliveries', name: 'Edit Deliveries', description: 'Modify delivery schedules and routes', enabled: false },
  { id: 'manage_drones', name: 'Manage Drones', description: 'Control drone fleet and operations', enabled: false },
  { id: 'export_data', name: 'Export Data', description: 'Download reports and analytics', enabled: true },
  { id: 'full_access', name: 'Full Access', description: 'Complete system administration', enabled: false }
];

const exportFormats = [
  { id: 'pdf', name: 'PDF', description: 'Portable Document Format', icon: '📄' },
  { id: 'excel', name: 'Excel', description: 'Microsoft Excel Spreadsheet', icon: '📊' },
  { id: 'csv', name: 'CSV', description: 'Comma Separated Values', icon: '📋' },
  { id: 'json', name: 'JSON', description: 'JavaScript Object Notation', icon: '📦' }
];

const mockSecurityLogs: SecurityLog[] = [
  {
    id: '1',
    action: 'Operator role assigned to Sarah Williams',
    user: 'Admin User',
    timestamp: '12 Sep 2025, 2:30 PM',
    type: 'role'
  },
  {
    id: '2',
    action: 'Export permissions granted to Jake Morrison',
    user: 'Manager',
    timestamp: '12 Sep 2025, 1:15 PM',
    type: 'permission'
  },
  {
    id: '3',
    action: 'Fleet data exported as PDF',
    user: 'Sarah Williams',
    timestamp: '12 Sep 2025, 11:45 AM',
    type: 'export'
  },
  {
    id: '4',
    action: 'Manager role updated for Alex Rodriguez',
    user: 'Admin User',
    timestamp: '11 Sep 2025, 4:20 PM',
    type: 'role'
  }
];

export function SecurityDataScreen({ onBack, isDarkMode = false }: SecurityDataScreenProps) {
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [permissions, setPermissions] = useState<Permission[]>(initialPermissions);
  const [selectedExportFormat, setSelectedExportFormat] = useState<string>('');
  const [exportProgress, setExportProgress] = useState<number>(0);
  const [isExporting, setIsExporting] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [showRoleConfirmation, setShowRoleConfirmation] = useState(false);
  const [showExportConfirmation, setShowExportConfirmation] = useState(false);
  const [logFilter, setLogFilter] = useState<number[]>([7]); // Default showing last 7 days

  const handleRoleChange = (roleId: string) => {
    setSelectedRole(roleId);
    setShowRoleConfirmation(true);
    setHasChanges(true);
    setTimeout(() => setShowRoleConfirmation(false), 3000);
  };

  const handlePermissionToggle = (permissionId: string) => {
    setPermissions(prev => 
      prev.map(perm => 
        perm.id === permissionId 
          ? { ...perm, enabled: !perm.enabled }
          : perm
      )
    );
    setHasChanges(true);
  };

  const handleExport = async (formatId: string) => {
    setSelectedExportFormat(formatId);
    setIsExporting(true);
    setExportProgress(0);

    // Simulate export progress
    const interval = setInterval(() => {
      setExportProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsExporting(false);
          setShowExportConfirmation(true);
          setTimeout(() => setShowExportConfirmation(false), 3000);
          toast.success(`Data exported successfully as ${formatId.toUpperCase()}`);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleSaveChanges = () => {
    setHasChanges(false);
    toast.success('Security settings saved successfully');
  };

  const getLogIcon = (type: string) => {
    switch (type) {
      case 'role': return <Users className="w-4 h-4 text-blue-500" />;
      case 'permission': return <Key className="w-4 h-4 text-purple-500" />;
      case 'export': return <Download className="w-4 h-4 text-green-500" />;
      default: return <AlertCircle className="w-4 h-4 text-gray-500" />;
    }
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
          
          <div className="flex items-center gap-2">
            <Shield className={`w-6 h-6 ${
              isDarkMode ? 'text-[#BB86FC]' : 'text-blue-600'
            }`} />
            <h1 className={`text-lg font-semibold ${
              isDarkMode ? 'text-white' : 'text-slate-800'
            }`}>Security & Data Management</h1>
          </div>
          
          <div></div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Subtitle */}
        <div className="text-center">
          <p className={isDarkMode ? 'text-[#B0B0B0]' : 'text-slate-600'}>Control user roles, permissions, and securely export data</p>
        </div>

        {/* Roles Management */}
        <Card className={`shadow-lg border-0 ${
          isDarkMode 
            ? 'bg-gradient-to-br from-[#1E1E1E] to-[#232323]' 
            : 'bg-gradient-to-br from-blue-50 to-indigo-50'
        }`}>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${
                isDarkMode ? 'bg-[#BB86FC]/20' : 'bg-blue-100'
              }`}>
                <Users className={`w-5 h-5 ${
                  isDarkMode ? 'text-[#BB86FC]' : 'text-blue-600'
                }`} />
              </div>
              <div>
                <h3 className={`font-semibold ${
                  isDarkMode ? 'text-white' : 'text-slate-800'
                }`}>Assign Role</h3>
                <p className={`text-sm ${
                  isDarkMode ? 'text-[#B0B0B0]' : 'text-slate-600'
                }`}>Manage user access levels</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select value={selectedRole} onValueChange={handleRoleChange}>
              <SelectTrigger className={`${
                isDarkMode 
                  ? 'bg-[#2C2C2C] border-[#3A3A3A] text-[#E0E0E0] focus:border-[#BB86FC]' 
                  : 'bg-white border-blue-200 focus:border-blue-400'
              }`}>
                <SelectValue placeholder="Select a role to assign" />
              </SelectTrigger>
              <SelectContent className={isDarkMode ? 'bg-[#1E1E1E] border-[#3A3A3A]' : ''}>
                {roles.map((role) => (
                  <SelectItem key={role.id} value={role.id}>
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{role.icon}</span>
                      <div>
                        <div className={`font-medium ${
                          isDarkMode ? 'text-[#E0E0E0]' : 'text-slate-800'
                        }`}>{role.name}</div>
                        <div className={`text-sm ${
                          isDarkMode ? 'text-[#B0B0B0]' : 'text-slate-500'
                        }`}>{role.description}</div>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {showRoleConfirmation && (
              <div className={`p-3 rounded-lg flex items-center gap-2 ${
                isDarkMode 
                  ? 'bg-[#03DAC6]/20 border border-[#03DAC6]/30' 
                  : 'bg-green-100 border border-green-200'
              }`}>
                <CheckCircle className={`w-4 h-4 ${
                  isDarkMode ? 'text-[#03DAC6]' : 'text-green-600'
                }`} />
                <span className={`text-sm ${
                  isDarkMode ? 'text-[#03DAC6]' : 'text-green-800'
                }`}>Role updated successfully</span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Permissions Management */}
        <Card className={`shadow-lg border-0 ${
          isDarkMode 
            ? 'bg-[#1E1E1E] border-[#2C2C2C]' 
            : 'bg-gradient-to-br from-purple-50 to-violet-50'
        }`}>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${
                isDarkMode ? 'bg-[#BB86FC]/20' : 'bg-purple-100'
              }`}>
                <Key className={`w-5 h-5 ${
                  isDarkMode ? 'text-[#BB86FC]' : 'text-purple-600'
                }`} />
              </div>
              <div>
                <h3 className={`font-semibold ${
                  isDarkMode ? 'text-white' : 'text-slate-800'
                }`}>Set Permissions</h3>
                <p className={`text-sm ${
                  isDarkMode ? 'text-[#B0B0B0]' : 'text-slate-600'
                }`}>Configure access controls</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {permissions.map((permission) => (
              <div key={permission.id} className={`flex items-center justify-between p-3 rounded-lg border ${
                isDarkMode 
                  ? 'bg-[#2C2C2C] border-[#3A3A3A]' 
                  : 'bg-white border-purple-100'
              }`}>
                <div className="flex items-center gap-3">
                  <Checkbox 
                    checked={permission.enabled}
                    onCheckedChange={() => handlePermissionToggle(permission.id)}
                    className={isDarkMode ? 'border-[#BB86FC]' : 'border-purple-300'}
                  />
                  <div>
                    <div className={`font-medium ${
                      isDarkMode ? 'text-white' : 'text-slate-800'
                    }`}>{permission.name}</div>
                    <div className={`text-sm ${
                      isDarkMode ? 'text-[#B0B0B0]' : 'text-slate-500'
                    }`}>{permission.description}</div>
                  </div>
                </div>
                {permission.enabled && (
                  <Badge className={`${
                    isDarkMode ? 'bg-[#BB86FC] text-black' : 'bg-purple-500 text-white'
                  }`}>
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Active
                  </Badge>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Data Export */}
        <Card className={`shadow-lg border-0 ${
          isDarkMode 
            ? 'bg-[#1E1E1E] border-[#2C2C2C]' 
            : 'bg-gradient-to-br from-teal-50 to-cyan-50'
        }`}>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${
                isDarkMode ? 'bg-[#232323]' : 'bg-teal-100'
              }`}>
                <Download className={`w-5 h-5 ${
                  isDarkMode ? 'text-[#03DAC6]' : 'text-teal-600'
                }`} />
              </div>
              <div>
                <h3 className={`font-semibold ${
                  isDarkMode ? 'text-white' : 'text-slate-800'
                }`}>Export Data</h3>
                <p className={`text-sm ${
                  isDarkMode ? 'text-[#B0B0B0]' : 'text-slate-600'
                }`}>Download reports and analytics</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {exportFormats.map((format) => (
                <Button
                  key={format.id}
                  variant="outline"
                  onClick={() => handleExport(format.id)}
                  disabled={isExporting}
                  className={`h-auto p-4 transition-all duration-200 ${
                    isDarkMode 
                      ? 'bg-[#2A2A2A] border-[#383838] hover:bg-[#3A3A3A] hover:border-[#BB86FC]/30 hover:shadow-[0_0_10px_rgba(187,134,252,0.3)]' 
                      : 'border-teal-200 hover:bg-teal-50 hover:border-teal-300'
                  }`}
                >
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-2xl">{format.icon}</span>
                    <div className="text-center">
                      <div className={`font-medium ${
                        isDarkMode ? 'text-white' : 'text-slate-800'
                      }`}>{format.name}</div>
                      <div className={`text-xs ${
                        isDarkMode ? 'text-[#B0B0B0]' : 'text-slate-500'
                      }`}>{format.description}</div>
                    </div>
                  </div>
                </Button>
              ))}
            </div>

            {isExporting && (
              <div className="space-y-2">
                <div className={`flex items-center justify-between text-sm ${
                  isDarkMode ? 'text-[#E0E0E0]' : 'text-slate-800'
                }`}>
                  <span>Exporting data...</span>
                  <span>{exportProgress}%</span>
                </div>
                <Progress value={exportProgress} className="h-2" />
              </div>
            )}

            {showExportConfirmation && (
              <div className={`p-3 rounded-lg flex items-center gap-2 ${
                isDarkMode 
                  ? 'bg-[#03DAC6]/20 border border-[#03DAC6]/30' 
                  : 'bg-green-100 border border-green-200'
              }`}>
                <CheckCircle className={`w-4 h-4 ${
                  isDarkMode ? 'text-[#03DAC6]' : 'text-green-600'
                }`} />
                <span className={`text-sm ${
                  isDarkMode ? 'text-[#03DAC6]' : 'text-green-800'
                }`}>
                  Data exported successfully as {selectedExportFormat.toUpperCase()}
                </span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Security Logs */}
        <Card className={`shadow-lg border-0 ${
          isDarkMode ? 'bg-[#1E1E1E] border-[#2C2C2C]' : 'bg-white'
        }`}>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${
                isDarkMode ? 'bg-[#3A3A3A]' : 'bg-gray-100'
              }`}>
                <Clock className={`w-5 h-5 ${
                  isDarkMode ? 'text-[#B0B0B0]' : 'text-gray-600'
                }`} />
              </div>
              <div>
                <h3 className={`font-semibold ${
                  isDarkMode ? 'text-white' : 'text-slate-800'
                }`}>Security Logs</h3>
                <p className={`text-sm ${
                  isDarkMode ? 'text-[#B0B0B0]' : 'text-slate-600'
                }`}>Recent role and permission changes</p>
              </div>
            </div>
            
            {/* Filter Slider */}
            <div className={`mt-4 p-4 rounded-lg border ${
              isDarkMode 
                ? 'bg-[#2C2C2C] border-[#3A3A3A]' 
                : 'bg-white border-gray-200'
            }`}>
              <div className="flex items-center justify-between mb-3">
                <label className={`text-sm font-medium ${
                  isDarkMode ? 'text-[#E0E0E0]' : 'text-slate-700'
                }`}>Filter logs by days:</label>
                <span className={`text-sm ${
                  isDarkMode ? 'text-[#B0B0B0]' : 'text-slate-600'
                }`}>{logFilter[0]} days</span>
              </div>
              <Slider
                value={logFilter}
                onValueChange={setLogFilter}
                max={30}
                min={1}
                step={1}
                className="w-full [&_[role=slider]]:bg-white [&_[role=slider]]:border-2 [&_[role=slider]]:border-blue-500 [&_[role=slider]]:shadow-lg"
              />
              <div className={`flex justify-between text-xs mt-1 ${
                isDarkMode ? 'text-[#B0B0B0]' : 'text-slate-400'
              }`}>
                <span>1 day</span>
                <span>30 days</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {mockSecurityLogs.map((log) => (
                <div key={log.id} className={`flex items-start gap-3 p-3 rounded-lg border shadow-sm ${
                  isDarkMode 
                    ? 'bg-[#2C2C2C] border-[#3A3A3A]' 
                    : 'bg-white border-gray-200'
                }`}>
                  {getLogIcon(log.type)}
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm ${
                      isDarkMode ? 'text-[#E0E0E0]' : 'text-slate-800'
                    }`}>{log.action}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <User className={`w-3 h-3 ${
                        isDarkMode ? 'text-[#B0B0B0]' : 'text-slate-400'
                      }`} />
                      <span className={`text-xs ${
                        isDarkMode ? 'text-[#B0B0B0]' : 'text-slate-500'
                      }`}>{log.user}</span>
                      <span className={`text-xs ${
                        isDarkMode ? 'text-[#B0B0B0]' : 'text-slate-400'
                      }`}>•</span>
                      <span className={`text-xs ${
                        isDarkMode ? 'text-[#B0B0B0]' : 'text-slate-500'
                      }`}>{log.timestamp}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <Button 
            onClick={handleSaveChanges}
            disabled={!hasChanges}
            className={`flex-1 py-3 rounded-xl shadow-lg ${
              isDarkMode 
                ? 'bg-gradient-to-r from-[#BB86FC] to-[#BB86FC]/80 hover:from-[#BB86FC]/90 hover:to-[#BB86FC]/70 text-black' 
                : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
            }`}
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
          
          <Button 
            variant="outline" 
            onClick={() => {
              setSelectedRole('');
              setPermissions(initialPermissions);
              setHasChanges(false);
            }}
            className={`flex-1 py-3 rounded-xl ${
              isDarkMode 
                ? 'border-[#3A3A3A] text-[#E0E0E0] hover:bg-[#2C2C2C]' 
                : 'border-slate-300 text-slate-700 hover:bg-slate-50'
            }`}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}