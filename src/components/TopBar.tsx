import { useState } from 'react';
import { AlertTriangle, Plane } from 'lucide-react';
import { Button } from './ui/button';
import { SOSPanel } from './SOSPanel';
// Using Lucide Plane icon as drone symbol

// Shield with Drone Logo Component
const ShieldDroneLogo = ({ className, isDarkMode }: { className?: string; isDarkMode?: boolean }) => (
  <div className={`relative ${className}`}>
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      className="w-full h-full"
    >
      {/* Shield outline in purple gradient color */}
      <path 
        d="M12 2L3 6v5c0 6.5 4.5 12 9 12s9-5.5 9-12V6l-9-4z" 
        fill="none" 
        stroke="#A259FF" 
        strokeWidth="2"
      />
    </svg>
    {/* Drone icon inside shield */}
    <Plane 
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 text-white"
    />
  </div>
);

interface TopBarProps {
  isDarkMode?: boolean;
  onSOSClick?: () => void;
}

export function TopBar({ isDarkMode = false, onSOSClick }: TopBarProps) {
  const [showSOSPanel, setShowSOSPanel] = useState(false);

  const handleSOSClick = () => {
    if (onSOSClick) {
      onSOSClick();
    } else {
      setShowSOSPanel(true);
    }
  };
  return (
    <div className={`flex items-center justify-between p-4 transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-r from-[#1E1E1E] to-[#222222] text-white' 
        : 'bg-gradient-to-r from-slate-900 to-slate-800 text-white'
    }`}>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <ShieldDroneLogo className="w-8 h-8" isDarkMode={isDarkMode} />
          <div>
            <h1 className={`text-lg font-semibold ${isDarkMode ? 'text-[#BB86FC]' : 'text-white'}`}>DroneOps</h1>
            <p className={`text-xs ${isDarkMode ? 'text-[#E0E0E0]' : 'text-slate-300'}`}>Disaster Response</p>
          </div>
        </div>
      </div>
      
      <Button 
        size="lg"
        onClick={handleSOSClick}
        className={`${
          isDarkMode 
            ? 'bg-[#CF6679] hover:bg-[#CF6679]/90 border-[#CF6679]/30 shadow-[#CF6679]/30' 
            : 'bg-red-600 hover:bg-red-700 border-red-300/30 shadow-red-600/30'
        } text-white rounded-full w-16 h-16 p-0 shadow-lg border-4`}
      >
        <div className="flex flex-col items-center">
          <AlertTriangle className="w-6 h-6" />
          <span className="text-xs font-semibold">SOS</span>
        </div>
      </Button>

      {!onSOSClick && (
        <SOSPanel 
          isOpen={showSOSPanel} 
          onClose={() => setShowSOSPanel(false)} 
          isDarkMode={isDarkMode}
        />
      )}
    </div>
  );
}