import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Settings, Globe, Save, RotateCcw, Check } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Switch } from './ui/switch';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { toast } from 'sonner@2.0.3';

interface AppSettingsScreenProps {
  onBack: () => void;
  onLanguageSelect: () => void;
  isDarkMode: boolean;
}

export const AppSettingsScreen: React.FC<AppSettingsScreenProps> = ({ 
  onBack, 
  onLanguageSelect, 
  isDarkMode 
}) => {
  const [settings, setSettings] = useState({
    // Units of Measurement
    distanceUnit: 'kilometers',
    weightUnit: 'kilograms',
    
    // Time Zone Settings
    timeZone: 'GMT+05:30',
    autoDetectTimeZone: true,
    
    // Preferences
    theme: 'auto',
    deliveryUpdates: true,
    maintenanceAlerts: true,
    sosAlerts: true, // Always on
    
    // Quick Access
    exportFormat: 'pdf'
  });

  const timeZones = [
    { value: 'GMT-12:00', label: 'GMT -12:00 – International Date Line West' },
    { value: 'GMT-11:00', label: 'GMT -11:00 – Coordinated Universal Time-11' },
    { value: 'GMT-10:00', label: 'GMT -10:00 – Hawaii' },
    { value: 'GMT-09:00', label: 'GMT -09:00 – Alaska' },
    { value: 'GMT-08:00', label: 'GMT -08:00 – Pacific Time (US & Canada)' },
    { value: 'GMT-07:00', label: 'GMT -07:00 – Mountain Time (US & Canada)' },
    { value: 'GMT-06:00', label: 'GMT -06:00 – Central Time (US & Canada)' },
    { value: 'GMT-05:00', label: 'GMT -05:00 – Eastern Time (US & Canada)' },
    { value: 'GMT-04:00', label: 'GMT -04:00 – Atlantic Time (Canada)' },
    { value: 'GMT-03:00', label: 'GMT -03:00 – Brasilia' },
    { value: 'GMT+00:00', label: 'GMT +00:00 – Greenwich Mean Time' },
    { value: 'GMT+01:00', label: 'GMT +01:00 – Central European Time' },
    { value: 'GMT+02:00', label: 'GMT +02:00 – Eastern European Time' },
    { value: 'GMT+03:00', label: 'GMT +03:00 – Moscow Time' },
    { value: 'GMT+05:30', label: 'GMT +05:30 – India Standard Time' },
    { value: 'GMT+08:00', label: 'GMT +08:00 – China Standard Time' },
    { value: 'GMT+09:00', label: 'GMT +09:00 – Japan Standard Time' },
    { value: 'GMT+12:00', label: 'GMT +12:00 – Fiji Time' }
  ];

  const handleSaveChanges = () => {
    // Here you would typically save to backend/localStorage
    toast.success("Settings updated successfully!");
  };

  const handleResetToDefault = () => {
    setSettings({
      distanceUnit: 'kilometers',
      weightUnit: 'kilograms',
      timeZone: 'GMT+05:30',
      autoDetectTimeZone: true,
      theme: 'auto',
      deliveryUpdates: true,
      maintenanceAlerts: true,
      sosAlerts: true,
      exportFormat: 'pdf'
    });
    toast.success("Settings reset to default!");
  };

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'bg-slate-900 text-white' : 'bg-gray-50 text-slate-900'
    }`}>
      {/* Header */}
      <div className={`sticky top-0 z-10 backdrop-blur-md border-b transition-colors duration-300 ${
        isDarkMode 
          ? 'bg-slate-900/80 border-white/10' 
          : 'bg-white/80 border-gray-200'
      }`}>
        <div className="flex items-center gap-4 p-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className={`p-2 rounded-full ${
              isDarkMode 
                ? 'text-white hover:bg-white/10' 
                : 'text-slate-700 hover:bg-gray-100'
            }`}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-violet-500 rounded-lg">
              <Settings className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className={`text-xl font-semibold ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}>
                App Settings
              </h1>
              <p className={`text-sm ${
                isDarkMode ? 'text-slate-400' : 'text-slate-600'
              }`}>
                Customize your app preferences for a better experience
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-6 pb-32">
        {/* Units of Measurement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className={`p-6 backdrop-blur-sm border shadow-lg ${
            isDarkMode 
              ? 'bg-slate-800/50 border-white/10' 
              : 'bg-white/70 border-gray-200'
          }`}>
            <h3 className={`text-lg font-semibold mb-4 ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}>
              Units of Measurement
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className={`font-medium ${
                    isDarkMode ? 'text-white' : 'text-slate-900'
                  }`}>
                    Distance
                  </Label>
                  <p className={`text-sm ${
                    isDarkMode ? 'text-slate-400' : 'text-slate-600'
                  }`}>
                    {settings.distanceUnit === 'kilometers' ? 'Kilometers' : 'Miles'}
                  </p>
                </div>
                <Switch
                  checked={settings.distanceUnit === 'miles'}
                  onCheckedChange={(checked) => 
                    updateSetting('distanceUnit', checked ? 'miles' : 'kilometers')
                  }
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label className={`font-medium ${
                    isDarkMode ? 'text-white' : 'text-slate-900'
                  }`}>
                    Weight
                  </Label>
                  <p className={`text-sm ${
                    isDarkMode ? 'text-slate-400' : 'text-slate-600'
                  }`}>
                    {settings.weightUnit === 'kilograms' ? 'Kilograms' : 'Pounds'}
                  </p>
                </div>
                <Switch
                  checked={settings.weightUnit === 'pounds'}
                  onCheckedChange={(checked) => 
                    updateSetting('weightUnit', checked ? 'pounds' : 'kilograms')
                  }
                />
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Time Zone Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className={`p-6 backdrop-blur-sm border shadow-lg ${
            isDarkMode 
              ? 'bg-slate-800/50 border-white/10' 
              : 'bg-white/70 border-gray-200'
          }`}>
            <h3 className={`text-lg font-semibold mb-4 ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}>
              Time Zone Settings
            </h3>
            
            <div className="space-y-4">
              <div>
                <Label className={`font-medium block mb-2 ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}>
                  Time Zone
                </Label>
                <Select
                  value={settings.timeZone}
                  onValueChange={(value) => updateSetting('timeZone', value)}
                  disabled={settings.autoDetectTimeZone}
                >
                  <SelectTrigger className={`w-full ${
                    isDarkMode 
                      ? 'bg-slate-700 border-white/20 text-white' 
                      : 'bg-white border-gray-300'
                  }`}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {timeZones.map((tz) => (
                      <SelectItem key={tz.value} value={tz.value}>
                        {tz.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label className={`font-medium ${
                    isDarkMode ? 'text-white' : 'text-slate-900'
                  }`}>
                    Auto-detect from device
                  </Label>
                  <p className={`text-sm ${
                    isDarkMode ? 'text-slate-400' : 'text-slate-600'
                  }`}>
                    Automatically use device timezone
                  </p>
                </div>
                <Switch
                  checked={settings.autoDetectTimeZone}
                  onCheckedChange={(checked) => updateSetting('autoDetectTimeZone', checked)}
                />
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Preferences */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className={`p-6 backdrop-blur-sm border shadow-lg ${
            isDarkMode 
              ? 'bg-slate-800/50 border-white/10' 
              : 'bg-white/70 border-gray-200'
          }`}>
            <h3 className={`text-lg font-semibold mb-4 ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}>
              Preferences
            </h3>
            
            <div className="space-y-6">
              {/* Theme Selection */}
              <div>
                <Label className={`font-medium block mb-3 ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}>
                  Theme
                </Label>
                <RadioGroup
                  value={settings.theme}
                  onValueChange={(value) => updateSetting('theme', value)}
                  className="grid grid-cols-3 gap-3"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="light" id="light" />
                    <Label htmlFor="light" className="text-sm">Light</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="dark" id="dark" />
                    <Label htmlFor="dark" className="text-sm">Dark</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="auto" id="auto" />
                    <Label htmlFor="auto" className="text-sm">Auto</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Notifications */}
              <div>
                <Label className={`font-medium block mb-3 ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}>
                  Notifications
                </Label>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className={`font-medium ${
                        isDarkMode ? 'text-white' : 'text-slate-900'
                      }`}>
                        Delivery Updates
                      </Label>
                    </div>
                    <Switch
                      checked={settings.deliveryUpdates}
                      onCheckedChange={(checked) => updateSetting('deliveryUpdates', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className={`font-medium ${
                        isDarkMode ? 'text-white' : 'text-slate-900'
                      }`}>
                        Drone Maintenance Alerts
                      </Label>
                    </div>
                    <Switch
                      checked={settings.maintenanceAlerts}
                      onCheckedChange={(checked) => updateSetting('maintenanceAlerts', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between opacity-50">
                    <div>
                      <Label className={`font-medium ${
                        isDarkMode ? 'text-white' : 'text-slate-900'
                      }`}>
                        SOS Alerts
                      </Label>
                      <p className={`text-xs ${
                        isDarkMode ? 'text-slate-400' : 'text-slate-600'
                      }`}>
                        Always enabled for safety
                      </p>
                    </div>
                    <Switch
                      checked={settings.sosAlerts}
                      disabled={true}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Quick Access */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className={`p-6 backdrop-blur-sm border shadow-lg ${
            isDarkMode 
              ? 'bg-slate-800/50 border-white/10' 
              : 'bg-white/70 border-gray-200'
          }`}>
            <h3 className={`text-lg font-semibold mb-4 ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}>
              Quick Access
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className={`font-medium ${
                    isDarkMode ? 'text-white' : 'text-slate-900'
                  }`}>
                    Language
                  </Label>
                  <p className={`text-sm ${
                    isDarkMode ? 'text-slate-400' : 'text-slate-600'
                  }`}>
                    Change app language
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onLanguageSelect}
                  className={`flex items-center gap-2 ${
                    isDarkMode 
                      ? 'border-white/20 text-white hover:bg-white/10' 
                      : 'border-gray-300'
                  }`}
                >
                  <Globe className="w-4 h-4" />
                  Select
                </Button>
              </div>
              
              <div>
                <Label className={`font-medium block mb-2 ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}>
                  Default Export Format
                </Label>
                <Select
                  value={settings.exportFormat}
                  onValueChange={(value) => updateSetting('exportFormat', value)}
                >
                  <SelectTrigger className={`w-full ${
                    isDarkMode 
                      ? 'bg-slate-700 border-white/20 text-white' 
                      : 'bg-white border-gray-300'
                  }`}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="excel">Excel</SelectItem>
                    <SelectItem value="csv">CSV</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Bottom Action Buttons */}
      <div className={`fixed bottom-20 left-0 right-0 p-4 backdrop-blur-md border-t ${
        isDarkMode 
          ? 'bg-slate-900/80 border-white/10' 
          : 'bg-white/80 border-gray-200'
      }`}>
        <div className="flex gap-3">
          <Button
            onClick={handleSaveChanges}
            className="flex-1 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white shadow-lg"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
          <Button
            variant="outline"
            onClick={handleResetToDefault}
            className={`flex-1 ${
              isDarkMode 
                ? 'border-white/20 text-white hover:bg-white/10' 
                : 'border-gray-300'
            }`}
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset to Default
          </Button>
        </div>
        
        {/* Footer Note */}
        <p className={`text-xs text-center mt-3 ${
          isDarkMode ? 'text-slate-400' : 'text-slate-600'
        }`}>
          Your preferences will be applied across the app
        </p>
      </div>
    </div>
  );
};