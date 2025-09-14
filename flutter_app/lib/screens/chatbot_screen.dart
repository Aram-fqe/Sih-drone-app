import 'package:flutter/material.dart';
import '../widgets/ui_components.dart';

class QuickAction {
  final String label;
  final IconData icon;
  final String action;

  const QuickAction({
    required this.label,
    required this.icon,
    required this.action,
  });
}

class ChatMessage {
  final String text;
  final bool isBot;
  final DateTime timestamp;
  final List<QuickAction>? quickActions;

  ChatMessage({
    required this.text,
    required this.isBot,
    required this.timestamp,
    this.quickActions,
  });
}

class ChatbotScreen extends StatefulWidget {
  final bool isDarkMode;

  const ChatbotScreen({super.key, required this.isDarkMode});

  @override
  State<ChatbotScreen> createState() => _ChatbotScreenState();
}

class _ChatbotScreenState extends State<ChatbotScreen> {
  final TextEditingController _messageController = TextEditingController();
  final ScrollController _scrollController = ScrollController();
  bool _isTyping = false;
  bool _isListening = false;

  final List<String> suggestions = [
    'Drone Status',
    'Delivery Issues',
    'Update Contact',
    'Weather Check'
  ];

  final List<ChatMessage> _messages = [
    ChatMessage(
      text: "Hello! I'm your AI assistant for drone operations. I can help you track deliveries, check drone status, analyze performance, and resolve issues. How can I assist you today?",
      isBot: true,
      timestamp: DateTime.now().subtract(const Duration(minutes: 5)),
      quickActions: [
        const QuickAction(label: 'Track Drone', icon: Icons.location_on, action: 'track'),
        const QuickAction(label: 'View Reports', icon: Icons.bar_chart, action: 'reports'),
        const QuickAction(label: 'Contact Support', icon: Icons.phone, action: 'support'),
      ],
    ),
  ];

  void _scrollToBottom() {
    if (_scrollController.hasClients) {
      _scrollController.animateTo(
        _scrollController.position.maxScrollExtent,
        duration: const Duration(milliseconds: 300),
        curve: Curves.easeOut,
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      color: widget.isDarkMode ? const Color(0xFF121212) : const Color(0xFFF9FAFB),
      child: Column(
        children: [
          // Chat Header
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 20),
            decoration: BoxDecoration(
              gradient: LinearGradient(
                colors: widget.isDarkMode
                    ? [const Color(0xFF1E1E1E), const Color(0xFF232323)]
                    : [Colors.grey.shade800, Colors.grey.shade700],
              ),
            ),
            child: SafeArea(
              bottom: false,
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Row(
                    children: [
                      Container(
                        width: 40,
                        height: 40,
                        decoration: BoxDecoration(
                          gradient: LinearGradient(
                            colors: widget.isDarkMode
                                ? [const Color(0xFFBB86FC), const Color(0xFFBB86FC).withValues(alpha: 0.8)]
                                : [Colors.blue.shade500, Colors.purple.shade600],
                          ),
                          borderRadius: BorderRadius.circular(20),
                        ),
                        child: Icon(
                          Icons.smart_toy,
                          size: 24,
                          color: widget.isDarkMode ? Colors.black : Colors.white,
                        ),
                      ),
                      const SizedBox(width: 12),
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const Text(
                            'AI Support',
                            style: TextStyle(
                              color: Colors.white,
                              fontSize: 20,
                              fontWeight: FontWeight.w600,
                            ),
                          ),
                          Text(
                            'Ask anything about your drone operations',
                            style: TextStyle(
                              color: widget.isDarkMode ? Colors.grey.shade400 : Colors.grey.shade300,
                              fontSize: 14,
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                  IconButton(
                    icon: const Icon(Icons.info_outline, color: Colors.white),
                    onPressed: () {},
                  ),
                ],
              ),
            ),
          ),

          // Chat Messages
          Expanded(
            child: ListView.builder(
              controller: _scrollController,
              padding: const EdgeInsets.all(16),
              itemCount: _messages.length + (_isTyping ? 1 : 0),
              itemBuilder: (context, index) {
                if (index < _messages.length) {
                  return _buildMessageBubble(_messages[index]);
                }
                return _buildTypingIndicator();
              },
            ),
          ),

          // Input Area
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: widget.isDarkMode ? const Color(0xFF1E1E1E) : Colors.white,
              border: Border(
                top: BorderSide(
                  color: widget.isDarkMode ? const Color(0xFF3A3A3A) : Colors.grey.shade200,
                ),
              ),
            ),
            child: Column(
              children: [
                // Suggestions
                Wrap(
                  spacing: 8,
                  runSpacing: 8,
                  children: suggestions.map((suggestion) => StyledBadge(
                    backgroundColor: widget.isDarkMode 
                        ? const Color(0xFF2C2C2C)
                        : Colors.grey.shade100,
                    textColor: widget.isDarkMode
                        ? Colors.grey.shade300
                        : Colors.grey.shade700,
                    child: Text(suggestion),
                  )).toList(),
                ),
                const SizedBox(height: 12),

                // Message Input
                Row(
                  children: [
                    Expanded(
                      child: Container(
                        decoration: BoxDecoration(
                          color: widget.isDarkMode ? const Color(0xFF2C2C2C) : Colors.grey.shade50,
                          borderRadius: BorderRadius.circular(24),
                          border: Border.all(
                            color: widget.isDarkMode ? const Color(0xFF3A3A3A) : Colors.grey.shade300,
                          ),
                        ),
                        child: Row(
                          children: [
                            Expanded(
                              child: TextField(
                                controller: _messageController,
                                style: TextStyle(
                                  color: widget.isDarkMode ? Colors.grey.shade300 : Colors.grey.shade900,
                                ),
                                decoration: InputDecoration(
                                  hintText: 'Type your query...',
                                  hintStyle: TextStyle(
                                    color: widget.isDarkMode ? Colors.grey.shade600 : Colors.grey.shade500,
                                  ),
                                  border: InputBorder.none,
                                  contentPadding: const EdgeInsets.all(16),
                                ),
                                onSubmitted: (_) => _sendMessage(),
                              ),
                            ),
                            IconButton(
                              icon: Icon(
                                Icons.mic,
                                color: _isListening
                                    ? (widget.isDarkMode ? const Color(0xFFCF6679) : Colors.red)
                                    : (widget.isDarkMode ? Colors.grey.shade400 : Colors.grey.shade600),
                              ),
                              onPressed: () {
                                setState(() {
                                  _isListening = !_isListening;
                                  if (_isListening) {
                                    // Simulate voice input after 2 seconds
                                    Future.delayed(const Duration(seconds: 2), () {
                                      _messageController.text = 'Where is Drone A3 now?';
                                      setState(() => _isListening = false);
                                    });
                                  }
                                });
                              },
                            ),
                          ],
                        ),
                      ),
                    ),
                    const SizedBox(width: 8),
                    Container(
                      decoration: BoxDecoration(
                        gradient: LinearGradient(
                          colors: widget.isDarkMode
                              ? [const Color(0xFFBB86FC), const Color(0xFFBB86FC).withValues(alpha: 0.8)]
                              : [Colors.blue.shade500, Colors.purple.shade600],
                        ),
                        shape: BoxShape.circle,
                      ),
                      child: IconButton(
                        onPressed: _sendMessage,
                        icon: const Icon(Icons.send, color: Colors.white),
                      ),
                    ),
                  ],
                ),

                // Listening Indicator
                if (_isListening) ...[
                  const SizedBox(height: 12),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Container(
                        width: 8,
                        height: 8,
                        decoration: BoxDecoration(
                          color: widget.isDarkMode ? const Color(0xFFCF6679) : Colors.red,
                          shape: BoxShape.circle,
                        ),
                        child: const PulsingDot(),
                      ),
                      const SizedBox(width: 8),
                      Text(
                        'Listening...',
                        style: TextStyle(
                          color: widget.isDarkMode ? const Color(0xFFCF6679) : Colors.red,
                          fontSize: 14,
                        ),
                      ),
                    ],
                  ),
                ],
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildMessageBubble(ChatMessage message) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: message.isBot ? MainAxisAlignment.start : MainAxisAlignment.end,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              if (message.isBot) _buildAvatar(true),
              const SizedBox(width: 8),
              Expanded(
                child: Container(
                  padding: const EdgeInsets.all(16),
                  decoration: BoxDecoration(
                    gradient: message.isBot
                        ? null
                        : LinearGradient(
                            colors: widget.isDarkMode
                                ? [const Color(0xFFBB86FC), const Color(0xFFBB86FC).withValues(alpha: 0.8)]
                                : [Colors.blue.shade500, Colors.purple.shade600],
                          ),
                    color: message.isBot
                        ? (widget.isDarkMode ? const Color(0xFF1E1E1E) : Colors.white)
                        : null,
                    borderRadius: BorderRadius.circular(16),
                    border: message.isBot
                        ? Border.all(
                            color: widget.isDarkMode
                                ? const Color(0xFF3A3A3A)
                                : Colors.grey.shade200,
                          )
                        : null,
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        message.text,
                        style: TextStyle(
                          color: message.isBot
                              ? (widget.isDarkMode ? Colors.grey.shade300 : Colors.grey.shade900)
                              : Colors.white,
                        ),
                      ),
                      const SizedBox(height: 4),
                      Text(
                        _formatTime(message.timestamp),
                        style: TextStyle(
                          fontSize: 12,
                          color: message.isBot
                              ? (widget.isDarkMode ? Colors.grey.shade500 : Colors.grey.shade500)
                              : Colors.white.withValues(alpha: 0.7),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
              const SizedBox(width: 8),
              if (!message.isBot) _buildAvatar(false),
            ],
          ),
          if (message.quickActions != null) ...[
            const SizedBox(height: 8),
            Padding(
              padding: EdgeInsets.only(left: message.isBot ? 48 : 0),
              child: Wrap(
                spacing: 8,
                runSpacing: 8,
                children: message.quickActions!.map((action) => StyledButton(
                  onPressed: () => _handleQuickAction(action.action),
                  backgroundColor: widget.isDarkMode
                      ? const Color(0xFF2C2C2C)
                      : Colors.white,
                  textColor: widget.isDarkMode
                      ? Colors.grey.shade300
                      : Colors.grey.shade700,
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Icon(
                        action.icon,
                        size: 16,
                        color: widget.isDarkMode
                            ? Colors.grey.shade300
                            : Colors.grey.shade700,
                      ),
                      const SizedBox(width: 4),
                      Text(action.label),
                    ],
                  ),
                )).toList(),
              ),
            ),
          ],
        ],
      ),
    );
  }

  Widget _buildAvatar(bool isBot) {
    return Container(
      width: 32,
      height: 32,
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: isBot
              ? (widget.isDarkMode
                  ? [const Color(0xFF03DAC6), const Color(0xFF03DAC6).withValues(alpha: 0.8)]
                  : [Colors.grey.shade400, Colors.grey.shade500])
              : (widget.isDarkMode
                  ? [const Color(0xFFBB86FC), const Color(0xFFBB86FC).withValues(alpha: 0.8)]
                  : [Colors.blue.shade500, Colors.purple.shade600]),
        ),
        shape: BoxShape.circle,
      ),
      child: Icon(
        isBot ? Icons.smart_toy : Icons.person,
        size: 16,
        color: widget.isDarkMode ? Colors.black : Colors.white,
      ),
    );
  }

  Widget _buildTypingIndicator() {
    return Container(
      padding: const EdgeInsets.symmetric(vertical: 8, horizontal: 16),
      child: Row(
        children: [
          _buildAvatar(true),
          const SizedBox(width: 8),
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: widget.isDarkMode ? const Color(0xFF1E1E1E) : Colors.white,
              borderRadius: BorderRadius.circular(16),
              border: Border.all(
                color: widget.isDarkMode ? const Color(0xFF3A3A3A) : Colors.grey.shade200,
              ),
            ),
            child: Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                _buildDot(0),
                _buildDot(100),
                _buildDot(200),
                const SizedBox(width: 8),
                Text(
                  'AI is thinking...',
                  style: TextStyle(
                    color: widget.isDarkMode ? Colors.grey.shade400 : Colors.grey.shade600,
                    fontSize: 14,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildDot(int delay) {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 2),
      child: PulsingDot(
        color: widget.isDarkMode ? Colors.grey.shade600 : Colors.grey.shade400,
        delay: delay,
      ),
    );
  }

  void _sendMessage() {
    if (_messageController.text.trim().isEmpty) return;

    setState(() {
      _messages.add(ChatMessage(
        text: _messageController.text,
        isBot: false,
        timestamp: DateTime.now(),
      ));
      _isTyping = true;
    });

    final userMessage = _messageController.text;
    _messageController.clear();
    _scrollToBottom();

    // Simulate bot response
    Future.delayed(const Duration(milliseconds: 1500), () {
      setState(() {
        _isTyping = false;
        _messages.add(_generateBotResponse(userMessage));
      });
      _scrollToBottom();
    });
  }

  void _handleQuickAction(String action) {
    final responses = {
      'track': 'Opening live tracking map...',
      'reports': 'Navigating to reports dashboard...',
      'support': 'Connecting you to support team...',
      'map': 'Loading real-time drone locations...',
      'details': 'Fetching detailed drone telemetry...',
      'return': 'Initiating emergency return protocol...',
      'backup': 'Checking available backup drones...',
      'weather': 'Loading detailed weather forecast...',
      'planning': 'Opening flight planning tools...',
      'analytics': 'Loading analytics dashboard...',
      'export': 'Preparing report for export...',
    };

    setState(() {
      _messages.add(ChatMessage(
        text: responses[action] ?? 'Processing your request...',
        isBot: true,
        timestamp: DateTime.now(),
      ));
    });
    _scrollToBottom();
  }

  ChatMessage _generateBotResponse(String userQuery) {
    final query = userQuery.toLowerCase();
    
    if (query.contains('drone') && (query.contains('status') || query.contains('where'))) {
      return ChatMessage(
        text: 'I can see your active drones right now. DRONE-001 is currently in transit to Emergency Camp Alpha (2.3km away), DRONE-002 is delivering to Rescue Station Beta (150m away), and DRONE-003 is returning to base. All systems are operational.',
        isBot: true,
        timestamp: DateTime.now(),
        quickActions: [
          const QuickAction(label: 'View Live Map', icon: Icons.location_on, action: 'map'),
          const QuickAction(label: 'Drone Details', icon: Icons.flight, action: 'details'),
        ],
      );
    }
    
    if (query.contains('delivery') && query.contains('issue')) {
      return ChatMessage(
        text: 'I don\'t see any critical delivery issues at the moment. However, DRONE-003 has a low battery warning (45%). Would you like me to initiate an early return protocol or check alternative drones for backup?',
        isBot: true,
        timestamp: DateTime.now(),
        quickActions: [
          const QuickAction(label: 'Return Protocol', icon: Icons.warning, action: 'return'),
          const QuickAction(label: 'Backup Drones', icon: Icons.flight, action: 'backup'),
        ],
      );
    }
    
    if (query.contains('weather')) {
      return ChatMessage(
        text: 'Current weather conditions are favorable for drone operations. Wind speed: 12 mph, Visibility: 8 miles, No precipitation. All zones are clear for delivery missions.',
        isBot: true,
        timestamp: DateTime.now(),
        quickActions: [
          const QuickAction(label: 'Detailed Forecast', icon: Icons.schedule, action: 'weather'),
          const QuickAction(label: 'Flight Planning', icon: Icons.location_on, action: 'planning'),
        ],
      );
    }
    
    if (query.contains('report') || query.contains('analytics')) {
      return ChatMessage(
        text: 'Your mission performance this month: 523 total deliveries with 98.2% success rate. Average delivery time has improved to 15 minutes. Would you like to see detailed analytics or export a report?',
        isBot: true,
        timestamp: DateTime.now(),
        quickActions: [
          const QuickAction(label: 'View Analytics', icon: Icons.bar_chart, action: 'analytics'),
          const QuickAction(label: 'Export Report', icon: Icons.bar_chart, action: 'export'),
        ],
      );
    }

    return ChatMessage(
      text: 'I understand you\'re asking about drone operations. I can help you with drone tracking, delivery status, performance reports, weather conditions, and troubleshooting. Could you be more specific about what you need assistance with?',
      isBot: true,
      timestamp: DateTime.now(),
      quickActions: [
        const QuickAction(label: 'Track Drone', icon: Icons.location_on, action: 'track'),
        const QuickAction(label: 'View Reports', icon: Icons.bar_chart, action: 'reports'),
        const QuickAction(label: 'Check Weather', icon: Icons.schedule, action: 'weather'),
      ],
    );
  }

  String _formatTime(DateTime time) {
    final now = DateTime.now();
    final difference = now.difference(time);
    
    if (difference.inMinutes < 1) {
      return 'Just now';
    } else if (difference.inMinutes < 60) {
      return '${difference.inMinutes}m ago';
    } else if (difference.inHours < 24) {
      return '${difference.inHours}h ago';
    } else {
      return '${time.day}/${time.month}';
    }
  }

  @override
  void dispose() {
    _messageController.dispose();
    _scrollController.dispose();
    super.dispose();
  }
}

class PulsingDot extends StatefulWidget {
  final Color? color;
  final int delay;

  const PulsingDot({super.key, this.color, this.delay = 0});

  @override
  State<PulsingDot> createState() => _PulsingDotState();
}

class _PulsingDotState extends State<PulsingDot> with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _animation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: const Duration(milliseconds: 1500),
      vsync: this,
    );
    _animation = Tween<double>(begin: 0.5, end: 1.0).animate(
      CurvedAnimation(parent: _controller, curve: Curves.easeInOut),
    );
    Future.delayed(Duration(milliseconds: widget.delay), () {
      _controller.repeat(reverse: true);
    });
  }

  @override
  Widget build(BuildContext context) {
    return FadeTransition(
      opacity: _animation,
      child: Container(
        width: 8,
        height: 8,
        decoration: BoxDecoration(
          color: widget.color ?? Colors.grey.shade400,
          shape: BoxShape.circle,
        ),
      ),
    );
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }
}
