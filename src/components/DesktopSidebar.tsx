import { Button } from './ui/button';
import { 
  LayoutDashboard, 
  BarChart3, 
  MessageSquare, 
  User,
  AlertTriangle,
  Plane 
} from 'lucide-react';

// Using Lucide Plane icon as drone symbol

// Shield with Drone Logo Component (same as TopBar)
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
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 text-white"
    />
  </div>
);

interface DesktopSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isDarkMode?: boolean;
  onSOSClick: () => void;
}

const navigationItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'reports', label: 'Report Stats', icon: BarChart3 },
  { id: 'chat', label: 'AI Chat Bot', icon: MessageSquare },
  { id: 'profile', label: 'Profile', icon: User }
];

export function DesktopSidebar({ activeTab, onTabChange, isDarkMode = false, onSOSClick }: DesktopSidebarProps) {
  return (
    <div className={`fixed left-0 top-0 h-full w-80 border-r transition-colors duration-300 z-40 ${
      isDarkMode 
        ? 'bg-[#1E1E1E] border-[#3A3A3A]' 
        : 'bg-white border-gray-200'
    }`}>
      {/* Header with Logo and SOS */}
      <div className="relative p-6 border-b border-inherit">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-6">
          <ShieldDroneLogo className="w-10 h-10" isDarkMode={isDarkMode} />
          <div>
            <h1 className={`text-xl font-semibold ${isDarkMode ? 'text-[#BB86FC]' : 'text-blue-600'}`}>
              DroneOps
            </h1>
            <p className={`text-sm ${isDarkMode ? 'text-[#E0E0E0]' : 'text-slate-600'}`}>
              Disaster Response
            </p>
          </div>
        </div>

        {/* SOS Button */}
        <Button 
          onClick={onSOSClick}
          className={`absolute top-6 right-6 px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 ${
            isDarkMode 
              ? 'bg-[#CF6679] hover:bg-[#CF6679]/90 text-white shadow-[#CF6679]/30' 
              : 'bg-red-600 hover:bg-red-700 text-white shadow-red-600/30'
          } shadow-lg`}
        >
          <AlertTriangle className="w-4 h-4 mr-2" />
          SOS
        </Button>
      </div>

      {/* Navigation */}
      <nav className="p-6">
        <div className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <Button
                key={item.id}
                variant="ghost"
                onClick={() => onTabChange(item.id)}
                className={`w-full justify-start p-4 rounded-xl transition-all duration-200 ${
                  isActive
                    ? isDarkMode 
                      ? 'bg-[#BB86FC]/20 text-[#BB86FC] border border-[#BB86FC]/30 hover:bg-[#BB86FC]/30' 
                      : 'bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100'
                    : isDarkMode 
                      ? 'text-[#E0E0E0] hover:bg-[#2C2C2C] hover:text-[#BB86FC]' 
                      : 'text-slate-700 hover:bg-slate-100 hover:text-blue-600'
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                <span className="font-medium">{item.label}</span>
              </Button>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className={`absolute bottom-6 left-6 right-6 p-4 rounded-lg border ${
        isDarkMode 
          ? 'bg-[#2C2C2C] border-[#3A3A3A]' 
          : 'bg-slate-50 border-gray-200'
      }`}>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className={`text-sm font-medium ${
            isDarkMode ? 'text-[#03DAC6]' : 'text-green-600'
          }`}>
            System Online
          </span>
        </div>
        <p className={`text-xs ${
          isDarkMode ? 'text-[#B0B0B0]' : 'text-slate-500'
        }`}>
          All systems operational
        </p>
      </div>
    </div>
  );
}