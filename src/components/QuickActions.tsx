import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Rocket, MapPin, Radio, MessageSquare } from 'lucide-react';

const actions = [
  {
    icon: Rocket,
    title: 'Deploy Drone',
    subtitle: 'Create Mission',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    hoverColor: 'hover:bg-blue-100'
  },
  {
    icon: MapPin,
    title: 'Track Deliveries',
    subtitle: 'Live Map',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    hoverColor: 'hover:bg-green-100'
  },
  {
    icon: Radio,
    title: 'Drone Status',
    subtitle: 'Telemetry',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    hoverColor: 'hover:bg-purple-100'
  },
  {
    icon: MessageSquare,
    title: 'Team Chat',
    subtitle: 'Communicate',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    hoverColor: 'hover:bg-orange-100'
  }
];

export function QuickActions() {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-3 px-4">Quick Actions</h2>
      <div className="grid grid-cols-2 gap-3 px-4">
        {actions.map((action, idx) => (
          <Card key={idx} className="border-2 border-gray-100 hover:border-gray-200 transition-all">
            <CardContent className="p-4">
              <Button
                variant="ghost"
                className={`w-full h-20 flex flex-col items-center justify-center gap-2 ${action.bgColor} ${action.hoverColor} transition-all`}
              >
                <action.icon className={`w-6 h-6 ${action.color}`} />
                <div className="text-center">
                  <p className="font-semibold text-sm">{action.title}</p>
                  <p className="text-xs text-gray-500">{action.subtitle}</p>
                </div>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}