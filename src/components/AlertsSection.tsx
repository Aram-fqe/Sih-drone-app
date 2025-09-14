import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { AlertTriangle, CloudRain, Wind, Thermometer, ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';

const alerts = [
  {
    id: 1,
    type: 'Weather',
    severity: 'High' as const,
    title: 'Storm Warning in Zone A',
    description: 'Severe thunderstorm approaching deployment area. Wind speeds up to 45 mph expected.',
    time: '2 min ago',
    icon: CloudRain
  },
  {
    id: 2,
    type: 'System',
    severity: 'Medium' as const,
    title: 'High Wind Alert',
    description: 'Wind speeds exceeding safe operation limits in sectors 3 and 4.',
    time: '5 min ago',
    icon: Wind
  },
  {
    id: 3,
    type: 'Environmental',
    severity: 'Low' as const,
    title: 'Temperature Advisory',
    description: 'Battery performance may be affected by low temperatures in northern regions.',
    time: '15 min ago',
    icon: Thermometer
  }
];

interface AlertsSectionProps {
  isDarkMode?: boolean;
}

const getSeverityStyles = (severity: 'High' | 'Medium' | 'Low', isDarkMode: boolean) => {
  switch (severity) {
    case 'High':
      return isDarkMode 
        ? {
            bg: 'bg-gradient-to-r from-[#CF6679]/20 to-[#CF6679]/10',
            border: 'border-[#CF6679]/30',
            text: 'text-[#CF6679]'
          }
        : {
            bg: 'bg-gradient-to-r from-red-50 to-red-100',
            border: 'border-red-300',
            text: 'text-red-600'
          };
    case 'Medium':
      return isDarkMode 
        ? {
            bg: 'bg-gradient-to-r from-[#FFB74D]/20 to-[#FFB74D]/10',
            border: 'border-[#FFB74D]/30',
            text: 'text-[#FFB74D]'
          }
        : {
            bg: 'bg-gradient-to-r from-orange-50 to-amber-100',
            border: 'border-orange-300',
            text: 'text-orange-600'
          };
    case 'Low':
      return isDarkMode 
        ? {
            bg: 'bg-gradient-to-r from-[#03DAC6]/20 to-[#03DAC6]/10',
            border: 'border-[#03DAC6]/30',
            text: 'text-[#03DAC6]'
          }
        : {
            bg: 'bg-gradient-to-r from-green-50 to-emerald-100',
            border: 'border-green-300',
            text: 'text-green-600'
          };
  }
};

export function AlertsSection({ isDarkMode = false }: AlertsSectionProps) {
  const [expanded, setExpanded] = useState(false);

  const getSeverityBadgeVariant = (severity: 'High' | 'Medium' | 'Low') => {
    switch (severity) {
      case 'High': return 'destructive';
      case 'Medium': return 'default';
      case 'Low': return 'secondary';
    }
  };

  return (
    <div>
      {/* Header - Always Visible */}
      <Button
        variant="ghost"
        onClick={() => setExpanded(!expanded)}
        className={`w-full p-4 rounded-lg mb-3 border-2 transition-all duration-300 ease-in-out hover:scale-[1.02] ${
          isDarkMode 
            ? 'bg-[#1E1E1E] border-[#3A3A3A] hover:border-[#BB86FC]/50 text-white hover:bg-[#2C2C2C]' 
            : 'bg-white border-gray-200 hover:border-gray-300 text-slate-900 hover:bg-gray-50'
        } shadow-lg`}
      >
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
            <AlertTriangle className={`w-5 h-5 ${
              isDarkMode ? 'text-[#CF6679]' : 'text-red-600'
            }`} />
            <span className="font-semibold">System Alerts ({alerts.length})</span>
          </div>
          <div className="flex items-center gap-2">
            {expanded ? (
              <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${
                isDarkMode ? 'text-[#B0B0B0]' : 'text-gray-500'
              }`} />
            ) : (
              <ChevronRight className={`w-5 h-5 transition-transform duration-300 ${
                isDarkMode ? 'text-[#B0B0B0]' : 'text-gray-500'
              }`} />
            )}
          </div>
        </div>
      </Button>

      {/* Expandable Content */}
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
        expanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="space-y-3 pb-3">
          {alerts.map((alert) => {
            const styles = getSeverityStyles(alert.severity, isDarkMode);
            return (
              <Card key={alert.id} className={`border-2 shadow-lg transition-all duration-200 hover:scale-[1.02] ${
                isDarkMode 
                  ? 'bg-[#1E1E1E] hover:shadow-[0_0_20px_rgba(187,134,252,0.2)]' 
                  : 'bg-white hover:shadow-xl'
              } ${styles.bg} ${styles.border}`}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      isDarkMode 
                        ? alert.severity === 'High' 
                          ? 'bg-[#CF6679]/30' 
                          : alert.severity === 'Medium' 
                            ? 'bg-[#FFB74D]/30' 
                            : 'bg-[#03DAC6]/30'
                        : alert.severity === 'High' 
                          ? 'bg-red-100' 
                          : alert.severity === 'Medium' 
                            ? 'bg-orange-100' 
                            : 'bg-green-100'
                    }`}>
                      <alert.icon className={`w-5 h-5 ${styles.text}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className={`font-semibold ${
                          isDarkMode ? 'text-white' : 'text-slate-900'
                        }`}>{alert.title}</h4>
                        <Badge variant={getSeverityBadgeVariant(alert.severity)} className={
                          isDarkMode && alert.severity === 'High' 
                            ? 'bg-[#CF6679] text-white' 
                            : isDarkMode && alert.severity === 'Medium'
                              ? 'bg-[#FFB74D] text-black'
                              : isDarkMode && alert.severity === 'Low'
                                ? 'bg-[#03DAC6] text-black'
                                : ''
                        }>
                          {alert.severity}
                        </Badge>
                      </div>
                      <p className={`text-sm mb-2 ${
                        isDarkMode ? 'text-[#E0E0E0]' : 'text-slate-700'
                      }`}>{alert.description}</p>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs ${
                          isDarkMode ? 'text-[#B0B0B0]' : 'text-slate-500'
                        }`}>{alert.type}</span>
                        <span className={`text-xs ${
                          isDarkMode ? 'text-[#B0B0B0]' : 'text-slate-400'
                        }`}>•</span>
                        <span className={`text-xs ${
                          isDarkMode ? 'text-[#B0B0B0]' : 'text-slate-500'
                        }`}>{alert.time}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}