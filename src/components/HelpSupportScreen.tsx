import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { 
  ArrowLeft, 
  LifeBuoy, 
  BookOpen, 
  Phone, 
  AlertTriangle, 
  MessageCircle,
  Mail,
  Search,
  PhoneCall,
  Bot,
  Clock,
  ExternalLink,
  ChevronRight,
  HelpCircle,
  Users,
  Settings,
  Headphones
} from 'lucide-react';

interface HelpSupportScreenProps {
  onBack: () => void;
  isDarkMode?: boolean;
}

const quickHelpCards = [
  {
    id: 'faqs',
    title: 'FAQs',
    description: 'Find quick answers',
    icon: BookOpen,
    color: 'bg-blue-500',
    bgGradient: 'from-blue-50 to-blue-100',
    borderColor: 'border-blue-200'
  },
  {
    id: 'contact',
    title: 'Contact Support',
    description: 'Get direct help',
    icon: Headphones,
    color: 'bg-green-500',
    bgGradient: 'from-green-50 to-green-100',
    borderColor: 'border-green-200'
  },
  {
    id: 'report',
    title: 'Report Issue',
    description: 'Submit problems',
    icon: AlertTriangle,
    color: 'bg-orange-500',
    bgGradient: 'from-orange-50 to-orange-100',
    borderColor: 'border-orange-200'
  },
  {
    id: 'guide',
    title: 'User Guide',
    description: 'Learn the basics',
    icon: Users,
    color: 'bg-purple-500',
    bgGradient: 'from-purple-50 to-purple-100',
    borderColor: 'border-purple-200'
  }
];

const faqs = [
  {
    id: '1',
    question: 'How do I track my drone in real-time?',
    answer: 'Go to the Dashboard tab and tap on any active mission card. You\'ll see live telemetry data including GPS coordinates, battery level, altitude, and speed. The mission card updates every 2-5 seconds with the latest information.',
    category: 'Tracking'
  },
  {
    id: '2',
    question: 'How to export delivery reports and analytics?',
    answer: 'Navigate to Reports → Export Data section. Choose from PDF, Excel, CSV, or JSON formats. Select your date range and data types, then tap Export. The file will be downloaded to your device automatically.',
    category: 'Reports'
  },
  {
    id: '3',
    question: 'How do I update my role and permissions?',
    answer: 'Go to Profile → Settings → Security & Data Management. Only administrators can assign roles. Contact your team admin to request role changes or additional permissions for drone management.',
    category: 'Permissions'
  },
  {
    id: '4',
    question: 'What should I do if a drone goes offline?',
    answer: 'Check the mission card for connectivity status. If weak/offline: 1) Wait 2-3 minutes for auto-reconnection, 2) Use the Emergency protocols in the SOS section, 3) Contact dispatch immediately for critical missions.',
    category: 'Emergency'
  },
  {
    id: '5',
    question: 'How to schedule recurring deliveries?',
    answer: 'From Dashboard, tap "Add Delivery" → Advanced Options → Schedule. Set frequency (daily, weekly, monthly), time slots, and recipient details. The system will auto-generate missions based on your schedule.',
    category: 'Operations'
  },
  {
    id: '6',
    question: 'How do I switch between light and dark mode?',
    answer: 'Go to Profile → Hamburger menu (≡) → Look for the dark/light mode toggle switch. Your preference is saved automatically and applies across all app sections.',
    category: 'Settings'
  }
];

const supportOptions = [
  {
    id: 'chat',
    title: 'Live Chat with AI Assistant',
    description: 'Get instant answers 24/7',
    icon: Bot,
    action: 'Start Chat',
    type: 'primary',
    availability: 'Available now'
  },
  {
    id: 'email',
    title: 'Email Support',
    description: 'detailed support within 4 hours',
    icon: Mail,
    action: 'Send Email',
    type: 'secondary',
    availability: 'Response within 4h'
  },
  {
    id: 'emergency',
    title: 'Emergency Hotline',
    description: 'Critical issues & drone emergencies',
    icon: PhoneCall,
    action: 'Call Now',
    type: 'emergency',
    availability: '24/7 Emergency'
  }
];

export function HelpSupportScreen({ onBack, isDarkMode = false }: HelpSupportScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activeCard, setActiveCard] = useState<string | null>(null);

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (!selectedCategory || faq.category === selectedCategory)
  );

  const categories = [...new Set(faqs.map(faq => faq.category))];

  const handleQuickHelpClick = (cardId: string) => {
    setActiveCard(cardId);
    if (cardId === 'contact') {
      // Scroll to support options
      document.getElementById('support-options')?.scrollIntoView({ behavior: 'smooth' });
    } else if (cardId === 'faqs') {
      // Scroll to FAQs
      document.getElementById('faqs-section')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSupportAction = (type: string) => {
    switch (type) {
      case 'chat':
        // This would typically open a chat widget or navigate to chat
        alert('Opening AI Chat Assistant...');
        break;
      case 'email':
        // Open email client
        window.location.href = 'mailto:support@droneops.com?subject=DroneOps Support Request';
        break;
      case 'emergency':
        // Open phone dialer
        window.location.href = 'tel:+1-800-DRONE-911';
        break;
    }
  };

  return (
    <div className={`min-h-screen pb-20 transition-colors duration-300 ${
      isDarkMode ? 'bg-[#121212] text-white' : 'bg-gray-50 text-slate-900'
    }`}>
      {/* Header */}
      <div className={`shadow-sm border-b px-4 py-4 ${
        isDarkMode ? 'bg-[#1E1E1E] border-[#3A3A3A]' : 'bg-white border-gray-200'
      }`}>
        <div className="flex items-center justify-between mb-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onBack} 
            className={`p-2 ${
              isDarkMode ? 'text-[#E0E0E0] hover:bg-[#2C2C2C]' : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          
          <div className="flex items-center gap-2">
            <LifeBuoy className={`w-6 h-6 ${
              isDarkMode ? 'text-[#BB86FC]' : 'text-blue-500'
            }`} />
            <h1 className={`text-lg font-semibold ${
              isDarkMode ? 'text-white' : 'text-slate-800'
            }`}>
              Help & Support
            </h1>
          </div>
          
          <div></div>
        </div>
        
        <div className="text-center">
          <p className={`text-sm ${
            isDarkMode ? 'text-[#B0B0B0]' : 'text-slate-600'
          }`}>
            Get answers, support, and guidance anytime
          </p>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Quick Help Cards */}
        <div className="grid grid-cols-2 gap-3">
          {quickHelpCards.map((card) => (
            <Card 
              key={card.id}
              className={`cursor-pointer transition-all duration-200 border-0 shadow-lg hover:shadow-xl transform hover:scale-105 ${
                activeCard === card.id ? 'ring-2 ring-blue-500' : ''
              } ${isDarkMode ? 'bg-[#1E1E1E]' : `bg-gradient-to-br ${card.bgGradient}`}`}
              onClick={() => handleQuickHelpClick(card.id)}
            >
              <CardContent className="p-4 text-center">
                <div className={`w-12 h-12 rounded-full ${card.color} flex items-center justify-center mx-auto mb-3`}>
                  <card.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className={`font-semibold mb-1 ${
                  isDarkMode ? 'text-white' : 'text-slate-800'
                }`}>
                  {card.title}
                </h3>
                <p className={`text-xs ${
                  isDarkMode ? 'text-[#B0B0B0]' : 'text-slate-600'
                }`}>
                  {card.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
            isDarkMode ? 'text-slate-400' : 'text-slate-500'
          }`} />
          <Input
            type="text"
            placeholder="Search help topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`pl-10 rounded-xl border-0 shadow-md ${
              isDarkMode 
                ? 'bg-slate-800 text-white placeholder:text-slate-400 focus:ring-blue-500' 
                : 'bg-white text-slate-900 placeholder:text-slate-500 focus:ring-blue-500'
            }`}
          />
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          <Button
            variant={selectedCategory === null ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory(null)}
            className="whitespace-nowrap rounded-full"
          >
            All Topics
          </Button>
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="whitespace-nowrap rounded-full"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* FAQs Section */}
        <div id="faqs-section">
          <h2 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${
            isDarkMode ? 'text-white' : 'text-slate-800'
          }`}>
            <HelpCircle className="w-5 h-5 text-blue-500" />
            Frequently Asked Questions
          </h2>
          
          <Card className={`shadow-lg border-0 ${
            isDarkMode ? 'bg-slate-800' : 'bg-white'
          }`}>
            <CardContent className="p-0">
              <Accordion type="single" collapsible className="w-full">
                {filteredFaqs.map((faq) => (
                  <AccordionItem key={faq.id} value={faq.id} className="border-b border-slate-200 dark:border-slate-700 last:border-b-0">
                    <AccordionTrigger className={`px-4 py-4 text-left hover:no-underline ${
                      isDarkMode ? 'text-white hover:bg-slate-700' : 'text-slate-800 hover:bg-slate-50'
                    }`}>
                      <div className="flex items-center justify-between w-full">
                        <span className="font-medium pr-4">{faq.question}</span>
                        <Badge variant="outline" className="ml-2 text-xs">
                          {faq.category}
                        </Badge>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className={`px-4 pb-4 ${
                      isDarkMode ? 'text-slate-300' : 'text-slate-600'
                    }`}>
                      <p className="leading-relaxed">{faq.answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>

        {/* Support Options */}
        <div id="support-options">
          <h2 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${
            isDarkMode ? 'text-white' : 'text-slate-800'
          }`}>
            <MessageCircle className="w-5 h-5 text-green-500" />
            Get Direct Support
          </h2>
          
          <div className="space-y-4">
            {supportOptions.map((option) => (
              <Card 
                key={option.id}
                className={`shadow-lg border-0 cursor-pointer transition-all duration-200 hover:shadow-xl ${
                  option.type === 'emergency' 
                    ? 'bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20' 
                    : option.type === 'primary'
                    ? 'bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20'
                    : isDarkMode ? 'bg-slate-800' : 'bg-white'
                }`}
                onClick={() => handleSupportAction(option.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        option.type === 'emergency' 
                          ? 'bg-red-500' 
                          : option.type === 'primary'
                          ? 'bg-blue-500'
                          : 'bg-gray-500'
                      }`}>
                        <option.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className={`font-semibold ${
                          isDarkMode ? 'text-white' : 'text-slate-800'
                        }`}>
                          {option.title}
                        </h3>
                        <p className={`text-sm ${
                          isDarkMode ? 'text-slate-400' : 'text-slate-600'
                        }`}>
                          {option.description}
                        </p>
                        <div className="flex items-center gap-1 mt-1">
                          <Clock className="w-3 h-3 text-green-500" />
                          <span className="text-xs text-green-600 font-medium">
                            {option.availability}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        className={
                          option.type === 'emergency'
                            ? 'bg-red-600 hover:bg-red-700 text-white'
                            : option.type === 'primary'
                            ? 'bg-blue-600 hover:bg-blue-700 text-white'
                            : 'bg-gray-600 hover:bg-gray-700 text-white'
                        }
                      >
                        {option.action}
                      </Button>
                      <ChevronRight className={`w-4 h-4 ${
                        isDarkMode ? 'text-slate-400' : 'text-slate-500'
                      }`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Additional Resources */}
        <Card className={`shadow-lg border-0 ${
          isDarkMode ? 'bg-slate-800' : 'bg-gradient-to-br from-indigo-50 to-purple-50'
        }`}>
          <CardHeader>
            <CardTitle className={`flex items-center gap-2 ${
              isDarkMode ? 'text-white' : 'text-slate-800'
            }`}>
              <ExternalLink className="w-5 h-5 text-indigo-500" />
              Additional Resources
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className={`p-3 rounded-lg border cursor-pointer hover:bg-opacity-80 transition-colors ${
              isDarkMode ? 'bg-slate-700 border-slate-600' : 'bg-white border-indigo-200'
            }`}>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className={`font-medium ${
                    isDarkMode ? 'text-white' : 'text-slate-800'
                  }`}>
                    Video Tutorials
                  </h4>
                  <p className={`text-sm ${
                    isDarkMode ? 'text-slate-400' : 'text-slate-600'
                  }`}>
                    Step-by-step video guides
                  </p>
                </div>
                <ChevronRight className={`w-4 h-4 ${
                  isDarkMode ? 'text-slate-400' : 'text-slate-500'
                }`} />
              </div>
            </div>
            
            <div className={`p-3 rounded-lg border cursor-pointer hover:bg-opacity-80 transition-colors ${
              isDarkMode ? 'bg-slate-700 border-slate-600' : 'bg-white border-indigo-200'
            }`}>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className={`font-medium ${
                    isDarkMode ? 'text-white' : 'text-slate-800'
                  }`}>
                    System Status
                  </h4>
                  <p className={`text-sm ${
                    isDarkMode ? 'text-slate-400' : 'text-slate-600'
                  }`}>
                    Check service availability
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-green-600 font-medium">All Systems Operational</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className={`text-center py-4 ${
          isDarkMode ? 'text-slate-400' : 'text-slate-600'
        }`}>
          <p className="text-sm">We're here to help you 24/7</p>
          <p className="text-xs mt-1">DroneOps Support Team</p>
        </div>
      </div>
    </div>
  );
}