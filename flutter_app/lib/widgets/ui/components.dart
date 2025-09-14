import 'package:flutter/material.dart';

// Alert Component
class Alert extends StatelessWidget {
  final Widget? icon;
  final Widget? title;
  final Widget? description;
  final String variant;

  const Alert({
    super.key,
    this.icon,
    this.title,
    this.description,
    this.variant = 'default',
  });

  @override
  Widget build(BuildContext context) {
    final isDarkMode = Theme.of(context).brightness == Brightness.dark;
    
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: _getBackgroundColor(isDarkMode),
        borderRadius: BorderRadius.circular(8),
        border: Border.all(
          color: _getBorderColor(isDarkMode),
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisSize: MainAxisSize.min,
        children: [
          if (title != null) AlertTitle(child: title!),
          if (description != null) AlertDescription(child: description!),
        ],
      ),
    );
  }

  Color _getBackgroundColor(bool isDarkMode) {
    switch (variant) {
      case 'destructive':
        return isDarkMode ? const Color(0xFF1E1E1E) : Colors.white;
      default:
        return isDarkMode ? const Color(0xFF1E1E1E) : Colors.white;
    }
  }

  Color _getBorderColor(bool isDarkMode) {
    switch (variant) {
      case 'destructive':
        return isDarkMode ? const Color(0xFFCF6679) : const Color(0xFFEF4444);
      default:
        return isDarkMode ? const Color(0xFF3A3A3A) : const Color(0xFFE5E7EB);
    }
  }
}

class AlertTitle extends StatelessWidget {
  final Widget child;

  const AlertTitle({super.key, required this.child});

  @override
  Widget build(BuildContext context) {
    return DefaultTextStyle(
      style: const TextStyle(
        fontSize: 16,
        fontWeight: FontWeight.w600,
        height: 1.5,
      ),
      child: child,
    );
  }
}

class AlertDescription extends StatelessWidget {
  final Widget child;

  const AlertDescription({super.key, required this.child});

  @override
  Widget build(BuildContext context) {
    final isDarkMode = Theme.of(context).brightness == Brightness.dark;
    
    return DefaultTextStyle(
      style: TextStyle(
        fontSize: 14,
        color: isDarkMode ? const Color(0xFFE0E0E0) : const Color(0xFF6B7280),
        height: 1.5,
      ),
      child: child,
    );
  }
}

// Button Component
class Button extends StatelessWidget {
  final Widget child;
  final VoidCallback? onPressed;
  final String variant;
  final String size;
  final bool disabled;
  final bool loading;

  const Button({
    super.key,
    required this.child,
    this.onPressed,
    this.variant = 'default',
    this.size = 'default',
    this.disabled = false,
    this.loading = false,
  });

  @override
  Widget build(BuildContext context) {
    final isDarkMode = Theme.of(context).brightness == Brightness.dark;

    return Material(
      color: Colors.transparent,
      child: InkWell(
        onTap: disabled || loading ? null : onPressed,
        borderRadius: BorderRadius.circular(8),
        child: Opacity(
          opacity: disabled ? 0.5 : 1.0,
          child: Container(
            height: _getHeight(),
            padding: _getPadding(),
            decoration: BoxDecoration(
              color: _getBackgroundColor(isDarkMode),
              border: variant == 'outline' ? Border.all(
                color: isDarkMode ? const Color(0xFF3A3A3A) : const Color(0xFFE5E7EB),
              ) : null,
              borderRadius: BorderRadius.circular(8),
            ),
            child: Center(
              child: loading
                ? const SizedBox(
                    width: 16,
                    height: 16,
                    child: CircularProgressIndicator(
                      strokeWidth: 2,
                      valueColor: AlwaysStoppedAnimation<Color>(Colors.white),
                    ),
                  )
                : DefaultTextStyle(
                    style: TextStyle(
                      fontSize: _getFontSize(),
                      fontWeight: FontWeight.w500,
                      color: _getTextColor(isDarkMode),
                    ),
                    child: child,
                  ),
            ),
          ),
        ),
      ),
    );
  }

  double _getHeight() {
    switch (size) {
      case 'sm':
        return 32; // h-8
      case 'lg':
        return 40; // h-10
      case 'icon':
        return 36; // size-9
      default:
        return 36; // h-9
    }
  }

  EdgeInsets _getPadding() {
    switch (size) {
      case 'sm':
        return const EdgeInsets.symmetric(horizontal: 12);
      case 'lg':
        return const EdgeInsets.symmetric(horizontal: 24);
      case 'icon':
        return EdgeInsets.zero;
      default:
        return const EdgeInsets.symmetric(horizontal: 16);
    }
  }

  double _getFontSize() {
    switch (size) {
      case 'sm':
        return 13;
      case 'lg':
        return 15;
      default:
        return 14;
    }
  }

  Color _getBackgroundColor(bool isDarkMode) {
    switch (variant) {
      case 'destructive':
        return isDarkMode ? const Color(0xFFCF6679) : const Color(0xFFEF4444);
      case 'outline':
      case 'ghost':
        return Colors.transparent;
      case 'secondary':
        return isDarkMode ? const Color(0xFF2C2C2C) : const Color(0xFFF3F4F6);
      default:
        return isDarkMode ? const Color(0xFFBB86FC) : const Color(0xFF2563EB);
    }
  }

  Color _getTextColor(bool isDarkMode) {
    switch (variant) {
      case 'destructive':
        return Colors.white;
      case 'outline':
      case 'ghost':
        return isDarkMode ? Colors.white : const Color(0xFF1F2937);
      case 'secondary':
        return isDarkMode ? Colors.white : const Color(0xFF1F2937);
      default:
        return isDarkMode ? Colors.black : Colors.white;
    }
  }
}

// Card Component
class Card extends StatelessWidget {
  final Widget child;

  const Card({
    super.key,
    required this.child,
  });

  @override
  Widget build(BuildContext context) {
    final isDarkMode = Theme.of(context).brightness == Brightness.dark;
    
    return Container(
      decoration: BoxDecoration(
        color: isDarkMode ? const Color(0xFF1E1E1E) : Colors.white,
        borderRadius: BorderRadius.circular(8),
        border: Border.all(
          color: isDarkMode ? const Color(0xFF3A3A3A) : const Color(0xFFE5E7EB),
        ),
      ),
      child: child,
    );
  }
}

class CardContent extends StatelessWidget {
  final Widget child;

  const CardContent({
    super.key,
    required this.child,
  });

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(16),
      child: child,
    );
  }
}

// Input Component
class Input extends StatelessWidget {
  final TextEditingController? controller;
  final String? placeholder;
  final bool obscureText;
  final ValueChanged<String>? onChanged;
  final String variant;
  final bool disabled;

  const Input({
    super.key,
    this.controller,
    this.placeholder,
    this.obscureText = false,
    this.onChanged,
    this.variant = 'default',
    this.disabled = false,
  });

  @override
  Widget build(BuildContext context) {
    final isDarkMode = Theme.of(context).brightness == Brightness.dark;

    return TextField(
      controller: controller,
      obscureText: obscureText,
      onChanged: onChanged,
      enabled: !disabled,
      style: TextStyle(
        color: isDarkMode ? Colors.white : const Color(0xFF1F2937),
      ),
      decoration: InputDecoration(
        hintText: placeholder,
        hintStyle: TextStyle(
          color: isDarkMode ? const Color(0xFF9CA3AF) : const Color(0xFF6B7280),
        ),
        filled: true,
        fillColor: isDarkMode ? const Color(0xFF2C2C2C) : Colors.white,
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(8),
          borderSide: BorderSide(
            color: isDarkMode ? const Color(0xFF3A3A3A) : const Color(0xFFE5E7EB),
          ),
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(8),
          borderSide: BorderSide(
            color: isDarkMode ? const Color(0xFF3A3A3A) : const Color(0xFFE5E7EB),
          ),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(8),
          borderSide: BorderSide(
            color: isDarkMode ? const Color(0xFFBB86FC) : const Color(0xFF2563EB),
          ),
        ),
        contentPadding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
      ),
    );
  }
}