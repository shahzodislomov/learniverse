# CTFVexura Design System

## Overview
A comprehensive dark hacker-themed design system with neon green/cyan accents, glassmorphism effects, and smooth animations.

## Color Palette

### Primary Colors
- **Hacker Green**: `#00ff41` - Primary accent color for CTF elements
- **Hacker Cyan**: `#00ffff` - Secondary accent color for highlights
- **Hacker Dark**: `#0a0a0a` - Main background color
- **Hacker Gray**: `#1a1a1a` - Secondary background
- **Hacker Gray Light**: `#2a2a2a` - Tertiary background

### Additional Colors
- **Neon**: `#00ff9c` - Alternative neon accent
- **Cyber**: `#00eaff` - Alternative cyber accent

## Typography

- **Font Family**: Monospace (ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas)
- **Headings**: Bold, with glow effects on main titles
- **Body**: Regular weight, gray-100 to gray-400 for readability

## Design Components

### Glassmorphism
- **`.glass`**: Light glass effect with blur
  - Background: `rgba(26, 26, 26, 0.7)`
  - Backdrop blur: `10px`
  - Border: `rgba(0, 255, 65, 0.2)`

- **`.glass-strong`**: Strong glass effect
  - Background: `rgba(10, 10, 10, 0.9)`
  - Backdrop blur: `20px`
  - Border: `rgba(0, 255, 65, 0.3)`

### Glow Effects
- **`.text-glow-green`**: Green text glow shadow
- **`.text-glow-cyan`**: Cyan text glow shadow
- **`.shadow-glow-green`**: Green box shadow glow
- **`.shadow-glow-cyan`**: Cyan box shadow glow
- **`.shadow-glow-green-sm`**: Small green glow

### Animations
- **Pulse Glow**: Pulsing glow effect for attention
- **Shake**: Horizontal shake animation for errors
- **Hover Effects**: Scale, translate, and glow on hover
- **Page Transitions**: Fade and slide animations

## Component Styles

### Buttons
- Primary: Green background with border, hover glow
- Secondary: Glass effect with cyan border
- Hover: Scale up, glow effect, color transitions

### Cards
- Glass background
- Border glow on hover
- Smooth scale and translate animations
- Solved challenges: Green tint with checkmark

### Forms
- Dark input backgrounds
- Green border on focus
- Glow effect on active inputs
- Error shake animation

### Modals
- Strong glass background
- Green border with glow
- Smooth open/close animations
- Success/error state animations

### Scoreboard
- Top 3 highlighted with special borders
- Animated row entries
- Trophy icons for top ranks
- Hover glow effects

### Progress Bars
- Gradient fill (green to cyan)
- Animated shimmer effect
- Glow shadow

## Responsive Design

- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px)
- Collapsible mobile menu
- Responsive grid layouts
- Touch-friendly button sizes

## Accessibility

- High contrast text
- Clear focus states
- Semantic HTML
- Keyboard navigation support
- Screen reader friendly

## Custom Scrollbar

- Width: 8px
- Track: Dark background
- Thumb: Green, changes to cyan on hover
- Rounded corners

## Background Effects

- Radial gradients for depth
- Subtle noise texture
- Grid pattern overlay
- Multiple gradient layers

## Best Practices

1. **Consistency**: Use design tokens consistently
2. **Hierarchy**: Use glow effects sparingly for emphasis
3. **Performance**: Optimize animations for 60fps
4. **Accessibility**: Maintain contrast ratios
5. **Responsive**: Test on all screen sizes

