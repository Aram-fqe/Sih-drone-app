import { useState } from 'react';
import { X, AlertTriangle, Siren, Phone, MapPin, RotateCcw, Plane, Users, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { motion, AnimatePresence } from 'motion/react';

interface SOSPanelProps {
  isOpen?: boolean;
  onClose: () => void;
  isDarkMode?: boolean;
}

interface Recipient {
  name: string;
  role: string;
  status: 'active' | 'inactive';
}

const recipients: Recipient[] = [
  { name: 'Command Center', role: 'Primary Control', status: 'active' },
  { name: 'Field Teams', role: 'Ground Response', status: 'active' },
  { name: 'Drone Pilots', role: 'Flight Operations', status: 'active' },
  { name: 'Medical Support', role: 'Healthcare', status: 'inactive' }
];

const emergencyContacts = [
  { name: 'NDRF Helpline', number: '1078', icon: '🚨' },
  { name: 'CISF Emergency', number: '1122', icon: '🛡️' },
  { name: 'Local Police', number: '100', icon: '👮' },
  { name: 'Medical/Ambulance', number: '108', icon: '🚑' }
];

export function SOSPanel({ isOpen = true, onClose, isDarkMode = false }: SOSPanelProps) {
  const [selectedEmergency, setSelectedEmergency] = useState<'human' | 'operational' | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [gpsShared, setGpsShared] = useState(false);
  const [showContacts, setShowContacts] = useState(false);

  const handleHumanEmergency = () => {
    setSelectedEmergency('human');
    setGpsShared(true);
    setShowContacts(true);
  };

  const handleOperationalEmergency = () => {
    setSelectedEmergency('operational');
  };

  const handleSendSOS = () => {
    setShowConfirmation(true);
  };

  const confirmSOS = () => {
    // Log the emergency event
    console.log('SOS Alert sent to all recipients');
    setShowConfirmation(false);
    onClose();
    // Reset state
    setTimeout(() => {
      setSelectedEmergency(null);
      setGpsShared(false);
      setShowContacts(false);
    }, 300);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className={`w-full max-w-md rounded-2xl shadow-2xl overflow-hidden ${
            isDarkMode ? 'bg-[#1E1E1E]' : 'bg-white'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className={`px-4 py-3 relative ${
            isDarkMode ? 'bg-[#CF6679]' : 'bg-red-600'
          }`}>
            <button
              onClick={onClose}
              className="absolute left-3 top-3 w-8 h-8 bg-red-700/30 rounded-full flex items-center justify-center hover:bg-red-700/50 transition-colors"
            >
              <X className="w-4 h-4 text-white" />
            </button>
            <div className="text-center">
              <h2 className="text-white text-lg font-bold">SOS – Emergency Alert</h2>
              <p className="text-red-100 text-sm mt-1">
                Choose the type of emergency. Alerts will be sent immediately.
              </p>
            </div>
          </div>

          {/* Emergency Categories */}
          <div className="p-4 space-y-3">
            {/* Human Emergency */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleHumanEmergency}
              className={`w-full p-4 rounded-xl transition-all duration-200 ${
                selectedEmergency === 'human'
                  ? 'bg-red-600 shadow-lg shadow-red-600/30'
                  : 'bg-red-500 hover:bg-red-600 hover:shadow-md'
              }`}
            >
              <div className="flex items-center gap-3 text-white">
                <Siren className="w-6 h-6" />
                <div className="flex-1 text-left">
                  <h3 className="font-bold">🚨 Human Emergency</h3>
                  <p className="text-sm text-red-100">Top Priority - Immediate Response</p>
                </div>
              </div>
            </motion.button>

            {/* Human Emergency Actions */}
            <AnimatePresence>
              {selectedEmergency === 'human' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="bg-red-50 border-2 border-red-200 rounded-xl p-4 space-y-3 overflow-hidden"
                >
                  {/* GPS Status */}
                  {gpsShared && (
                    <div className="flex items-center gap-2 text-green-700 bg-green-100 p-2 rounded-lg">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm font-medium">Live GPS Location Shared</span>
                      <CheckCircle className="w-4 h-4" />
                    </div>
                  )}

                  {/* Emergency Contacts */}
                  {showContacts && (
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-700">Quick Contact Numbers:</p>
                      <div className="grid grid-cols-2 gap-2">
                        {emergencyContacts.map((contact, idx) => (
                          <button
                            key={idx}
                            className="flex items-center gap-2 p-2 bg-white border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
                          >
                            <span className="text-lg">{contact.icon}</span>
                            <div className="text-left">
                              <p className="text-xs font-medium text-gray-800">{contact.name}</p>
                              <p className="text-xs text-blue-600">{contact.number}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="bg-red-100 p-3 rounded-lg">
                    <p className="text-sm font-medium text-red-800">🚨 Priority Rescue Alert</p>
                    <p className="text-xs text-red-700 mt-1">
                      Command Center + Field Teams will be notified immediately
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Operational Emergency */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleOperationalEmergency}
              className={`w-full p-4 rounded-xl transition-all duration-200 ${
                selectedEmergency === 'operational'
                  ? 'bg-yellow-500 shadow-lg shadow-yellow-500/30'
                  : 'bg-yellow-400 hover:bg-yellow-500 hover:shadow-md'
              }`}
            >
              <div className="flex items-center gap-3 text-black">
                <AlertTriangle className="w-6 h-6" />
                <div className="flex-1 text-left">
                  <h3 className="font-bold">🛑 Operational Emergency</h3>
                  <p className="text-sm text-gray-800">Drone/Mission Critical Issue</p>
                </div>
              </div>
            </motion.button>

            {/* Operational Emergency Actions */}
            <AnimatePresence>
              {selectedEmergency === 'operational' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4 space-y-3 overflow-hidden"
                >
                  <div className="grid grid-cols-2 gap-2">
                    <button className="flex items-center gap-2 p-3 bg-white border border-yellow-200 rounded-lg hover:bg-yellow-50 transition-colors">
                      <RotateCcw className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-gray-800">Recall Drone</span>
                    </button>
                    <button className="flex items-center gap-2 p-3 bg-white border border-yellow-200 rounded-lg hover:bg-yellow-50 transition-colors">
                      <Plane className="w-4 h-4 text-red-600" />
                      <span className="text-sm font-medium text-gray-800">Emergency Land</span>
                    </button>
                  </div>
                  <button className="w-full flex items-center gap-2 p-3 bg-white border border-yellow-200 rounded-lg hover:bg-yellow-50 transition-colors">
                    <Users className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium text-gray-800">Notify Team Members</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Recipients Preview */}
          <div className="px-4 pb-4">
            <div className={`border rounded-xl p-3 ${
              isDarkMode 
                ? 'bg-[#2C2C2C] border-[#3A3A3A]' 
                : 'bg-gray-50 border-gray-200'
            }`}>
              <p className={`text-sm font-medium mb-2 ${
                isDarkMode ? 'text-[#E0E0E0]' : 'text-gray-700'
              }`}>Alert Recipients:</p>
              <div className="flex flex-wrap gap-2">
                {recipients.map((recipient, idx) => (
                  <div
                    key={idx}
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      recipient.status === 'active'
                        ? 'bg-blue-100 text-blue-700 border border-blue-200'
                        : 'bg-gray-100 text-gray-500 border border-gray-200'
                    }`}
                  >
                    {recipient.name}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Send SOS Button */}
          <div className={`p-4 border-t ${
            isDarkMode ? 'border-[#3A3A3A]' : 'border-gray-200'
          }`}>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSendSOS}
              disabled={!selectedEmergency}
              className={`w-full py-4 rounded-xl font-bold text-white transition-all duration-200 text-center ${
                selectedEmergency
                  ? isDarkMode 
                    ? 'bg-[#CF6679] hover:bg-[#CF6679]/90 shadow-lg animate-pulse' 
                    : 'bg-red-600 hover:bg-red-700 shadow-lg animate-pulse'
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              SEND ALERT NOW
            </motion.button>
          </div>
        </motion.div>

        {/* Confirmation Popup */}
        <AnimatePresence>
          {showConfirmation && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-60"
            >
              <div className={`rounded-2xl p-6 max-w-sm w-full text-center ${
                isDarkMode ? 'bg-[#1E1E1E]' : 'bg-white'
              }`}>
                <AlertTriangle className="w-12 h-12 text-red-600 mx-auto mb-4" />
                <h3 className={`text-lg font-bold mb-2 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>Confirm Emergency Alert</h3>
                <p className={`text-sm mb-6 ${
                  isDarkMode ? 'text-[#B0B0B0]' : 'text-gray-600'
                }`}>
                  This will immediately notify all active recipients. Are you sure you want to proceed?
                </p>
                <div className="flex gap-3">
                  <Button
                    onClick={() => setShowConfirmation(false)}
                    variant="outline"
                    className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={confirmSOS}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                  >
                    Send Alert
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}