import { Button } from './ui/button';
import { Plus } from 'lucide-react';

interface DesktopHeaderProps {
  title: string;
  isDarkMode?: boolean;
  onAddClick?: () => void;
}

export function DesktopHeader({ title, isDarkMode = false, onAddClick }: DesktopHeaderProps) {
  return (
    <div className={`sticky top-0 z-20 border-b transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-[#121212]/95 border-[#3A3A3A] backdrop-blur-sm' 
        : 'bg-white/95 border-gray-200 backdrop-blur-sm'
    }`}>
      <div className="flex items-center justify-between px-8 py-6">
        <div>
          <h1 className={`text-2xl font-semibold ${
            isDarkMode ? 'text-white' : 'text-slate-900'
          }`}>
            {title}
          </h1>
          <p className={`text-sm mt-1 ${
            isDarkMode ? 'text-[#B0B0B0]' : 'text-slate-600'
          }`}>
            Manage and monitor your active drone operations
          </p>
        </div>
        
        {onAddClick && (
          <Button 
            onClick={onAddClick}
            size="lg"
            className={`px-8 py-4 rounded-xl shadow-lg transition-all duration-200 hover:scale-105 ${
              isDarkMode 
                ? 'bg-[#03DAC6] hover:bg-[#03DAC6]/90 text-black shadow-[#03DAC6]/30' 
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/30'
            }`}
          >
            <Plus className="w-6 h-6 mr-3" />
            <span className="text-lg font-semibold">Add Mission</span>
          </Button>
        )}
      </div>
    </div>
  );
}