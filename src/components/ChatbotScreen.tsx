import { useState, useRef, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { 
  Send, 
  Mic, 
  Info, 
  MapPin, 
  BarChart3, 
  Phone, 
  MessageCircle,
  Clock,
  AlertTriangle,
  CheckCircle,
  Bot,
  User,
  Plane
} from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  quickActions?: {
    label: string;
    icon: any;
    action: string;
  }[];
}

const suggestions = [
  'Drone Status',
  'Delivery Issues', 
  'Update Contact',
  'Weather Check'
];

const initialMessages: Message[] = [
  {
    id: '1',
    text: 'Hello! I\'m your AI assistant for drone operations. I can help you track deliveries, check drone status, analyze performance, and resolve issues. How can I assist you today?',
    sender: 'ai',
    timestamp: new Date(Date.now() - 300000),
    quickActions: [
      { label: 'Track Drone', icon: MapPin, action: 'track' },
      { label: 'View Reports', icon: BarChart3, action: 'reports' },
      { label: 'Contact Support', icon: Phone, action: 'support' }
    ]
  }
];

interface ChatbotScreenProps {
  isDarkMode?: boolean;
}

export function ChatbotScreen({ isDarkMode = false }: ChatbotScreenProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputText);
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (userQuery: string): Message => {
    const query = userQuery.toLowerCase();
    
    if (query.includes('drone') && (query.includes('status') || query.includes('where'))) {
      return {
        id: Date.now().toString(),
        text: 'I can see your active drones right now. DRONE-001 is currently in transit to Emergency Camp Alpha (2.3km away), DRONE-002 is delivering to Rescue Station Beta (150m away), and DRONE-003 is returning to base. All systems are operational.',
        sender: 'ai',
        timestamp: new Date(),
        quickActions: [
          { label: 'View Live Map', icon: MapPin, action: 'map' },
          { label: 'Drone Details', icon: Plane, action: 'details' }
        ]
      };
    }
    
    if (query.includes('delivery') && query.includes('issue')) {
      return {
        id: Date.now().toString(),
        text: 'I don\'t see any critical delivery issues at the moment. However, DRONE-003 has a low battery warning (45%). Would you like me to initiate an early return protocol or check alternative drones for backup?',
        sender: 'ai',
        timestamp: new Date(),
        quickActions: [
          { label: 'Return Protocol', icon: AlertTriangle, action: 'return' },
          { label: 'Backup Drones', icon: Plane, action: 'backup' }
        ]
      };
    }
    
    if (query.includes('weather')) {
      return {
        id: Date.now().toString(),
        text: 'Current weather conditions are favorable for drone operations. Wind speed: 12 mph, Visibility: 8 miles, No precipitation. All zones are clear for delivery missions.',
        sender: 'ai',
        timestamp: new Date(),
        quickActions: [
          { label: 'Detailed Forecast', icon: Clock, action: 'weather' },
          { label: 'Flight Planning', icon: MapPin, action: 'planning' }
        ]
      };
    }
    
    if (query.includes('report') || query.includes('analytics')) {
      return {
        id: Date.now().toString(),
        text: 'Your mission performance this month: 523 total deliveries with 98.2% success rate. Average delivery time has improved to 15 minutes. Would you like to see detailed analytics or export a report?',
        sender: 'ai',
        timestamp: new Date(),
        quickActions: [
          { label: 'View Analytics', icon: BarChart3, action: 'analytics' },
          { label: 'Export Report', icon: BarChart3, action: 'export' }
        ]
      };
    }

    // Default response
    return {
      id: Date.now().toString(),
      text: 'I understand you\'re asking about drone operations. I can help you with drone tracking, delivery status, performance reports, weather conditions, and troubleshooting. Could you be more specific about what you need assistance with?',
      sender: 'ai',
      timestamp: new Date(),
      quickActions: [
        { label: 'Track Drone', icon: MapPin, action: 'track' },
        { label: 'View Reports', icon: BarChart3, action: 'reports' },
        { label: 'Check Weather', icon: Clock, action: 'weather' }
      ]
    };
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputText(suggestion);
    inputRef.current?.focus();
  };

  const handleQuickAction = (action: string) => {
    // Simulate quick action responses
    const actionResponses = {
      track: 'Opening live tracking map...',
      reports: 'Navigating to reports dashboard...',
      support: 'Connecting you to support team...',
      map: 'Loading real-time drone locations...',
      details: 'Fetching detailed drone telemetry...',
      return: 'Initiating emergency return protocol...',
      backup: 'Checking available backup drones...',
      weather: 'Loading detailed weather forecast...',
      planning: 'Opening flight planning tools...',
      analytics: 'Loading analytics dashboard...',
      export: 'Preparing report for export...'
    };

    const response: Message = {
      id: Date.now().toString(),
      text: actionResponses[action as keyof typeof actionResponses] || 'Processing your request...',
      sender: 'ai',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, response]);
  };

  const handleVoiceInput = () => {
    setIsListening(!isListening);
    // Simulate voice input
    if (!isListening) {
      setTimeout(() => {
        setIsListening(false);
        setInputText('Where is Drone A3 now?');
      }, 2000);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`flex flex-col h-screen pb-20 transition-colors duration-300 ${
      isDarkMode ? 'bg-[#121212]' : 'bg-gray-50'
    }`}>
      {/* Header */}
      <div className={`px-4 py-6 text-white sticky top-0 z-10 ${
        isDarkMode 
          ? 'bg-gradient-to-r from-[#1E1E1E] to-[#232323]' 
          : 'bg-gradient-to-r from-slate-800 to-slate-700'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              isDarkMode 
                ? 'bg-gradient-to-br from-[#BB86FC] to-[#BB86FC]/80' 
                : 'bg-gradient-to-br from-blue-500 to-purple-600'
            }`}>
              <Bot className={`w-6 h-6 ${
                isDarkMode ? 'text-black' : 'text-white'
              }`} />
            </div>
            <div>
              <h1 className="text-xl font-semibold">AI Support</h1>
              <p className={`text-sm ${
                isDarkMode ? 'text-[#B0B0B0]' : 'text-slate-300'
              }`}>Ask anything about your drone operations</p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className={`${
              isDarkMode 
                ? 'text-[#E0E0E0] hover:bg-[#BB86FC]/10' 
                : 'text-white hover:bg-white/10'
            }`}
          >
            <Info className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
          >
            <div className={`max-w-[80%] ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
              {/* Avatar */}
              <div className={`flex items-end gap-2 ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'} mb-2`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  message.sender === 'user' 
                    ? isDarkMode 
                      ? 'bg-gradient-to-br from-[#BB86FC] to-[#BB86FC]/80' 
                      : 'bg-gradient-to-br from-blue-500 to-purple-600'
                    : isDarkMode
                      ? 'bg-gradient-to-br from-[#03DAC6] to-[#03DAC6]/80'
                      : 'bg-gradient-to-br from-slate-400 to-slate-500'
                }`}>
                  {message.sender === 'user' ? (
                    <User className={`w-4 h-4 ${
                      isDarkMode ? 'text-black' : 'text-white'
                    }`} />
                  ) : (
                    <Bot className={`w-4 h-4 ${
                      isDarkMode ? 'text-black' : 'text-white'
                    }`} />
                  )}
                </div>
                
                {/* Message Bubble */}
                <div className={`px-4 py-3 rounded-2xl shadow-lg ${
                  message.sender === 'user'
                    ? isDarkMode 
                      ? 'bg-gradient-to-br from-[#BB86FC] to-[#BB86FC]/80 text-black'
                      : 'bg-gradient-to-br from-blue-500 to-purple-600 text-white'
                    : isDarkMode
                      ? 'bg-[#1E1E1E] text-[#E0E0E0] border border-[#3A3A3A]'
                      : 'bg-white text-slate-800 border border-slate-200'
                }`}>
                  <p className="text-sm leading-relaxed">{message.text}</p>
                  <p className={`text-xs mt-2 opacity-70 ${
                    message.sender === 'user' 
                      ? isDarkMode ? 'text-black/70' : 'text-blue-100'
                      : isDarkMode ? 'text-[#B0B0B0]' : 'text-slate-500'
                  }`}>
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>

              {/* Quick Actions */}
              {message.quickActions && (
                <div className="flex flex-wrap gap-2 mt-2 ml-10">
                  {message.quickActions.map((action, idx) => (
                    <Button
                      key={idx}
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickAction(action.action)}
                      className={`text-xs rounded-full px-3 py-1 h-auto ${
                        isDarkMode 
                          ? 'bg-[#2C2C2C] hover:bg-[#3A3A3A] border-[#3A3A3A] text-[#E0E0E0]' 
                          : 'bg-white hover:bg-slate-50 border-slate-300 text-slate-700'
                      }`}
                    >
                      <action.icon className="w-3 h-3 mr-1" />
                      {action.label}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start mb-4">
            <div className="flex items-end gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                isDarkMode 
                  ? 'bg-gradient-to-br from-[#03DAC6] to-[#03DAC6]/80' 
                  : 'bg-gradient-to-br from-slate-400 to-slate-500'
              }`}>
                <Bot className={`w-4 h-4 ${
                  isDarkMode ? 'text-black' : 'text-white'
                }`} />
              </div>
              <div className={`px-4 py-3 rounded-2xl shadow-lg border ${
                isDarkMode 
                  ? 'bg-[#1E1E1E] border-[#3A3A3A]' 
                  : 'bg-white border-slate-200'
              }`}>
                <div className="flex items-center gap-1">
                  <div className={`w-2 h-2 rounded-full animate-bounce ${
                    isDarkMode ? 'bg-[#B0B0B0]' : 'bg-slate-400'
                  }`}></div>
                  <div className={`w-2 h-2 rounded-full animate-bounce ${
                    isDarkMode ? 'bg-[#B0B0B0]' : 'bg-slate-400'
                  }`} style={{ animationDelay: '0.1s' }}></div>
                  <div className={`w-2 h-2 rounded-full animate-bounce ${
                    isDarkMode ? 'bg-[#B0B0B0]' : 'bg-slate-400'
                  }`} style={{ animationDelay: '0.2s' }}></div>
                  <span className={`text-xs ml-2 ${
                    isDarkMode ? 'text-[#B0B0B0]' : 'text-slate-500'
                  }`}>AI is thinking...</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className={`border-t p-4 sticky bottom-20 ${
        isDarkMode 
          ? 'bg-[#1E1E1E] border-[#3A3A3A]' 
          : 'bg-white border-slate-200'
      }`}>
        {/* Suggestions */}
        <div className="flex flex-wrap gap-2 mb-3">
          {suggestions.map((suggestion, idx) => (
            <Badge
              key={idx}
              variant="secondary"
              className={`cursor-pointer transition-colors text-xs px-3 py-1 ${
                isDarkMode 
                  ? 'bg-[#2C2C2C] hover:bg-[#3A3A3A] text-[#E0E0E0]' 
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </Badge>
          ))}
        </div>

        {/* Input Bar */}
        <div className="flex items-center gap-3">
          <div className="flex-1 relative">
            <Input
              ref={inputRef}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type your query..."
              className={`pr-12 rounded-full h-12 text-sm ${
                isDarkMode 
                  ? 'bg-[#2C2C2C] border-[#3A3A3A] text-[#E0E0E0] placeholder:text-[#B0B0B0]' 
                  : 'bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-500'
              }`}
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={handleVoiceInput}
              className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-2 h-8 w-8 rounded-full ${
                isListening 
                  ? isDarkMode 
                    ? 'bg-[#CF6679]/20 text-[#CF6679]' 
                    : 'bg-red-100 text-red-600'
                  : isDarkMode 
                    ? 'text-[#B0B0B0] hover:bg-[#3A3A3A]' 
                    : 'text-slate-500 hover:bg-slate-100'
              }`}
            >
              <Mic className={`w-4 h-4 ${isListening ? 'animate-pulse' : ''}`} />
            </Button>
          </div>
          
          <Button
            onClick={handleSendMessage}
            disabled={!inputText.trim()}
            className={`rounded-full w-12 h-12 p-0 shadow-lg ${
              isDarkMode 
                ? 'bg-gradient-to-r from-[#BB86FC] to-[#BB86FC]/80 hover:from-[#BB86FC]/90 hover:to-[#BB86FC]/70 text-black' 
                : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white'
            }`}
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>

        {isListening && (
          <div className={`flex items-center justify-center mt-3 ${
            isDarkMode ? 'text-[#CF6679]' : 'text-red-600'
          }`}>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full animate-pulse ${
                isDarkMode ? 'bg-[#CF6679]' : 'bg-red-500'
              }`}></div>
              <span className="text-sm">Listening...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}