import 'package:flutter/material.dart';

// Equivalent to shadcn/ui card component
class StyledCard extends StatelessWidget {
  final Widget child;
  final Color? backgroundColor;
  final Color? borderColor;
  final double? elevation;
  final BorderRadius? borderRadius;

  const StyledCard({
    super.key,
    required this.child,
    this.backgroundColor,
    this.borderColor,
    this.elevation = 4,
    this.borderRadius,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: elevation,
      color: backgroundColor,
      shape: RoundedRectangleBorder(
        borderRadius: borderRadius ?? BorderRadius.circular(12),
        side: borderColor != null
            ? BorderSide(color: borderColor!)
            : BorderSide.none,
      ),
      child: child,
    );
  }
}

// Equivalent to shadcn/ui button component
class StyledButton extends StatelessWidget {
  final VoidCallback onPressed;
  final Widget child;
  final Color? backgroundColor;
  final Color? textColor;
  final Color? borderColor;
  final EdgeInsets? padding;
  final BorderRadius? borderRadius;
  final double? elevation;
  final bool isLoading;
  final bool isDisabled;
  final String? variant; // primary, secondary, outline, ghost

  const StyledButton({
    super.key,
    required this.onPressed,
    required this.child,
    this.backgroundColor,
    this.textColor,
    this.borderColor,
    this.padding,
    this.borderRadius,
    this.elevation = 2,
    this.isLoading = false,
    this.isDisabled = false,
    this.variant = 'primary',
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    
    Color bg = backgroundColor ?? theme.colorScheme.primary;
    Color text = textColor ?? Colors.white;
    double elevationValue = elevation ?? 2;
    Color border = borderColor ?? Colors.transparent;

    // Handle different button variants
    switch (variant) {
      case 'secondary':
        bg = backgroundColor ?? theme.colorScheme.secondary;
        text = textColor ?? Colors.white;
        break;
      case 'outline':
        bg = backgroundColor ?? Colors.transparent;
        text = textColor ?? theme.colorScheme.primary;
        border = borderColor ?? theme.colorScheme.primary;
        elevationValue = 0;
        break;
      case 'ghost':
        bg = backgroundColor ?? Colors.transparent;
        text = textColor ?? theme.colorScheme.primary;
        border = Colors.transparent;
        elevationValue = 0;
        break;
    }

    if (isDisabled) {
      bg = bg.withValues(alpha: 0.5);
      text = text.withValues(alpha: 0.5);
      border = border.withValues(alpha: 0.5);
    }

    return ElevatedButton(
      onPressed: isDisabled || isLoading ? null : onPressed,
      style: ElevatedButton.styleFrom(
        backgroundColor: bg,
        foregroundColor: text,
        padding: padding ?? const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
        shape: RoundedRectangleBorder(
          borderRadius: borderRadius ?? BorderRadius.circular(8),
          side: BorderSide(color: border),
        ),
        elevation: elevationValue,
      ),
      child: isLoading
          ? SizedBox(
              width: 20,
              height: 20,
              child: CircularProgressIndicator(
                strokeWidth: 2,
                valueColor: AlwaysStoppedAnimation<Color>(text),
              ),
            )
          : child,
    );
  }
}

// Equivalent to shadcn/ui badge component
class StyledBadge extends StatelessWidget {
  final Widget child;
  final Color? backgroundColor;
  final Color? textColor;
  final EdgeInsets? padding;
  final BorderRadius? borderRadius;

  const StyledBadge({
    super.key,
    required this.child,
    this.backgroundColor,
    this.textColor,
    this.padding,
    this.borderRadius,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: padding ?? const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
      decoration: BoxDecoration(
        color: backgroundColor ?? Theme.of(context).colorScheme.primary,
        borderRadius: borderRadius ?? BorderRadius.circular(16),
      ),
      child: DefaultTextStyle(
        style: TextStyle(
          color: textColor ?? Colors.white,
          fontSize: 12,
          fontWeight: FontWeight.w500,
        ),
        child: child,
      ),
    );
  }
}

// Equivalent to shadcn/ui alert component
class StyledAlert extends StatelessWidget {
  final Widget child;
  final Color? backgroundColor;
  final Color? borderColor;
  final Color? textColor;
  final EdgeInsets? padding;
  final BorderRadius? borderRadius;
  final String? severity;

  const StyledAlert({
    super.key,
    required this.child,
    this.backgroundColor,
    this.borderColor,
    this.textColor,
    this.padding,
    this.borderRadius,
    this.severity,
  });

  @override
  Widget build(BuildContext context) {
    Color bgColor = backgroundColor ?? Colors.blue.withValues(alpha: 0.1);
    Color border = borderColor ?? Colors.blue.withValues(alpha: 0.3);
    Color text = textColor ?? Colors.blue.shade900;

    if (severity == 'critical') {
      bgColor = Colors.red.withValues(alpha: 0.1);
      border = Colors.red.withValues(alpha: 0.3);
      text = Colors.red.shade900;
    } else if (severity == 'warning') {
      bgColor = Colors.orange.withValues(alpha: 0.1);
      border = Colors.orange.withValues(alpha: 0.3);
      text = Colors.orange.shade900;
    }

    return Container(
      padding: padding ?? const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: bgColor,
        border: Border.all(color: border),
        borderRadius: borderRadius ?? BorderRadius.circular(8),
      ),
      child: DefaultTextStyle(
        style: TextStyle(color: text),
        child: child,
      ),
    );
  }
}