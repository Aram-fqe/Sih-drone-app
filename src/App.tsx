import { useState, useEffect } from 'react';
import { TopBar } from './components/TopBar';
import { MissionCard } from './components/MissionCard';
import { AlertsSection } from './components/AlertsSection';
import { BottomNavbar } from './components/BottomNavbar';
import { DesktopSidebar } from './components/DesktopSidebar';
import { DesktopHeader } from './components/DesktopHeader';
import { ReportsScreen } from './components/ReportsScreen';
import { ChatbotScreen } from './components/ChatbotScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { OnboardingFlow } from './components/OnboardingFlow';
import { AuthFlow } from './components/AuthFlow';
import { SOSPanel } from './components/SOSPanel';
import { AddMissionModal } from './components/AddMissionModal';
import { Button } from './components/ui/button';
import { Plus } from 'lucide-react';
import { useDesktop } from './components/ui/use-desktop';
import { Toaster } from './components/ui/sonner';

const initialMockMissions = [
  {
    droneId: 'DRONE-001',
    status: 'In Transit' as const,
    mission: {
      droneModel: 'MQ-9 Guardian',
      payload: [
        { name: 'Medical Supplies', weight: '2.5 kg', priority: 'High' as const },
        { name: 'Emergency Radio', weight: '0.8 kg', priority: 'Medium' as const }
      ],
      recipient: {
        name: 'Dr. Sarah Williams',
        contact: '+1 (555) 123-4567',
        location: 'Emergency Camp Alpha, Grid: 42.3601° N, 71.0589° W'
      },
      telemetry: {
        battery: 78,
        altitude: '245 ft',
        speed: '35 mph',
        connectivity: 'Strong' as const
      },
      liveLocation: {
        coordinates: '42.3598° N, 71.0595° W',
        lastUpdate: '2 sec ago',
        distanceToDestination: '2.3 km'
      }
    }
  },
  {
    droneId: 'DRONE-002',
    status: 'Delivering' as const,
    mission: {
      droneModel: 'DJI Matrice 300',
      payload: [
        { name: 'Water Purification Kit', weight: '1.2 kg', priority: 'High' as const },
        { name: 'Food Rations', weight: '3.0 kg', priority: 'Medium' as const },
        { name: 'Solar Charger', weight: '0.5 kg', priority: 'Low' as const }
      ],
      recipient: {
        name: 'Commander Jake Morrison',
        contact: '+1 (555) 987-6543',
        location: 'Rescue Station Beta, Grid: 42.3584° N, 71.0636° W'
      },
      telemetry: {
        battery: 92,
        altitude: '180 ft',
        speed: '28 mph',
        connectivity: 'Strong' as const
      },
      liveLocation: {
        coordinates: '42.3585° N, 71.0634° W',
        lastUpdate: 'Live',
        distanceToDestination: '150 m'
      }
    }
  },
  {
    droneId: 'DRONE-003',
    status: 'Returning' as const,
    mission: {
      droneModel: 'Autel EVO II Pro',
      payload: [
        { name: 'Surveillance Equipment', weight: '1.8 kg', priority: 'Medium' as const }
      ],
      recipient: {
        name: 'Lt. Maria Rodriguez',
        contact: '+1 (555) 456-7890',
        location: 'Forward Operating Base Charlie'
      },
      telemetry: {
        battery: 45,
        altitude: '320 ft',
        speed: '42 mph',
        connectivity: 'Weak' as const
      },
      liveLocation: {
        coordinates: '42.3612° N, 71.0578° W',
        lastUpdate: '5 sec ago',
        distanceToDestination: '1.8 km'
      }
    }
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Initialize from localStorage or default to false
    const saved = localStorage.getItem('droneops-dark-mode');
    return saved ? JSON.parse(saved) : false;
  });
  
  // App flow state
  const [appState, setAppState] = useState<'onboarding' | 'auth' | 'main'>(() => {
    // Check if user has completed onboarding and auth
    const hasCompletedOnboarding = localStorage.getItem('droneops-onboarding-complete');
    const hasCompletedAuth = localStorage.getItem('droneops-auth-complete');
    
    if (!hasCompletedOnboarding) return 'onboarding';
    if (!hasCompletedAuth) return 'auth';
    return 'main';
  });

  // Desktop/mobile detection
  const isDesktop = useDesktop();
  
  // SOS Panel state
  const [showSOSPanel, setShowSOSPanel] = useState(false);
  
  // Add Mission Modal state
  const [showAddMissionModal, setShowAddMissionModal] = useState(false);
  
  // Missions state
  const [missions, setMissions] = useState(initialMockMissions);

  // Apply dark mode class to document and save to localStorage
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('droneops-dark-mode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  // Handle onboarding completion
  const handleOnboardingComplete = () => {
    localStorage.setItem('droneops-onboarding-complete', 'true');
    setAppState('auth');
  };

  // Handle authentication completion
  const handleAuthComplete = () => {
    localStorage.setItem('droneops-auth-complete', 'true');
    setAppState('main');
  };

  // Handle logout - only clear auth, keep onboarding completion
  const handleLogout = () => {
    localStorage.removeItem('droneops-auth-complete');
    setAppState('auth');
  };

  // Handle add mission click
  const handleAddMission = () => {
    setShowAddMissionModal(true);
  };

  // Handle mission creation
  const handleMissionCreated = (newMission: any) => {
    setMissions(prev => [newMission, ...prev]);
    setShowAddMissionModal(false);
  };

  // Handle SOS button click
  const handleSOSClick = () => {
    setShowSOSPanel(true);
  };

  const renderMobileContent = () => {
    switch (activeTab) {
      case 'reports':
        return <ReportsScreen isDarkMode={isDarkMode} />;
      case 'chat':
        return <ChatbotScreen isDarkMode={isDarkMode} />;
      case 'profile':
        return <ProfileScreen onHomeRedirect={() => setActiveTab('dashboard')} isDarkMode={isDarkMode} onToggleDarkMode={setIsDarkMode} onLogout={handleLogout} />;
      case 'dashboard':
      default:
        return (
          <div className="pb-4 relative">
            {/* Mobile Header with Add Button */}
            <div className="px-4 py-4 border-b border-inherit">
              <div className="flex items-center justify-between">
                <h2 className={`text-lg font-semibold ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}>Active Missions</h2>
                <Button 
                  onClick={handleAddMission}
                  size="sm"
                  className={`px-4 py-2 rounded-lg shadow-lg transition-all duration-200 hover:scale-105 ${
                    isDarkMode 
                      ? 'bg-[#03DAC6] hover:bg-[#03DAC6]/90 text-black shadow-[#03DAC6]/30' 
                      : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/30'
                  }`}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add
                </Button>
              </div>
            </div>

            {/* Active Missions Section */}
            <div className="py-4">
              <div className="px-4">
                {missions.map((mission, idx) => (
                  <MissionCard
                    key={mission.droneId}
                    droneId={mission.droneId}
                    status={mission.status}
                    mission={mission.mission}
                    isDarkMode={isDarkMode}
                  />
                ))}
              </div>
            </div>

            {/* Alerts & Notifications */}
            <div className="mb-20">
              <AlertsSection isDarkMode={isDarkMode} />
            </div>
          </div>
        );
    }
  };

  const renderDesktopContent = () => {
    const contentClassName = "flex-1 min-h-screen";
    
    switch (activeTab) {
      case 'reports':
        return (
          <div className={contentClassName}>
            <DesktopHeader title="Report Stats" isDarkMode={isDarkMode} />
            <div className="p-8">
              <ReportsScreen isDarkMode={isDarkMode} />
            </div>
          </div>
        );
      case 'chat':
        return (
          <div className={contentClassName}>
            <DesktopHeader title="AI Chat Bot" isDarkMode={isDarkMode} />
            <div className="p-8">
              <ChatbotScreen isDarkMode={isDarkMode} />
            </div>
          </div>
        );
      case 'profile':
        return (
          <div className={contentClassName}>
            <DesktopHeader title="Profile" isDarkMode={isDarkMode} />
            <div className="p-8">
              <ProfileScreen onHomeRedirect={() => setActiveTab('dashboard')} isDarkMode={isDarkMode} onToggleDarkMode={setIsDarkMode} onLogout={handleLogout} />
            </div>
          </div>
        );
      case 'dashboard':
      default:
        return (
          <div className={contentClassName}>
            <DesktopHeader 
              title="Active Missions" 
              isDarkMode={isDarkMode} 
              onAddClick={handleAddMission}
            />
            <div className="p-8">
              {/* Mission Cards Grid */}
              <div className="space-y-6 mb-8">
                {missions.map((mission, idx) => (
                  <MissionCard
                    key={mission.droneId}
                    droneId={mission.droneId}
                    status={mission.status}
                    mission={mission.mission}
                    isDarkMode={isDarkMode}
                  />
                ))}
              </div>

              {/* System Alerts Section */}
              <div className="max-w-4xl">
                <AlertsSection isDarkMode={isDarkMode} />
              </div>
            </div>
          </div>
        );
    }
  };

  // Show onboarding flow
  if (appState === 'onboarding') {
    return <OnboardingFlow onComplete={handleOnboardingComplete} isDarkMode={isDarkMode} />;
  }

  // Show authentication flow
  if (appState === 'auth') {
    return <AuthFlow onAuthComplete={handleAuthComplete} isDarkMode={isDarkMode} />;
  }

  // Show main app
  if (isDesktop) {
    return (
      <div className={`min-h-screen transition-colors duration-300 ${
        isDarkMode ? 'bg-[#121212] text-white' : 'bg-gray-50 text-slate-900'
      }`}>
        {/* Desktop Layout */}
        <div className="flex">
          {/* Left Sidebar */}
          <DesktopSidebar 
            activeTab={activeTab} 
            onTabChange={setActiveTab} 
            isDarkMode={isDarkMode}
            onSOSClick={handleSOSClick}
          />
          
          {/* Main Content Area */}
          <div className="flex-1 ml-80 min-h-screen">
            {renderDesktopContent()}
          </div>
        </div>

        {/* SOS Panel */}
        {showSOSPanel && (
          <SOSPanel 
            onClose={() => setShowSOSPanel(false)} 
            isDarkMode={isDarkMode} 
          />
        )}

        {/* Add Mission Modal */}
        <AddMissionModal
          isOpen={showAddMissionModal}
          onClose={() => setShowAddMissionModal(false)}
          onMissionCreated={handleMissionCreated}
          isDarkMode={isDarkMode}
          existingMissions={missions}
        />

        {/* Toast Notifications */}
        <Toaster 
          theme={isDarkMode ? 'dark' : 'light'}
          position="top-right"
        />
      </div>
    );
  }

  // Mobile Layout
  return (
    <div className={`min-h-screen pb-20 transition-colors duration-300 ${
      isDarkMode ? 'bg-[#121212] text-white' : 'bg-gray-50 text-slate-900'
    }`}>
      <TopBar isDarkMode={isDarkMode} onSOSClick={handleSOSClick} />
      {renderMobileContent()}
      <BottomNavbar activeTab={activeTab} onTabChange={setActiveTab} isDarkMode={isDarkMode} />
      
      {/* SOS Panel */}
      {showSOSPanel && (
        <SOSPanel 
          onClose={() => setShowSOSPanel(false)} 
          isDarkMode={isDarkMode} 
        />
      )}

      {/* Add Mission Modal */}
      <AddMissionModal
        isOpen={showAddMissionModal}
        onClose={() => setShowAddMissionModal(false)}
        onMissionCreated={handleMissionCreated}
        isDarkMode={isDarkMode}
        existingMissions={missions}
      />

      {/* Toast Notifications */}
      <Toaster 
        theme={isDarkMode ? 'dark' : 'light'}
        position="top-right"
      />
    </div>
  );
}