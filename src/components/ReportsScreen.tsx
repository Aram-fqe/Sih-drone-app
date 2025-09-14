import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  Package, 
  CheckCircle, 
  Clock, 
  Plane, 
  XCircle, 
  TrendingUp, 
  Activity, 
  MapPin,
  AlertTriangle,
  Battery,
  Calendar,
  Filter
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { ImageWithFallback } from './figma/ImageWithFallback';

const deliveryData = [
  { month: 'Jan', successful: 245, failed: 12 },
  { month: 'Feb', successful: 312, failed: 8 },
  { month: 'Mar', successful: 428, failed: 15 },
  { month: 'Apr', successful: 389, failed: 7 },
  { month: 'May', successful: 467, failed: 23 },
  { month: 'Jun', successful: 523, failed: 11 }
];

const responseTimeData = [
  { month: 'Jan', avgTime: 28 },
  { month: 'Feb', avgTime: 25 },
  { month: 'Mar', avgTime: 22 },
  { month: 'Apr', avgTime: 19 },
  { month: 'May', avgTime: 17 },
  { month: 'Jun', avgTime: 15 }
];

const droneUtilization = [
  { name: 'Active', value: 68, color: '#10b981' },
  { name: 'Maintenance', value: 15, color: '#f59e0b' },
  { name: 'Idle', value: 17, color: '#6b7280' }
];

const missionHistoryData = {
  daily: [
    { date: 'Jun 15, 2024', missions: 23, delivered: 22, failed: 1, confirmation: '95.7%' },
    { date: 'Jun 14, 2024', missions: 28, delivered: 27, failed: 1, confirmation: '96.4%' },
    { date: 'Jun 13, 2024', missions: 31, delivered: 30, failed: 1, confirmation: '96.8%' },
    { date: 'Jun 12, 2024', missions: 19, delivered: 19, failed: 0, confirmation: '100%' },
    { date: 'Jun 11, 2024', missions: 25, delivered: 24, failed: 1, confirmation: '96.0%' },
    { date: 'Jun 10, 2024', missions: 22, delivered: 21, failed: 1, confirmation: '95.5%' }
  ],
  weekly: [
    { date: 'Week of Jun 10-16, 2024', missions: 148, delivered: 143, failed: 5, confirmation: '96.6%' },
    { date: 'Week of Jun 3-9, 2024', missions: 134, delivered: 131, failed: 3, confirmation: '97.8%' },
    { date: 'Week of May 27-Jun 2, 2024', missions: 156, delivered: 152, failed: 4, confirmation: '97.4%' },
    { date: 'Week of May 20-26, 2024', missions: 142, delivered: 138, failed: 4, confirmation: '97.2%' },
    { date: 'Week of May 13-19, 2024', missions: 128, delivered: 125, failed: 3, confirmation: '97.7%' }
  ],
  monthly: [
    { date: 'Jun 2024', missions: 534, delivered: 523, failed: 11, confirmation: '98.2%' },
    { date: 'May 2024', missions: 490, delivered: 467, failed: 23, confirmation: '96.1%' },
    { date: 'Apr 2024', missions: 396, delivered: 389, failed: 7, confirmation: '99.4%' },
    { date: 'Mar 2024', missions: 443, delivered: 428, failed: 15, confirmation: '97.8%' },
    { date: 'Feb 2024', missions: 320, delivered: 312, failed: 8, confirmation: '98.9%' }
  ],
  yearly: [
    { date: '2024', missions: 2183, delivered: 2119, failed: 64, confirmation: '97.1%' },
    { date: '2023', missions: 1856, delivered: 1798, failed: 58, confirmation: '96.9%' },
    { date: '2022', missions: 1432, delivered: 1389, failed: 43, confirmation: '97.0%' },
    { date: '2021', missions: 987, delivered: 952, failed: 35, confirmation: '96.5%' }
  ]
};

const topItems = [
  { name: 'Medical Supplies', count: 156, percentage: 29.8 },
  { name: 'Food Rations', count: 134, percentage: 25.6 },
  { name: 'Water Purification', count: 98, percentage: 18.7 },
  { name: 'Emergency Equipment', count: 87, percentage: 16.6 },
  { name: 'Communication Devices', count: 48, percentage: 9.3 }
];

interface ReportsScreenProps {
  isDarkMode?: boolean;
}

export function ReportsScreen({ isDarkMode = false }: ReportsScreenProps) {
  const [dateFilter, setDateFilter] = useState('month');
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [historyFilter, setHistoryFilter] = useState('monthly');

  const kpiCards = [
    {
      title: 'Total Deliveries',
      value: '523',
      subtitle: 'This Month',
      icon: Package,
      change: '+12.3%',
      isPositive: true
    },
    {
      title: 'Success Rate',
      value: '98.2%',
      subtitle: 'Successful Deliveries',
      icon: CheckCircle,
      change: '+2.1%',
      isPositive: true
    },
    {
      title: 'Avg Delivery Time',
      value: '15 min',
      subtitle: 'Response Time',
      icon: Clock,
      change: '-3.2 min',
      isPositive: true
    },
    {
      title: 'Drones Deployed',
      value: '12',
      subtitle: 'Currently Active',
      icon: Plane,
      change: '+2',
      isPositive: true
    },
    {
      title: 'Failed Missions',
      value: '11',
      subtitle: 'This Month',
      icon: XCircle,
      change: '-4',
      isPositive: true
    }
  ];

  const disasterZones = [
    { name: 'Hurricane Zone Alpha', deliveries: 87, status: 'high', coords: '25%,30%' },
    { name: 'Earthquake Beta Region', deliveries: 134, status: 'critical', coords: '60%,45%' },
    { name: 'Flood Zone Gamma', deliveries: 72, status: 'medium', coords: '40%,70%' },
    { name: 'Wildfire Delta Area', deliveries: 156, status: 'critical', coords: '70%,25%' },
    { name: 'Storm Charlie Sector', deliveries: 45, status: 'low', coords: '20%,60%' }
  ];

  return (
    <div className={`pb-4 transition-colors duration-300 ${
      isDarkMode ? 'bg-[#121212]' : 'bg-gray-50'
    }`}>
      {/* Header */}
      <div className={`px-4 py-6 ${
        isDarkMode 
          ? 'bg-gradient-to-r from-[#1E1E1E] to-[#232323]' 
          : 'bg-gradient-to-r from-slate-800 to-slate-700'
      }`}>
        <div className="flex items-center justify-between mb-4">
          <h1 className={`text-xl font-semibold ${
            isDarkMode ? 'text-white' : 'text-white'
          }`}>Reports & Analytics</h1>
          <div className="flex items-center gap-2">
            <Filter className={`w-4 h-4 ${
              isDarkMode ? 'text-[#E0E0E0]' : 'text-white'
            }`} />
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className={`w-32 ${
                isDarkMode 
                  ? 'bg-[#BB86FC]/10 border-[#BB86FC]/30 text-[#E0E0E0]' 
                  : 'bg-white/10 border-white/20 text-white'
              }`}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent className={isDarkMode ? 'bg-[#1E1E1E] border-[#3A3A3A]' : ''}>
                <SelectItem value="day">Day</SelectItem>
                <SelectItem value="week">Week</SelectItem>
                <SelectItem value="month">Month</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="px-4 -mt-2">
        {/* KPI Summary Cards */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {kpiCards.map((kpi, idx) => (
            <Card 
              key={idx} 
              className={`shadow-lg border-0 transition-all duration-300 hover:scale-105 cursor-pointer ${
                isDarkMode 
                  ? 'bg-[#1E1E1E] hover:shadow-[0_0_20px_rgba(187,134,252,0.3)]' 
                  : 'bg-gradient-to-br from-white to-slate-50 hover:shadow-xl'
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    isDarkMode ? 'bg-[#BB86FC]/20' : 'bg-blue-50'
                  }`}>
                    <kpi.icon className={`w-5 h-5 ${
                      isDarkMode ? 'text-[#BB86FC]' : 'text-blue-600'
                    }`} />
                  </div>
                  <Badge 
                    className={`text-xs ${
                      kpi.isPositive 
                        ? isDarkMode 
                          ? 'bg-[#03DAC6]/20 text-[#03DAC6] border-[#03DAC6]/40' 
                          : 'bg-green-100 text-green-700'
                        : isDarkMode
                          ? 'bg-[#CF6679]/20 text-[#CF6679] border-[#CF6679]/40'
                          : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {kpi.change}
                  </Badge>
                </div>
                <div>
                  <p className={`text-2xl font-bold ${
                    isDarkMode ? 'text-white' : 'text-slate-800'
                  }`}>{kpi.value}</p>
                  <p className={`text-xs ${
                    isDarkMode ? 'text-[#B0B0B0]' : 'text-slate-600'
                  }`}>{kpi.subtitle}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Section */}
        <div className="space-y-6">
          {/* Delivery Success Rate Chart */}
          <Card className={`shadow-lg border-0 transition-all duration-300 hover:scale-[1.02] ${
            isDarkMode 
              ? 'bg-[#1E1E1E] hover:shadow-[0_0_20px_rgba(187,134,252,0.2)]' 
              : 'bg-white hover:shadow-xl'
          }`}>
            <CardHeader>
              <CardTitle className={`flex items-center gap-2 ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}>
                <TrendingUp className={`w-5 h-5 ${
                  isDarkMode ? 'text-[#03DAC6]' : 'text-green-600'
                }`} />
                Delivery Success Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={deliveryData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? "#3A3A3A" : "#f1f5f9"} />
                  <XAxis 
                    dataKey="month" 
                    tick={{ fontSize: 12, fill: isDarkMode ? '#B0B0B0' : '#64748b' }} 
                  />
                  <YAxis 
                    tick={{ fontSize: 12, fill: isDarkMode ? '#B0B0B0' : '#64748b' }} 
                  />
                  <Bar 
                    dataKey="successful" 
                    fill={isDarkMode ? "#BB86FC" : "#10b981"} 
                    radius={[4, 4, 0, 0]} 
                  />
                  <Bar 
                    dataKey="failed" 
                    fill={isDarkMode ? "#CF6679" : "#ef4444"} 
                    radius={[4, 4, 0, 0]} 
                  />
                </BarChart>
              </ResponsiveContainer>
              <div className="flex items-center justify-center gap-6 mt-3">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${
                    isDarkMode ? 'bg-[#BB86FC]' : 'bg-green-500'
                  }`}></div>
                  <span className={`text-sm ${
                    isDarkMode ? 'text-[#E0E0E0]' : 'text-slate-600'
                  }`}>Successful</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${
                    isDarkMode ? 'bg-[#CF6679]' : 'bg-red-500'
                  }`}></div>
                  <span className={`text-sm ${
                    isDarkMode ? 'text-[#E0E0E0]' : 'text-slate-600'
                  }`}>Failed</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Drone Utilization */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className={`shadow-lg border-0 transition-all duration-300 hover:scale-[1.02] ${
              isDarkMode 
                ? 'bg-[#1E1E1E] hover:shadow-[0_0_20px_rgba(187,134,252,0.2)]' 
                : 'bg-white hover:shadow-xl'
            }`}>
              <CardHeader>
                <CardTitle className={`flex items-center gap-2 ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}>
                  <Activity className={`w-5 h-5 ${
                    isDarkMode ? 'text-[#BB86FC]' : 'text-blue-600'
                  }`} />
                  Drone Utilization
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={160}>
                  <PieChart>
                    <Pie
                      data={droneUtilization.map(item => ({
                        ...item,
                        color: isDarkMode 
                          ? item.name === 'Active' ? '#BB86FC' 
                            : item.name === 'Maintenance' ? '#FFB74D'
                            : '#6b7280'
                          : item.color
                      }))}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={70}
                      dataKey="value"
                    >
                      {droneUtilization.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={isDarkMode 
                            ? entry.name === 'Active' ? '#BB86FC' 
                              : entry.name === 'Maintenance' ? '#FFB74D'
                              : '#6b7280'
                            : entry.color
                          } 
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-2">
                  {droneUtilization.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ 
                            backgroundColor: isDarkMode 
                              ? item.name === 'Active' ? '#BB86FC' 
                                : item.name === 'Maintenance' ? '#FFB74D'
                                : '#6b7280'
                              : item.color 
                          }}
                        ></div>
                        <span className={`text-sm ${
                          isDarkMode ? 'text-[#E0E0E0]' : 'text-slate-600'
                        }`}>{item.name}</span>
                      </div>
                      <span className={`text-sm font-medium ${
                        isDarkMode ? 'text-white' : 'text-slate-900'
                      }`}>{item.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Response Time Chart */}
            <Card className={`shadow-lg border-0 transition-all duration-300 hover:scale-[1.02] ${
              isDarkMode 
                ? 'bg-[#1E1E1E] hover:shadow-[0_0_20px_rgba(187,134,252,0.2)]' 
                : 'bg-white hover:shadow-xl'
            }`}>
              <CardHeader>
                <CardTitle className={`flex items-center gap-2 ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}>
                  <Clock className={`w-5 h-5 ${
                    isDarkMode ? 'text-[#03DAC6]' : 'text-orange-600'
                  }`} />
                  Response Time Trend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={160}>
                  <LineChart data={responseTimeData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? "#3A3A3A" : "#f1f5f9"} />
                    <XAxis 
                      dataKey="month" 
                      tick={{ fontSize: 12, fill: isDarkMode ? '#B0B0B0' : '#64748b' }} 
                    />
                    <YAxis 
                      tick={{ fontSize: 12, fill: isDarkMode ? '#B0B0B0' : '#64748b' }} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="avgTime" 
                      stroke={isDarkMode ? "#03DAC6" : "#f59e0b"} 
                      strokeWidth={3}
                      dot={{ fill: isDarkMode ? '#03DAC6' : '#f59e0b', strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
                <p className={`text-center text-sm mt-2 ${
                  isDarkMode ? 'text-[#B0B0B0]' : 'text-slate-600'
                }`}>Average minutes per delivery</p>
              </CardContent>
            </Card>
          </div>

          {/* Interactive Heatmap */}
          <Card className={`shadow-lg border-0 transition-all duration-300 hover:scale-[1.02] ${
            isDarkMode 
              ? 'bg-[#1E1E1E] hover:shadow-[0_0_20px_rgba(187,134,252,0.2)]' 
              : 'bg-white hover:shadow-xl'
          }`}>
            <CardHeader>
              <CardTitle className={`flex items-center gap-2 ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}>
                <MapPin className={`w-5 h-5 ${
                  isDarkMode ? 'text-[#CF6679]' : 'text-red-600'
                }`} />
                Disaster Zones Served
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`relative h-48 rounded-lg overflow-hidden mb-4 ${
                isDarkMode ? 'bg-[#2C2C2C]' : 'bg-slate-100'
              }`}>
                <ImageWithFallback 
                  src="https://images.unsplash.com/photo-1446776877081-d282a0f896e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXAlMjBkaXNhc3RlciUyMHpvbmVzfGVufDF8fHx8MTc1Nzc3MTkyN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Disaster zones map"
                  className="w-full h-full object-cover opacity-80"
                />
                {disasterZones.map((zone, idx) => (
                  <div
                    key={idx}
                    className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
                    style={{ left: zone.coords.split(',')[0], top: zone.coords.split(',')[1] }}
                    onClick={() => setSelectedZone(selectedZone === zone.name ? null : zone.name)}
                  >
                    <div className={`w-6 h-6 rounded-full border-2 border-white shadow-lg animate-pulse ${
                      zone.status === 'critical' ? 'bg-red-500' :
                      zone.status === 'high' ? 'bg-orange-500' :
                      zone.status === 'medium' ? 'bg-yellow-500' :
                      'bg-green-500'
                    }`}>
                      <div className="absolute -top-2 -left-2 w-10 h-10 rounded-full opacity-30 animate-ping" 
                           style={{ backgroundColor: zone.status === 'critical' ? '#ef4444' : 
                                                     zone.status === 'high' ? '#f59e0b' :
                                                     zone.status === 'medium' ? '#eab308' : '#10b981' }}></div>
                    </div>
                  </div>
                ))}
              </div>
              
              {selectedZone && (
                <div className={`p-4 rounded-lg border ${
                  isDarkMode 
                    ? 'bg-[#2C2C2C] border-[#3A3A3A]' 
                    : 'bg-slate-50 border-slate-200'
                }`}>
                  {disasterZones.find(z => z.name === selectedZone) && (
                    <div>
                      <h4 className={`font-semibold mb-2 ${
                        isDarkMode ? 'text-white' : 'text-slate-800'
                      }`}>{selectedZone}</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className={`text-sm ${
                            isDarkMode ? 'text-[#B0B0B0]' : 'text-slate-600'
                          }`}>Total Deliveries</p>
                          <p className={`text-lg font-bold ${
                            isDarkMode ? 'text-[#BB86FC]' : 'text-blue-600'
                          }`}>
                            {disasterZones.find(z => z.name === selectedZone)?.deliveries}
                          </p>
                        </div>
                        <div>
                          <p className={`text-sm ${
                            isDarkMode ? 'text-[#B0B0B0]' : 'text-slate-600'
                          }`}>Priority Level</p>
                          <Badge variant={
                            disasterZones.find(z => z.name === selectedZone)?.status === 'critical' ? 'destructive' :
                            disasterZones.find(z => z.name === selectedZone)?.status === 'high' ? 'default' :
                            'secondary'
                          }>
                            {disasterZones.find(z => z.name === selectedZone)?.status.toUpperCase()}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="grid grid-cols-2 gap-3 mt-4">
                {disasterZones.slice(0, 4).map((zone, idx) => (
                  <div key={idx} className={`p-3 rounded-lg ${
                    isDarkMode ? 'bg-[#2C2C2C]' : 'bg-slate-50'
                  }`}>
                    <div className="flex items-center gap-2 mb-1">
                      <div className={`w-3 h-3 rounded-full ${
                        zone.status === 'critical' ? 'bg-red-500' :
                        zone.status === 'high' ? 'bg-orange-500' :
                        zone.status === 'medium' ? 'bg-yellow-500' :
                        'bg-green-500'
                      }`}></div>
                      <p className={`text-sm font-medium truncate ${
                        isDarkMode ? 'text-[#E0E0E0]' : 'text-slate-700'
                      }`}>{zone.name}</p>
                    </div>
                    <p className={`text-lg font-bold ${
                      isDarkMode ? 'text-[#BB86FC]' : 'text-blue-600'
                    }`}>{zone.deliveries} deliveries</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Mission History Table */}
          <Card className={`shadow-lg border-0 transition-all duration-300 hover:scale-[1.02] ${
            isDarkMode 
              ? 'bg-[#1E1E1E] hover:shadow-[0_0_20px_rgba(187,134,252,0.2)]' 
              : 'bg-white hover:shadow-xl'
          }`}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className={`flex items-center gap-2 ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}>
                  <Calendar className={`w-5 h-5 ${
                    isDarkMode ? 'text-[#B0B0B0]' : 'text-slate-600'
                  }`} />
                  Mission History
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Filter className={`w-4 h-4 ${
                    isDarkMode ? 'text-[#B0B0B0]' : 'text-slate-500'
                  }`} />
                  <Select value={historyFilter} onValueChange={setHistoryFilter}>
                    <SelectTrigger className={`w-36 h-8 text-sm ${
                      isDarkMode 
                        ? 'bg-[#2C2C2C] border-[#3A3A3A] text-[#E0E0E0]' 
                        : 'bg-white border-gray-300'
                    }`}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className={isDarkMode ? 'bg-[#1E1E1E] border-[#3A3A3A]' : ''}>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="yearly">Yearly</SelectItem>
                      <SelectItem value="custom">Custom Range</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {historyFilter === 'custom' ? (
                <div className={`p-4 rounded-lg border mb-4 ${
                  isDarkMode 
                    ? 'bg-[#BB86FC]/10 border-[#BB86FC]/30' 
                    : 'bg-blue-50 border-blue-200'
                }`}>
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar className={`w-4 h-4 ${
                      isDarkMode ? 'text-[#BB86FC]' : 'text-blue-600'
                    }`} />
                    <span className={`font-medium ${
                      isDarkMode ? 'text-[#BB86FC]' : 'text-blue-800'
                    }`}>Custom Date Range</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={`text-sm mb-1 block ${
                        isDarkMode ? 'text-[#E0E0E0]' : 'text-blue-700'
                      }`}>From Date</label>
                      <input 
                        type="date" 
                        className={`w-full p-2 border rounded-md text-sm ${
                          isDarkMode 
                            ? 'bg-[#2C2C2C] border-[#3A3A3A] text-[#E0E0E0]' 
                            : 'bg-white border-blue-300'
                        }`}
                        defaultValue="2024-01-01"
                      />
                    </div>
                    <div>
                      <label className={`text-sm mb-1 block ${
                        isDarkMode ? 'text-[#E0E0E0]' : 'text-blue-700'
                      }`}>To Date</label>
                      <input 
                        type="date" 
                        className={`w-full p-2 border rounded-md text-sm ${
                          isDarkMode 
                            ? 'bg-[#2C2C2C] border-[#3A3A3A] text-[#E0E0E0]' 
                            : 'bg-white border-blue-300'
                        }`}
                        defaultValue="2024-06-15"
                      />
                    </div>
                  </div>
                  <div className={`mt-3 p-3 rounded border ${
                    isDarkMode 
                      ? 'bg-[#2C2C2C] border-[#3A3A3A]' 
                      : 'bg-white border-gray-200'
                  }`}>
                    <p className={`text-sm mb-2 ${
                      isDarkMode ? 'text-[#B0B0B0]' : 'text-slate-600'
                    }`}>Custom Range Results (Jan 1 - Jun 15, 2024)</p>
                    <div className="grid grid-cols-4 gap-4">
                      <div className="text-center">
                        <p className={`text-lg font-bold ${
                          isDarkMode ? 'text-[#BB86FC]' : 'text-blue-600'
                        }`}>2,183</p>
                        <p className={`text-xs ${
                          isDarkMode ? 'text-[#B0B0B0]' : 'text-slate-500'
                        }`}>Total Missions</p>
                      </div>
                      <div className="text-center">
                        <p className={`text-lg font-bold ${
                          isDarkMode ? 'text-[#BB86FC]' : 'text-blue-600'
                        }`}>2,119</p>
                        <p className={`text-xs ${
                          isDarkMode ? 'text-[#B0B0B0]' : 'text-slate-500'
                        }`}>Delivered</p>
                      </div>
                      <div className="text-center">
                        <p className={`text-lg font-bold ${
                          isDarkMode ? 'text-[#CF6679]' : 'text-red-600'
                        }`}>64</p>
                        <p className={`text-xs ${
                          isDarkMode ? 'text-[#B0B0B0]' : 'text-slate-500'
                        }`}>Failed</p>
                      </div>
                      <div className="text-center">
                        <p className={`text-lg font-bold ${
                          isDarkMode ? 'text-[#03DAC6]' : 'text-purple-600'
                        }`}>97.1%</p>
                        <p className={`text-xs ${
                          isDarkMode ? 'text-[#B0B0B0]' : 'text-slate-500'
                        }`}>Success Rate</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {missionHistoryData[historyFilter as keyof typeof missionHistoryData].map((record, idx) => (
                    <div key={idx} className={`grid grid-cols-4 gap-4 p-3 rounded-lg ${
                      isDarkMode ? 'bg-[#1E1E1E]' : 'bg-slate-50'
                    }`}>
                      <div>
                        <p className={`text-xs mb-1 ${
                          isDarkMode ? 'text-[#B0B0B0]' : 'text-slate-500'
                        }`}>Period</p>
                        <p className={`font-bold text-sm ${
                          isDarkMode ? 'text-white' : 'text-slate-800'
                        }`}>{record.date}</p>
                      </div>
                      <div>
                        <p className={`text-xs mb-1 ${
                          isDarkMode ? 'text-[#B0B0B0]' : 'text-slate-500'
                        }`}>Missions</p>
                        <p className={`font-bold ${
                          isDarkMode ? 'text-[#BB86FC]' : 'text-blue-600'
                        }`}>{record.missions}</p>
                      </div>
                      <div>
                        <p className={`text-xs mb-1 ${
                          isDarkMode ? 'text-[#B0B0B0]' : 'text-slate-500'
                        }`}>Success Rate</p>
                        <div className="flex items-center gap-2">
                          <Progress 
                            value={(record.delivered / record.missions) * 100} 
                            className="h-2 flex-1"
                          />
                          <span className={`text-xs font-medium ${
                            isDarkMode ? 'text-[#03DAC6]' : 'text-slate-700'
                          }`}>{record.confirmation}</span>
                        </div>
                      </div>
                      <div>
                        <p className={`text-xs mb-1 ${
                          isDarkMode ? 'text-[#B0B0B0]' : 'text-slate-500'
                        }`}>Failed</p>
                        <p className={`font-bold ${
                          isDarkMode ? 'text-[#CF6679]' : 'text-red-600'
                        }`}>{record.failed}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {/* Summary stats for selected period */}
              <div className={`mt-4 p-3 rounded-lg border ${
                isDarkMode 
                  ? 'bg-gradient-to-r from-[#BB86FC]/10 to-[#03DAC6]/10 border-[#3A3A3A]' 
                  : 'bg-gradient-to-r from-blue-50 to-slate-50 border-gray-200'
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  <Activity className={`w-4 h-4 ${
                    isDarkMode ? 'text-[#BB86FC]' : 'text-blue-600'
                  }`} />
                  <span className={`font-medium ${
                    isDarkMode ? 'text-white' : 'text-slate-800'
                  }`}>
                    {historyFilter.charAt(0).toUpperCase() + historyFilter.slice(1)} Summary
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className={`text-lg font-bold ${
                      isDarkMode ? 'text-[#BB86FC]' : 'text-blue-600'
                    }`}>
                      {historyFilter === 'custom' ? '2,183' : 
                       missionHistoryData[historyFilter as keyof typeof missionHistoryData]
                         .reduce((sum, record) => sum + record.missions, 0)}
                    </p>
                    <p className={`text-xs ${
                      isDarkMode ? 'text-[#B0B0B0]' : 'text-slate-600'
                    }`}>Total Missions</p>
                  </div>
                  <div>
                    <p className={`text-lg font-bold ${
                      isDarkMode ? 'text-[#03DAC6]' : 'text-green-600'
                    }`}>
                      {historyFilter === 'custom' ? '97.1%' :
                       (missionHistoryData[historyFilter as keyof typeof missionHistoryData]
                         .reduce((sum, record) => sum + record.delivered, 0) / 
                        missionHistoryData[historyFilter as keyof typeof missionHistoryData]
                         .reduce((sum, record) => sum + record.missions, 0) * 100).toFixed(1)}%
                    </p>
                    <p className={`text-xs ${
                      isDarkMode ? 'text-[#B0B0B0]' : 'text-slate-600'
                    }`}>Avg Success Rate</p>
                  </div>
                  <div>
                    <p className={`text-lg font-bold ${
                      isDarkMode ? 'text-[#CF6679]' : 'text-orange-600'
                    }`}>
                      {historyFilter === 'custom' ? '64' :
                       missionHistoryData[historyFilter as keyof typeof missionHistoryData]
                         .reduce((sum, record) => sum + record.failed, 0)}
                    </p>
                    <p className={`text-xs ${
                      isDarkMode ? 'text-[#B0B0B0]' : 'text-slate-600'
                    }`}>Total Failed</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Insights Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Most Delivered Items */}
            <Card className={`shadow-lg border-0 transition-all duration-300 hover:scale-[1.02] ${
              isDarkMode 
                ? 'bg-[#1E1E1E] hover:shadow-[0_0_20px_rgba(187,134,252,0.2)]' 
                : 'bg-white hover:shadow-xl'
            }`}>
              <CardHeader>
                <CardTitle className={`flex items-center gap-2 ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}>
                  <Package className={`w-5 h-5 ${
                    isDarkMode ? 'text-[#03DAC6]' : 'text-green-600'
                  }`} />
                  Most Delivered Items
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {topItems.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className={`font-medium ${
                          isDarkMode ? 'text-white' : 'text-slate-800'
                        }`}>{item.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Progress value={item.percentage} className="h-2 flex-1" />
                          <span className={`text-xs ${
                            isDarkMode ? 'text-[#B0B0B0]' : 'text-slate-600'
                          }`}>{item.count}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Drone Health Summary */}
            <Card className={`shadow-lg border-0 transition-all duration-300 hover:scale-[1.02] ${
              isDarkMode 
                ? 'bg-[#1E1E1E] hover:shadow-[0_0_20px_rgba(187,134,252,0.2)]' 
                : 'bg-white hover:shadow-xl'
            }`}>
              <CardHeader>
                <CardTitle className={`flex items-center gap-2 ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}>
                  <Battery className={`w-5 h-5 ${
                    isDarkMode ? 'text-[#FFB74D]' : 'text-orange-600'
                  }`} />
                  Drone Health Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className={`flex items-center justify-between p-3 rounded-lg ${
                    isDarkMode ? 'bg-[#03DAC6]/20' : 'bg-green-50'
                  }`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${
                        isDarkMode ? 'bg-[#03DAC6]' : 'bg-green-500'
                      }`}></div>
                      <span className={`font-medium ${
                        isDarkMode ? 'text-white' : 'text-slate-800'
                      }`}>Operational</span>
                    </div>
                    <span className={`font-bold ${
                      isDarkMode ? 'text-[#03DAC6]' : 'text-green-600'
                    }`}>8 drones</span>
                  </div>
                  
                  <div className={`flex items-center justify-between p-3 rounded-lg ${
                    isDarkMode ? 'bg-[#FFB74D]/20' : 'bg-yellow-50'
                  }`}>
                    <div className="flex items-center gap-3">
                      <AlertTriangle className={`w-4 h-4 ${
                        isDarkMode ? 'text-[#FFB74D]' : 'text-yellow-600'
                      }`} />
                      <span className={`font-medium ${
                        isDarkMode ? 'text-white' : 'text-slate-800'
                      }`}>Maintenance Due</span>
                    </div>
                    <span className={`font-bold ${
                      isDarkMode ? 'text-[#FFB74D]' : 'text-yellow-600'
                    }`}>3 drones</span>
                  </div>
                  
                  <div className={`flex items-center justify-between p-3 rounded-lg ${
                    isDarkMode ? 'bg-[#CF6679]/20' : 'bg-red-50'
                  }`}>
                    <div className="flex items-center gap-3">
                      <XCircle className={`w-4 h-4 ${
                        isDarkMode ? 'text-[#CF6679]' : 'text-red-600'
                      }`} />
                      <span className={`font-medium ${
                        isDarkMode ? 'text-white' : 'text-slate-800'
                      }`}>Needs Repair</span>
                    </div>
                    <span className={`font-bold ${
                      isDarkMode ? 'text-[#CF6679]' : 'text-red-600'
                    }`}>1 drone</span>
                  </div>

                  <div className={`pt-2 border-t ${
                    isDarkMode ? 'border-[#3A3A3A]' : 'border-slate-200'
                  }`}>
                    <p className={`text-sm mb-2 ${
                      isDarkMode ? 'text-[#B0B0B0]' : 'text-slate-600'
                    }`}>Average Battery Cycles</p>
                    <div className="flex items-center gap-2">
                      <Progress value={73} className="flex-1" />
                      <span className={`text-sm font-medium ${
                        isDarkMode ? 'text-white' : 'text-slate-700'
                      }`}>730/1000</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}