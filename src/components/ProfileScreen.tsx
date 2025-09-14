import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { RateFeedbackScreen } from './RateFeedbackScreen';
import { ManageFleetScreen } from './ManageFleetScreen';
import { SecurityDataScreen } from './SecurityDataScreen';
import { HelpSupportScreen } from './HelpSupportScreen';
import { LanguageSelectionScreen } from './LanguageSelectionScreen';
import { AppSettingsScreen } from './AppSettingsScreen';

import { 
  ArrowLeft, 
  Menu, 
  User, 
  Building2,
  Plane,
  Bell,
  Settings,
  Globe,
  Moon,
  Sun,
  Star,
  Shield,
  HelpCircle,
  X,
  ChevronRight,
  Calendar,
  Users,
  Award,
  Activity,
  LogOut
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface MenuItemProps {
  icon: any;
  title: string;
  description?: string;
  action?: () => void;
  rightElement?: React.ReactNode;
  badge?: string;
}

interface MenuItemComponentProps extends MenuItemProps {
  isDarkMode?: boolean;
}

const MenuItem = ({ icon: Icon, title, description, action, rightElement, badge, isDarkMode = false }: MenuItemComponentProps) => {
  // Material Dark Theme styling
  const hoverClass = isDarkMode 
    ? 'hover:bg-[#BB86FC]/20' 
    : 'hover:bg-slate-100';
  const iconBgClass = isDarkMode 
    ? 'bg-[#2C2C2C] group-hover:bg-[#BB86FC]/30' 
    : 'bg-slate-100 group-hover:bg-slate-200';
  const iconColorClass = isDarkMode 
    ? 'text-[#BB86FC]' 
    : 'text-slate-700';
  const textColorClass = isDarkMode 
    ? 'text-white' 
    : 'text-slate-900';
  const subTextColorClass = isDarkMode 
    ? 'text-[#B0B0B0]' 
    : 'text-slate-600';
  const chevronColorClass = isDarkMode 
    ? 'text-[#B0B0B0]' 
    : 'text-slate-400';

  // If there's a rightElement (like Switch), render as div to avoid nested buttons
  if (rightElement) {
    return (
      <div className={`w-full flex items-center gap-4 p-4 ${hoverClass} transition-colors duration-200 rounded-lg group`}>
        <div className={`w-10 h-10 ${iconBgClass} rounded-lg flex items-center justify-center transition-colors`}>
          <Icon className={`w-5 h-5 ${iconColorClass}`} />
        </div>
        <div className="flex-1 text-left">
          <div className="flex items-center gap-2">
            <span className={`${textColorClass} font-medium`}>{title}</span>
            {badge && <Badge className="bg-red-500 text-white text-xs px-2 py-0.5">{badge}</Badge>}
          </div>
          {description && (
            <p className={`${subTextColorClass} text-sm mt-1`}>{description}</p>
          )}
        </div>
        {rightElement}
      </div>
    );
  }

  // Regular clickable menu item
  return (
    <button
      onClick={action}
      className={`w-full flex items-center gap-4 p-4 ${hoverClass} transition-colors duration-200 rounded-lg group`}
    >
      <div className={`w-10 h-10 ${iconBgClass} rounded-lg flex items-center justify-center transition-colors`}>
        <Icon className={`w-5 h-5 ${iconColorClass}`} />
      </div>
      <div className="flex-1 text-left">
        <div className="flex items-center gap-2">
          <span className={`${textColorClass} font-medium`}>{title}</span>
          {badge && <Badge className="bg-red-500 text-white text-xs px-2 py-0.5">{badge}</Badge>}
        </div>
        {description && (
          <p className={`${subTextColorClass} text-sm mt-1`}>{description}</p>
        )}
      </div>
      <ChevronRight className={`w-5 h-5 ${chevronColorClass}`} />
    </button>
  );
};

interface ProfileScreenProps {
  onHomeRedirect?: () => void;
  isDarkMode?: boolean;
  onToggleDarkMode?: (isDark: boolean) => void;
  onLogout?: () => void;
}

export function ProfileScreen({ onHomeRedirect, isDarkMode = false, onToggleDarkMode, onLogout }: ProfileScreenProps = {}) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [showRateFeedback, setShowRateFeedback] = useState(false);
  const [showManageFleet, setShowManageFleet] = useState(false);
  const [showSecurityData, setShowSecurityData] = useState(false);
  const [showHelpSupport, setShowHelpSupport] = useState(false);
  const [showLanguageSelection, setShowLanguageSelection] = useState(false);
  const [showAppSettings, setShowAppSettings] = useState(false);

  const organizationInfo = {
    name: 'Emergency Response Coalition',
    logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbWVyZ2VuY3klMjByZXNwb25zZXxlbnwxfHx8fDE3NTc3NzM2Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    aboutUs: 'Dedicated to providing rapid disaster response through advanced drone technology and coordinated relief efforts. Serving communities worldwide with precision, speed, and compassion in times of crisis.',
    established: '2019',
    activeFleet: '47 Drones',
    missionsCompleted: '2,847',
    countries: '23 Countries'
  };

  const userInfo = {
    name: 'Alex Johnson',
    role: 'Operations Manager',
    email: 'alex.johnson@erc.org',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    joinDate: 'March 2022'
  };

  const menuItems = [
    {
      icon: Plane,
      title: 'Manage Fleet',
      description: 'View and register drones, update firmware',
      badge: '3',
      action: () => {
        setIsDrawerOpen(false);
        setShowManageFleet(true);
      }
    },
    {
      icon: Bell,
      title: 'Notification Settings',
      description: 'Customize alerts for missions and incidents',
      rightElement: (
        <Switch 
          checked={notificationsEnabled}
          onCheckedChange={setNotificationsEnabled}
          className={isDarkMode 
            ? "data-[state=checked]:bg-[#BB86FC]" 
            : "data-[state=checked]:bg-blue-500"
          }
        />
      ),
      action: () => setNotificationsEnabled(!notificationsEnabled)
    },
    {
      icon: Settings,
      title: 'App Settings',
      description: 'Units, time zones, preferences',
      action: () => {
        setIsDrawerOpen(false);
        setShowAppSettings(true);
      }
    },
    {
      icon: Globe,
      title: 'Language',
      description: 'English (US)',
      action: () => {
        setIsDrawerOpen(false);
        setShowLanguageSelection(true);
      }
    },
    {
      icon: isDarkMode ? Sun : Moon,
      title: 'Dark/Light Mode',
      description: `Currently ${isDarkMode ? 'Dark' : 'Light'} mode`,
      rightElement: (
        <Switch 
          checked={isDarkMode}
          onCheckedChange={onToggleDarkMode}
          className={isDarkMode 
            ? "data-[state=checked]:bg-[#BB86FC]" 
            : "data-[state=checked]:bg-blue-500"
          }
        />
      ),
      action: () => onToggleDarkMode && onToggleDarkMode(!isDarkMode)
    },
    {
      icon: Star,
      title: 'Rate & Feedback',
      description: 'Help us improve the app',
      action: () => {
        setIsDrawerOpen(false);
        setShowRateFeedback(true);
      }
    },
    {
      icon: Shield,
      title: 'Security & Data',
      description: 'Manage roles, permissions, data export',
      action: () => {
        setIsDrawerOpen(false);
        setShowSecurityData(true);
      }
    },
    {
      icon: HelpCircle,
      title: 'Help & Support',
      description: 'FAQs, training, and contact support',
      action: () => {
        setIsDrawerOpen(false);
        setShowHelpSupport(true);
      }
    },
    {
      icon: LogOut,
      title: 'Logout',
      description: 'Sign out of your account',
      action: () => {
        console.log('Logging out...');
        setIsDrawerOpen(false);
        // Use the logout handler passed from App.tsx
        if (onLogout) {
          onLogout();
        }
      }
    }
  ];

  // Show Rate & Feedback screen if active
  if (showRateFeedback) {
    return (
      <RateFeedbackScreen 
        onBack={() => setShowRateFeedback(false)}
        onHomeRedirect={() => {
          setShowRateFeedback(false);
          onHomeRedirect?.();
        }}
        isDarkMode={isDarkMode}
      />
    );
  }

  // Show Manage Fleet screen if active
  if (showManageFleet) {
    return (
      <ManageFleetScreen 
        onBack={() => setShowManageFleet(false)}
        isDarkMode={isDarkMode}
      />
    );
  }

  // Show Security & Data screen if active
  if (showSecurityData) {
    return (
      <SecurityDataScreen 
        onBack={() => setShowSecurityData(false)}
        isDarkMode={isDarkMode}
      />
    );
  }

  // Show Help & Support screen if active
  if (showHelpSupport) {
    return (
      <HelpSupportScreen 
        onBack={() => setShowHelpSupport(false)}
        isDarkMode={isDarkMode}
      />
    );
  }

  // Show Language Selection screen if active
  if (showLanguageSelection) {
    return (
      <LanguageSelectionScreen 
        onBack={() => setShowLanguageSelection(false)}
        isDarkMode={isDarkMode}
      />
    );
  }

  // Show App Settings screen if active
  if (showAppSettings) {
    return (
      <AppSettingsScreen 
        onBack={() => setShowAppSettings(false)}
        onLanguageSelect={() => {
          setShowAppSettings(false);
          setShowLanguageSelection(true);
        }}
        isDarkMode={isDarkMode}
      />
    );
  }

  return (
    <div className={`min-h-screen relative transition-colors duration-300 ${
      isDarkMode ? 'bg-[#121212]' : 'bg-gray-50'
    }`}>
      {/* Top Bar */}
      <div className="px-4 py-4">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" className={`p-2 ${
            isDarkMode 
              ? 'text-[#E0E0E0] hover:bg-[#1E1E1E]' 
              : 'text-slate-700 hover:bg-slate-100'
          }`}>
            <ArrowLeft className="w-5 h-5" />
          </Button>

          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setIsDrawerOpen(true)}
            className={`p-2 ${
              isDarkMode 
                ? 'text-[#E0E0E0] hover:bg-[#1E1E1E]' 
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <Menu className="w-6 h-6" />
          </Button>
        </div>
      </div>

      {/* Profile Content */}
      <div className="px-4 pb-6 space-y-6">
        {/* Organization Logo & Info */}
        <Card className={`shadow-xl border-0 transition-colors duration-300 ${
          isDarkMode 
            ? 'bg-gradient-to-br from-[#1E1E1E] to-[#232323]' 
            : 'bg-gradient-to-br from-white to-slate-50'
        }`}>
          <CardContent className="p-8 text-center">
            <div className={`w-24 h-24 mx-auto mb-6 rounded-2xl shadow-lg flex items-center justify-center ${
              isDarkMode 
                ? 'bg-gradient-to-br from-[#BB86FC] to-[#03DAC6]' 
                : 'bg-gradient-to-br from-blue-500 to-purple-600'
            }`}>
              <Building2 className="w-12 h-12 text-black" />
            </div>
            
            <h1 className={`text-2xl font-bold mb-2 ${
              isDarkMode ? 'text-white' : 'text-slate-800'
            }`}>{organizationInfo.name}</h1>
            
            <div className="flex items-center justify-center gap-2 mb-4">
              <Badge className={`${
                isDarkMode 
                  ? 'bg-[#03DAC6]/20 text-[#03DAC6] border-[#03DAC6]/40' 
                  : 'bg-green-100 text-green-700 border-green-200'
              }`}>Active</Badge>
              <Badge className={`${
                isDarkMode 
                  ? 'bg-[#BB86FC]/20 text-[#BB86FC] border-[#BB86FC]/40' 
                  : 'bg-blue-100 text-blue-700 border-blue-200'
              }`}>Verified</Badge>
            </div>

            <p className={`leading-relaxed mb-6 max-w-md mx-auto ${
              isDarkMode ? 'text-[#E0E0E0]' : 'text-slate-600'
            }`}>
              {organizationInfo.aboutUs}
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className={`p-4 rounded-xl transition-colors duration-300 ${
                isDarkMode ? 'bg-[#BB86FC]/20' : 'bg-blue-50'
              }`}>
                <div className="flex items-center gap-2 mb-1">
                  <Calendar className={`w-4 h-4 ${
                    isDarkMode ? 'text-[#BB86FC]' : 'text-blue-600'
                  }`} />
                  <span className={`text-sm ${
                    isDarkMode ? 'text-[#B0B0B0]' : 'text-blue-700'
                  }`}>Established</span>
                </div>
                <p className={`font-bold ${
                  isDarkMode ? 'text-white' : 'text-blue-800'
                }`}>{organizationInfo.established}</p>
              </div>
              
              <div className={`p-4 rounded-xl transition-colors duration-300 ${
                isDarkMode ? 'bg-[#03DAC6]/20' : 'bg-purple-50'
              }`}>
                <div className="flex items-center gap-2 mb-1">
                  <Plane className={`w-4 h-4 ${
                    isDarkMode ? 'text-[#03DAC6]' : 'text-purple-600'
                  }`} />
                  <span className={`text-sm ${
                    isDarkMode ? 'text-[#B0B0B0]' : 'text-purple-700'
                  }`}>Active Fleet</span>
                </div>
                <p className={`font-bold ${
                  isDarkMode ? 'text-white' : 'text-purple-800'
                }`}>{organizationInfo.activeFleet}</p>
              </div>
              
              <div className={`p-4 rounded-xl transition-colors duration-300 ${
                isDarkMode ? 'bg-[#BB86FC]/20' : 'bg-green-50'
              }`}>
                <div className="flex items-center gap-2 mb-1">
                  <Award className={`w-4 h-4 ${
                    isDarkMode ? 'text-[#BB86FC]' : 'text-green-600'
                  }`} />
                  <span className={`text-sm ${
                    isDarkMode ? 'text-[#B0B0B0]' : 'text-green-700'
                  }`}>Missions</span>
                </div>
                <p className={`font-bold ${
                  isDarkMode ? 'text-white' : 'text-green-800'
                }`}>{organizationInfo.missionsCompleted}</p>
              </div>
              
              <div className={`p-4 rounded-xl transition-colors duration-300 ${
                isDarkMode ? 'bg-[#03DAC6]/20' : 'bg-orange-50'
              }`}>
                <div className="flex items-center gap-2 mb-1">
                  <Globe className={`w-4 h-4 ${
                    isDarkMode ? 'text-[#03DAC6]' : 'text-orange-600'
                  }`} />
                  <span className={`text-sm ${
                    isDarkMode ? 'text-[#B0B0B0]' : 'text-orange-700'
                  }`}>Coverage</span>
                </div>
                <p className={`font-bold ${
                  isDarkMode ? 'text-white' : 'text-orange-800'
                }`}>{organizationInfo.countries}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Access Cards */}
        <div className="grid grid-cols-2 gap-4">
          <Card className={`shadow-lg border-0 text-white ${
            isDarkMode 
              ? 'bg-gradient-to-br from-[#BB86FC] to-[#BB86FC]/80' 
              : 'bg-gradient-to-br from-blue-500 to-blue-600'
          }`}>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-black/20 rounded-lg flex items-center justify-center">
                  <Activity className="w-5 h-5 text-black" />
                </div>
                <span className="font-semibold text-black">Fleet Status</span>
              </div>
              <p className={`text-sm ${
                isDarkMode ? 'text-black/70' : 'text-blue-100'
              }`}>12 Active • 3 Maintenance</p>
            </CardContent>
          </Card>

          <Card className={`shadow-lg border-0 text-white ${
            isDarkMode 
              ? 'bg-gradient-to-br from-[#03DAC6] to-[#03DAC6]/80' 
              : 'bg-gradient-to-br from-green-500 to-green-600'
          }`}>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-black/20 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-black" />
                </div>
                <span className="font-semibold text-black">Team Size</span>
              </div>
              <p className={`text-sm ${
                isDarkMode ? 'text-black/70' : 'text-green-100'
              }`}>24 Operators • 8 Pilots</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Sliding Drawer */}
      {isDrawerOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
            onClick={() => setIsDrawerOpen(false)}
          />
          
          {/* Drawer */}
          <div className={`fixed top-0 right-0 h-full w-80 z-50 transform transition-all duration-300 ${
            isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
          } ${
            isDarkMode 
              ? 'bg-gradient-to-b from-[#1E1E1E] to-[#232323]' 
              : 'bg-gradient-to-b from-white to-slate-50'
          }`}>
            {/* Drawer Header */}
            <div className={`p-6 ${
              isDarkMode ? 'border-b border-[#3A3A3A]' : 'border-b border-slate-200'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <h2 className={`text-xl font-semibold ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}>Account</h2>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setIsDrawerOpen(false)}
                  className={`p-2 ${
                    isDarkMode 
                      ? 'text-[#E0E0E0] hover:bg-[#2C2C2C]' 
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
              
              <div className="flex items-center gap-3">
                <Avatar className="w-12 h-12">
                  <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW58ZW58MXx8fHwxNTc3NzczNjI4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" />
                  <AvatarFallback>
                    <User className="w-6 h-6" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className={`font-medium ${
                    isDarkMode ? 'text-white' : 'text-slate-900'
                  }`}>{userInfo.name}</p>
                  <p className={`text-sm ${
                    isDarkMode ? 'text-[#B0B0B0]' : 'text-slate-600'
                  }`}>{userInfo.role}</p>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="p-6 space-y-2 overflow-y-auto h-full pb-32">
              {menuItems.map((item, idx) => (
                <MenuItem
                  key={idx}
                  icon={item.icon}
                  title={item.title}
                  description={item.description}
                  action={item.action}
                  rightElement={item.rightElement}
                  badge={item.badge}
                  isDarkMode={isDarkMode}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}