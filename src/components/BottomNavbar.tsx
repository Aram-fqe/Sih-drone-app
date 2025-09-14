import { Home, BarChart3, MessageCircle, User } from 'lucide-react';
import { Button } from './ui/button';

const navItems = [
  {
    icon: Home,
    title: 'Dashboard',
    active: true
  },
  {
    icon: BarChart3,
    title: 'Report Stats',
    active: false
  },
  {
    icon: MessageCircle,
    title: 'AI Chat Bot',
    active: false
  },
  {
    icon: User,
    title: 'Profile',
    active: false
  }
];

interface BottomNavbarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isDarkMode?: boolean;
}

export function BottomNavbar({ activeTab, onTabChange, isDarkMode = false }: BottomNavbarProps) {
  const navItems = [
    {
      id: 'dashboard',
      icon: Home,
      title: 'Dashboard'
    },
    {
      id: 'reports',
      icon: BarChart3,
      title: 'Report Stats'
    },
    {
      id: 'chat',
      icon: MessageCircle,
      title: 'AI Chat Bot'
    },
    {
      id: 'profile',
      icon: User,
      title: 'Profile'
    }
  ];

  return (
    <div className={`fixed bottom-0 left-0 right-0 border-t px-4 py-2 safe-area-pb transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-[#1E1E1E] border-[#3A3A3A]' 
        : 'bg-white border-gray-200'
    }`}>
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => (
          <Button
            key={item.id}
            variant="ghost"
            onClick={() => onTabChange(item.id)}
            className={`flex flex-col items-center gap-1 py-2 px-3 h-auto min-h-12 transition-colors duration-200 ${
              activeTab === item.id
                ? isDarkMode
                  ? 'text-[#BB86FC] bg-[#BB86FC]/20 hover:bg-[#BB86FC]/30'
                  : 'text-blue-600 bg-blue-50 hover:bg-blue-100'
                : isDarkMode
                  ? 'text-[#E0E0E0] hover:text-white hover:bg-[#2C2C2C]'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            <item.icon className={`w-5 h-5 ${
              activeTab === item.id 
                ? isDarkMode ? 'text-[#BB86FC]' : 'text-blue-600'
                : isDarkMode ? 'text-[#E0E0E0]' : 'text-gray-500'
            }`} />
            <span className="text-xs font-medium">{item.title}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}