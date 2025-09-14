import 'package:flutter/material.dart';

class AppTheme {
  // Light Theme Colors
  static const Color lightPrimary = Color(0xFF2563EB);      // blue-600
  static const Color lightSecondary = Color(0xFFE5E7EB);    // gray-200
  static const Color lightBackground = Color(0xFFF8F9FA);   // gray-50
  static const Color lightSurface = Colors.white;
  static const Color lightText = Color(0xFF111827);         // slate-900
  static const Color lightTextSecondary = Color(0xFF4B5563);// gray-600
  static const Color lightBorder = Color(0xFFE5E7EB);       // gray-200
  static const Color lightDivider = Color(0xFFE5E7EB);      // gray-200

  // Dark Theme Colors (Material 3 Dark Theme)
  static const Color darkPrimary = Color(0xFFBB86FC);       // Purple accent
  static const Color darkSecondary = Color(0xFF03DAC6);     // Teal accent
  static const Color darkBackground = Color(0xFF121212);     // Dark background
  static const Color darkSurface = Color(0xFF1E1E1E);       // Dark surface
  static const Color darkText = Color(0xFFFFFFFF);          // White text
  static const Color darkTextSecondary = Color(0xFFB0B0B0); // Gray text
  static const Color darkBorder = Color(0xFF3A3A3A);        // Dark border
  static const Color darkDivider = Color(0xFF2C2C2C);       // Dark divider
  
  // Status Colors
  static const Color successLight = Color(0xFF22C55E);      // green-500
  static const Color successDark = Color(0xFF03DAC6);       // Material dark success
  static const Color warningLight = Color(0xFFF59E0B);      // amber-500
  static const Color warningDark = Color(0xFFCF6679);       // Material dark warning
  static const Color errorLight = Color(0xFFEF4444);        // red-500
  static const Color errorDark = Color(0xFFCF6679);         // Material dark error
  
  // Mission Status Colors
  static const inTransitLight = Color(0xFF3B82F6);         // blue-500
  static const inTransitDark = Color(0xFFBB86FC);          // Material purple
  static const deliveringLight = Color(0xFFF97316);        // orange-500
  static const deliveringDark = Color(0xFFCF6679);         // Material pink
  static const returningLight = Color(0xFF22C55E);         // green-500
  static const returningDark = Color(0xFF03DAC6);          // Material teal
  static const standbyLight = Color(0xFF6B7280);           // gray-500
  static const standbyDark = Color(0xFF757575);            // Material gray

  // Card Gradients
  static const inTransitGradientLight = [Color(0x333B82F6), Color(0x1A3B82F6)]; // blue-500/20 to blue-600/10
  static const inTransitGradientDark = [Color(0x33BB86FC), Color(0x1ABB86FC)];  // Material purple gradients
  static const deliveringGradientLight = [Color(0x33F97316), Color(0x1AF97316)]; // orange-500/20 to orange-600/10
  static const deliveringGradientDark = [Color(0x33CF6679), Color(0x1ACF6679)];  // Material pink gradients
  static const returningGradientLight = [Color(0x3322C55E), Color(0x1A22C55E)];  // green-500/20 to green-600/10
  static const returningGradientDark = [Color(0x3303DAC6), Color(0x1A03DAC6)];   // Material teal gradients
  static const standbyGradientLight = [Color(0x336B7280), Color(0x1A6B7280)];    // gray-500/20 to gray-600/10
  static const standbyGradientDark = [Color(0x33757575), Color(0x1A757575)];     // Material gray gradients

  // Shadows
  static final BoxShadow cardShadowLight = BoxShadow(
    color: Colors.black.withValues(alpha: 0.1),
    blurRadius: 10,
    offset: const Offset(0, 4),
  );
  
  static final BoxShadow cardShadowDark = BoxShadow(
    color: Colors.black.withValues(alpha: 0.3),
    blurRadius: 10,
    offset: const Offset(0, 4),
  );

  // Text Styles
  static const TextStyle heading1 = TextStyle(
    fontSize: 24,
    fontWeight: FontWeight.bold,
    letterSpacing: -0.5,
  );

  static const TextStyle heading2 = TextStyle(
    fontSize: 20,
    fontWeight: FontWeight.w600,
    letterSpacing: -0.25,
  );

  static const TextStyle heading3 = TextStyle(
    fontSize: 16,
    fontWeight: FontWeight.w600,
  );

  static const TextStyle body1 = TextStyle(
    fontSize: 14,
    fontWeight: FontWeight.normal,
  );

  static const TextStyle body2 = TextStyle(
    fontSize: 12,
    fontWeight: FontWeight.normal,
  );

  static const TextStyle caption = TextStyle(
    fontSize: 10,
    fontWeight: FontWeight.normal,
    letterSpacing: 0.4,
  );

  // Button Styles
  static final ButtonStyle primaryButton = ButtonStyle(
    padding: WidgetStateProperty.all(const EdgeInsets.symmetric(horizontal: 16, vertical: 8)),
    shape: WidgetStateProperty.all(RoundedRectangleBorder(borderRadius: BorderRadius.circular(8))),
  );

  static final ButtonStyle secondaryButton = ButtonStyle(
    padding: WidgetStateProperty.all(const EdgeInsets.symmetric(horizontal: 16, vertical: 8)),
    shape: WidgetStateProperty.all(RoundedRectangleBorder(borderRadius: BorderRadius.circular(8))),
    backgroundColor: WidgetStateProperty.resolveWith((states) {
      return states.contains(WidgetState.disabled) ? Colors.grey : Colors.transparent;
    }),
  );
}