import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { toast } from 'sonner@2.0.3';
import { 
  X, 
  MapPin, 
  Package, 
  User, 
  AlertTriangle, 
  Clock, 
  FileText, 
  Save,
  Send,
  Loader2,
  Eye,
  History,
  Edit3
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface AddMissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onMissionCreated: (mission: any) => void;
  isDarkMode?: boolean;
  existingMissions?: any[];
}

interface MissionData {
  location: string;
  coordinates: string;
  packageType: string;
  urgency: 'High' | 'Medium' | 'Low';
  pilot: string;
  notes: string;
  isManualLocation: boolean;
}

const packageOptions = [
  { value: 'medical', label: 'Medical Supplies', weight: '2.5 kg', icon: '🏥' },
  { value: 'food', label: 'Food & Water', weight: '3.0 kg', icon: '🍞' },
  { value: 'rescue', label: 'Rescue Kit', weight: '1.8 kg', icon: '🛟' },
  { value: 'communication', label: 'Communication Equipment', weight: '1.2 kg', icon: '📡' },
  { value: 'shelter', label: 'Emergency Shelter', weight: '4.5 kg', icon: '⛺' },
  { value: 'tools', label: 'Rescue Tools', weight: '3.2 kg', icon: '🔧' },
  { value: 'blankets', label: 'Blankets & Clothing', weight: '2.0 kg', icon: '🧥' },
];

const pilotOptions = [
  { value: 'pilot-001', name: 'Captain Sarah Mitchell', status: 'Available', experience: '5 years' },
  { value: 'pilot-002', name: 'Lt. James Rodriguez', status: 'Available', experience: '3 years' },
  { value: 'pilot-003', name: 'Operator Maya Chen', status: 'On Mission', experience: '7 years' },
  { value: 'pilot-004', name: 'Sgt. Alex Thompson', status: 'Available', experience: '4 years' },
];

const disasterZones = [
  { value: 'zone-alpha', label: 'Emergency Camp Alpha', coords: '42.3601° N, 71.0589° W' },
  { value: 'zone-beta', label: 'Rescue Station Beta', coords: '42.3584° N, 71.0636° W' },
  { value: 'zone-charlie', label: 'Forward Operating Base Charlie', coords: '42.3612° N, 71.0578° W' },
  { value: 'zone-delta', label: 'Evacuation Point Delta', coords: '42.3595° N, 71.0612° W' },
];

export function AddMissionModal({ isOpen, onClose, onMissionCreated, isDarkMode = false, existingMissions = [] }: AddMissionModalProps) {
  const [step, setStep] = useState<'form' | 'preview' | 'loading'>('form');
  const [isDraft, setIsDraft] = useState(false);
  const [showManualInput, setShowManualInput] = useState(false);
  const [locationHistory, setLocationHistory] = useState<Array<{label: string, coords: string, lastUsed: string}>>([]);
  const [missionData, setMissionData] = useState<MissionData>({
    location: localStorage.getItem('droneops-last-zone') || '',
    coordinates: '',
    packageType: '',
    urgency: 'Medium',
    pilot: '',
    notes: '',
    isManualLocation: false
  });

  // Extract location history from existing missions and localStorage
  useEffect(() => {
    const history: Array<{label: string, coords: string, lastUsed: string}> = [];
    
    // Get from localStorage
    const savedHistory = localStorage.getItem('droneops-location-history');
    if (savedHistory) {
      history.push(...JSON.parse(savedHistory));
    }
    
    // Extract from existing missions
    existingMissions.forEach(mission => {
      const location = mission.mission?.recipient?.location;
      const coords = mission.mission?.liveLocation?.coordinates;
      if (location && coords) {
        const existing = history.find(h => h.label === location);
        if (!existing) {
          history.push({
            label: location,
            coords: coords,
            lastUsed: 'Previous mission'
          });
        }
      }
    });
    
    // Sort by last used (most recent first)
    history.sort((a, b) => {
      if (a.lastUsed === 'Recent' && b.lastUsed !== 'Recent') return -1;
      if (b.lastUsed === 'Recent' && a.lastUsed !== 'Recent') return 1;
      return 0;
    });
    
    setLocationHistory(history.slice(0, 5)); // Keep only 5 most recent
  }, [existingMissions]);

  // Auto-suggest package based on urgency
  const getSuggestedPackage = (urgency: string) => {
    switch (urgency) {
      case 'High': return 'medical';
      case 'Medium': return 'food';
      case 'Low': return 'communication';
      default: return '';
    }
  };

  const handleUrgencyChange = (value: 'High' | 'Medium' | 'Low') => {
    const suggested = getSuggestedPackage(value);
    setMissionData(prev => ({
      ...prev,
      urgency: value,
      packageType: suggested
    }));
  };

  const handleLocationChange = (value: string) => {
    if (value === 'manual') {
      setShowManualInput(true);
      setMissionData(prev => ({
        ...prev,
        location: '',
        coordinates: '',
        isManualLocation: true
      }));
      return;
    }

    const zone = disasterZones.find(z => z.value === value);
    const historyItem = locationHistory.find(h => h.label === value);
    
    setMissionData(prev => ({
      ...prev,
      location: value,
      coordinates: zone?.coords || historyItem?.coords || '',
      isManualLocation: false
    }));
    
    // Save to history
    if (zone) {
      localStorage.setItem('droneops-last-zone', value);
      saveToLocationHistory(zone.label, zone.coords);
    } else if (historyItem) {
      saveToLocationHistory(historyItem.label, historyItem.coords);
    }
  };

  const handleManualLocationSubmit = () => {
    if (!missionData.location.trim()) {
      toast.error('Please enter a location');
      return;
    }
    
    // Generate dummy coordinates for manual location
    const coords = `${(42.3 + Math.random() * 0.1).toFixed(4)}° N, ${(71.0 + Math.random() * 0.1).toFixed(4)}° W`;
    
    setMissionData(prev => ({
      ...prev,
      coordinates: coords,
      isManualLocation: true
    }));
    
    // Save to history
    saveToLocationHistory(missionData.location, coords);
    setShowManualInput(false);
  };

  const saveToLocationHistory = (label: string, coords: string) => {
    const history = [...locationHistory];
    const existing = history.findIndex(h => h.label === label);
    
    if (existing >= 0) {
      history[existing].lastUsed = 'Recent';
    } else {
      history.unshift({ label, coords, lastUsed: 'Recent' });
    }
    
    // Keep only 5 most recent
    const trimmed = history.slice(0, 5);
    setLocationHistory(trimmed);
    localStorage.setItem('droneops-location-history', JSON.stringify(trimmed));
  };

  const handleSaveDraft = () => {
    setIsDraft(true);
    toast.success('Mission saved as draft');
    onClose();
  };

  const handlePreview = () => {
    if (!missionData.location || !missionData.packageType || !missionData.pilot) {
      toast.error('Please fill in all required fields');
      return;
    }
    setStep('preview');
  };

  const handleConfirm = async () => {
    setStep('loading');
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate new mission
    const newMission = {
      droneId: `DRONE-${String(Date.now()).slice(-3).padStart(3, '0')}`,
      status: 'In Transit' as const,
      mission: {
        droneModel: 'MQ-9 Guardian',
        payload: packageOptions
          .filter(pkg => pkg.value === missionData.packageType)
          .map(pkg => ({
            name: pkg.label,
            weight: pkg.weight,
            priority: missionData.urgency as 'High' | 'Medium' | 'Low'
          })),
        recipient: {
          name: pilotOptions.find(p => p.value === missionData.pilot)?.name || 'Unknown Pilot',
          contact: '+1 (555) 123-4567',
          location: missionData.isManualLocation 
            ? missionData.location 
            : (disasterZones.find(z => z.value === missionData.location)?.label || missionData.location)
        },
        telemetry: {
          battery: 100,
          altitude: '0 ft',
          speed: '0 mph',
          connectivity: 'Strong' as const
        },
        liveLocation: {
          coordinates: missionData.coordinates,
          lastUpdate: 'Just launched',
          distanceToDestination: 'Calculating...'
        }
      }
    };

    onMissionCreated(newMission);
    toast.success('Mission deployed successfully!');
    onClose();
    setStep('form');
  };

  const renderForm = () => (
    <div className="space-y-6">
      {/* Location Section */}
      <div className="space-y-3">
        <Label className={`flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
          <MapPin className="w-4 h-4" />
          Disaster Zone Location *
        </Label>
        
        {showManualInput ? (
          <div className="space-y-3">
            <Input
              placeholder="Enter location manually..."
              value={missionData.location}
              onChange={(e) => setMissionData(prev => ({ ...prev, location: e.target.value }))}
              className={`h-12 ${
                isDarkMode ? 'bg-[#2A2A2A] border-[#383838] text-white' : 'bg-white border-[#C7C7C7]'
              }`}
            />
            <div className="flex gap-2">
              <Button
                onClick={handleManualLocationSubmit}
                className={`flex-1 ${
                  isDarkMode 
                    ? 'bg-[#03DAC6] hover:bg-[#03DAC6]/90 text-black' 
                    : 'bg-[#1976D2] hover:bg-[#1976D2]/90 text-white'
                }`}
              >
                Confirm Location
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShowManualInput(false);
                  setMissionData(prev => ({ ...prev, location: '', coordinates: '', isManualLocation: false }));
                }}
                className={`${
                  isDarkMode ? 'border-[#383838] text-[#B0B0B0] hover:bg-[#2C2C2C]' : 'border-[#C7C7C7] text-[#5F6368]'
                }`}
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <Select value={missionData.isManualLocation ? '' : missionData.location} onValueChange={handleLocationChange}>
            <SelectTrigger className={`h-12 ${
              isDarkMode ? 'bg-[#2A2A2A] border-[#383838] text-white' : 'bg-white border-[#C7C7C7]'
            }`}>
              <SelectValue placeholder={missionData.isManualLocation ? missionData.location : "Select or enter location..."} />
            </SelectTrigger>
            <SelectContent className={isDarkMode ? 'bg-[#2A2A2A] border-[#383838]' : 'bg-white'}>
              {/* Location History */}
              {locationHistory.length > 0 && (
                <>
                  <div className={`px-2 py-1.5 text-xs font-medium ${
                    isDarkMode ? 'text-[#03DAC6]' : 'text-[#1976D2]'
                  } flex items-center gap-2`}>
                    <History className="w-3 h-3" />
                    Recent Locations
                  </div>
                  {locationHistory.map((item, idx) => (
                    <SelectItem key={`history-${idx}`} value={item.label}>
                      <div>
                        <div className={isDarkMode ? 'text-white' : 'text-slate-900'}>{item.label}</div>
                        <div className={`text-xs ${isDarkMode ? 'text-[#B0B0B0]' : 'text-[#5F6368]'}`}>
                          {item.coords} • {item.lastUsed}
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                  <Separator className="my-1" />
                </>
              )}
              
              {/* Predefined Zones */}
              <div className={`px-2 py-1.5 text-xs font-medium ${
                isDarkMode ? 'text-[#03DAC6]' : 'text-[#1976D2]'
              }`}>
                Emergency Zones
              </div>
              {disasterZones.map((zone) => (
                <SelectItem key={zone.value} value={zone.value}>
                  <div>
                    <div className={isDarkMode ? 'text-white' : 'text-slate-900'}>{zone.label}</div>
                    <div className={`text-xs ${isDarkMode ? 'text-[#B0B0B0]' : 'text-[#5F6368]'}`}>
                      {zone.coords}
                    </div>
                  </div>
                </SelectItem>
              ))}
              
              <Separator className="my-1" />
              
              {/* Manual Input Option */}
              <SelectItem value="manual">
                <div className="flex items-center gap-2">
                  <Edit3 className="w-4 h-4" />
                  <div>
                    <div className={isDarkMode ? 'text-white' : 'text-slate-900'}>Enter Location Manually</div>
                    <div className={`text-xs ${isDarkMode ? 'text-[#B0B0B0]' : 'text-[#5F6368]'}`}>
                      Type custom location name
                    </div>
                  </div>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        )}
        
        {/* Map Preview */}
        {missionData.coordinates && (
          <div className="relative h-32 rounded-lg overflow-hidden border border-[#E0E0E0]">
            <ImageWithFallback 
              src="https://images.unsplash.com/photo-1637118024908-9ab4c9ac9391?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcm9uZSUyMGFlcmlhbCUyMHZpZXclMjBkaXNhc3RlciUyMG1hbmFnZW1lbnR8ZW58MXx8fHwxNzU3NzcxOTI3fDA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Disaster zone map"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 left-2 bg-red-500 w-3 h-3 rounded-full animate-pulse"></div>
            <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
              {missionData.coordinates}
            </div>
          </div>
        )}
      </div>

      {/* Package Details */}
      <div className="space-y-3">
        <Label className={`flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
          <Package className="w-4 h-4" />
          Package Details *
        </Label>
        <Select value={missionData.packageType} onValueChange={(value) => setMissionData(prev => ({ ...prev, packageType: value }))}>
          <SelectTrigger className={`h-12 ${
            isDarkMode ? 'bg-[#2A2A2A] border-[#383838] text-white' : 'bg-white border-[#C7C7C7]'
          }`}>
            <SelectValue placeholder="Select package type..." />
          </SelectTrigger>
          <SelectContent className={isDarkMode ? 'bg-[#2A2A2A] border-[#383838]' : 'bg-white'}>
            {packageOptions.map((pkg) => (
              <SelectItem key={pkg.value} value={pkg.value}>
                <div className="flex items-center gap-3">
                  <span className="text-lg">{pkg.icon}</span>
                  <div>
                    <div className={isDarkMode ? 'text-white' : 'text-slate-900'}>{pkg.label}</div>
                    <div className={`text-xs ${isDarkMode ? 'text-[#B0B0B0]' : 'text-[#5F6368]'}`}>
                      Weight: {pkg.weight}
                    </div>
                  </div>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Urgency Level */}
      <div className="space-y-3">
        <Label className={`flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
          <AlertTriangle className="w-4 h-4" />
          Urgency Level *
        </Label>
        <RadioGroup 
          value={missionData.urgency} 
          onValueChange={handleUrgencyChange}
          className="flex gap-6"
        >
          {(['High', 'Medium', 'Low'] as const).map((level) => (
            <div key={level} className="flex items-center space-x-2">
              <RadioGroupItem 
                value={level} 
                id={level}
                className={isDarkMode ? 'border-[#383838] text-[#03DAC6]' : 'border-[#C7C7C7] text-[#1976D2]'}
              />
              <Label 
                htmlFor={level}
                className={`cursor-pointer ${isDarkMode ? 'text-white' : 'text-slate-900'}`}
              >
                <Badge 
                  variant={level === 'High' ? 'destructive' : level === 'Medium' ? 'default' : 'secondary'}
                  className="ml-1"
                >
                  {level}
                </Badge>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Assign Pilot */}
      <div className="space-y-3">
        <Label className={`flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
          <User className="w-4 h-4" />
          Assign Pilot/Operator *
        </Label>
        <Select value={missionData.pilot} onValueChange={(value) => setMissionData(prev => ({ ...prev, pilot: value }))}>
          <SelectTrigger className={`h-12 ${
            isDarkMode ? 'bg-[#2A2A2A] border-[#383838] text-white' : 'bg-white border-[#C7C7C7]'
          }`}>
            <SelectValue placeholder="Select pilot or operator..." />
          </SelectTrigger>
          <SelectContent className={isDarkMode ? 'bg-[#2A2A2A] border-[#383838]' : 'bg-white'}>
            {pilotOptions.map((pilot) => (
              <SelectItem key={pilot.value} value={pilot.value} disabled={pilot.status === 'On Mission'}>
                <div className="flex items-center justify-between w-full">
                  <div>
                    <div className={isDarkMode ? 'text-white' : 'text-slate-900'}>{pilot.name}</div>
                    <div className={`text-xs ${isDarkMode ? 'text-[#B0B0B0]' : 'text-[#5F6368]'}`}>
                      {pilot.experience} experience
                    </div>
                  </div>
                  <Badge 
                    variant={pilot.status === 'Available' ? 'default' : 'secondary'}
                    className="ml-2"
                  >
                    {pilot.status}
                  </Badge>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Notes */}
      <div className="space-y-3">
        <Label className={`flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
          <FileText className="w-4 h-4" />
          Additional Notes (Optional)
        </Label>
        <Textarea
          placeholder="Enter any additional mission details, special instructions, or notes..."
          value={missionData.notes}
          onChange={(e) => setMissionData(prev => ({ ...prev, notes: e.target.value }))}
          className={`min-h-[100px] ${
            isDarkMode ? 'bg-[#2A2A2A] border-[#383838] text-white' : 'bg-white border-[#C7C7C7]'
          }`}
        />
      </div>
    </div>
  );

  const renderPreview = () => {
    const selectedPackage = packageOptions.find(pkg => pkg.value === missionData.packageType);
    const selectedPilot = pilotOptions.find(pilot => pilot.value === missionData.pilot);
    const selectedZone = disasterZones.find(zone => zone.value === missionData.location);
    const selectedHistoryItem = locationHistory.find(h => h.label === missionData.location);

    return (
      <div className="space-y-6">
        <Card className={`${
          isDarkMode ? 'bg-[#2A2A2A] border-[#383838]' : 'bg-[#F8F9FA] border-[#E0E0E0]'
        }`}>
          <CardHeader>
            <CardTitle className={`flex items-center gap-2 ${
              isDarkMode ? 'text-white' : 'text-[#212121]'
            }`}>
              <Eye className="w-5 h-5" />
              Mission Preview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className={`text-sm ${isDarkMode ? 'text-[#B0B0B0]' : 'text-[#5F6368]'}`}>Location</p>
                <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-[#212121]'}`}>
                  {missionData.isManualLocation 
                    ? missionData.location 
                    : (selectedZone?.label || selectedHistoryItem?.label || missionData.location)}
                </p>
                <p className={`text-xs ${isDarkMode ? 'text-[#B0B0B0]' : 'text-[#5F6368]'}`}>
                  {missionData.coordinates}
                  {missionData.isManualLocation && ' • Custom Location'}
                </p>
              </div>
              <div>
                <p className={`text-sm ${isDarkMode ? 'text-[#B0B0B0]' : 'text-[#5F6368]'}`}>Package</p>
                <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-[#212121]'}`}>
                  {selectedPackage?.label}
                </p>
                <p className={`text-xs ${isDarkMode ? 'text-[#B0B0B0]' : 'text-[#5F6368]'}`}>
                  {selectedPackage?.weight}
                </p>
              </div>
              <div>
                <p className={`text-sm ${isDarkMode ? 'text-[#B0B0B0]' : 'text-[#5F6368]'}`}>Urgency</p>
                <Badge 
                  variant={missionData.urgency === 'High' ? 'destructive' : missionData.urgency === 'Medium' ? 'default' : 'secondary'}
                >
                  {missionData.urgency}
                </Badge>
              </div>
              <div>
                <p className={`text-sm ${isDarkMode ? 'text-[#B0B0B0]' : 'text-[#5F6368]'}`}>Pilot</p>
                <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-[#212121]'}`}>
                  {selectedPilot?.name}
                </p>
              </div>
            </div>
            {missionData.notes && (
              <div>
                <p className={`text-sm ${isDarkMode ? 'text-[#B0B0B0]' : 'text-[#5F6368]'}`}>Notes</p>
                <p className={`text-sm ${isDarkMode ? 'text-white' : 'text-[#212121]'}`}>
                  {missionData.notes}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderLoading = () => (
    <div className="flex flex-col items-center justify-center py-12 space-y-4">
      <Loader2 className={`w-12 h-12 animate-spin ${
        isDarkMode ? 'text-[#03DAC6]' : 'text-[#1976D2]'
      }`} />
      <p className={`text-center ${isDarkMode ? 'text-white' : 'text-[#212121]'}`}>
        Deploying mission...
      </p>
      <p className={`text-sm text-center ${isDarkMode ? 'text-[#B0B0B0]' : 'text-[#5F6368]'}`}>
        Preparing drone, calculating route, and notifying pilot
      </p>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`max-w-2xl max-h-[90vh] overflow-y-auto ${
        isDarkMode ? 'bg-[#1E1E1E] border-[#2C2C2C] text-white' : 'bg-white border-[#E0E0E0]'
      }`}>
        <DialogHeader>
          <DialogTitle className={`text-center ${
            isDarkMode ? 'text-white' : 'text-[#212121]'
          }`}>
            {step === 'form' ? 'Create New Mission' : step === 'preview' ? 'Confirm Mission' : 'Deploying Mission'}
          </DialogTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className={`absolute top-4 right-4 ${
              isDarkMode ? 'text-[#B0B0B0] hover:text-white hover:bg-[#2C2C2C]' : 'text-[#5F6368] hover:text-[#212121] hover:bg-gray-100'
            }`}
          >
            <X className="w-4 h-4" />
          </Button>
        </DialogHeader>

        <div className="mt-6">
          {step === 'form' && renderForm()}
          {step === 'preview' && renderPreview()}
          {step === 'loading' && renderLoading()}
        </div>

        {step !== 'loading' && (
          <div className="flex items-center justify-between pt-6 border-t border-inherit">
            <div className="flex gap-2">
              {step === 'form' && (
                <Button 
                  variant="outline" 
                  onClick={handleSaveDraft}
                  className={`flex items-center gap-2 ${
                    isDarkMode ? 'border-[#383838] text-[#B0B0B0] hover:bg-[#2C2C2C]' : 'border-[#C7C7C7] text-[#5F6368]'
                  }`}
                >
                  <Save className="w-4 h-4" />
                  Save as Draft
                </Button>
              )}
              {step === 'preview' && (
                <Button 
                  variant="outline" 
                  onClick={() => setStep('form')}
                  className={`${
                    isDarkMode ? 'border-[#383838] text-[#B0B0B0] hover:bg-[#2C2C2C]' : 'border-[#C7C7C7] text-[#5F6368]'
                  }`}
                >
                  Back to Edit
                </Button>
              )}
            </div>
            
            <div className="flex gap-2">
              {step === 'form' && (
                <Button 
                  onClick={handlePreview}
                  className={`flex items-center gap-2 ${
                    isDarkMode 
                      ? 'bg-[#03DAC6] hover:bg-[#03DAC6]/90 text-black' 
                      : 'bg-[#1976D2] hover:bg-[#1976D2]/90 text-white'
                  }`}
                >
                  <Eye className="w-4 h-4" />
                  Preview Mission
                </Button>
              )}
              {step === 'preview' && (
                <Button 
                  onClick={handleConfirm}
                  className={`flex items-center gap-2 ${
                    isDarkMode 
                      ? 'bg-[#03DAC6] hover:bg-[#03DAC6]/90 text-black' 
                      : 'bg-[#1976D2] hover:bg-[#1976D2]/90 text-white'
                  }`}
                >
                  <Send className="w-4 h-4" />
                  Deploy Mission
                </Button>
              )}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}