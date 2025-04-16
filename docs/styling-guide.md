# Styling Guide

This document outlines the styling conventions and best practices for the ExamAspire project.

## Technology Stack

- **Tailwind CSS**: Primary styling framework
- **CSS Modules**: For component-specific styles
- **PostCSS**: For processing CSS

## Tailwind CSS Usage

### Configuration

The project uses a custom Tailwind configuration in `tailwind.config.js`:

```javascript
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      // Custom theme extensions
    }
  },
  plugins: []
}
```

### Best Practices

1. **Use Utility Classes**
   ```jsx
   // Prefer this
   <div className="p-4 bg-white rounded-lg shadow-md">
   
   // Instead of custom CSS
   <div className="card">
   ```

2. **Component-Specific Classes**
   ```jsx
   // Group related utilities
   const buttonClasses = "px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600";
   ```

3. **Responsive Design**
   ```jsx
   <div className="text-sm md:text-base lg:text-lg">
   ```

## Theme System

### Colors

- Primary: Blue-500 (`#3B82F6`)
- Secondary: Gray-600 (`#4B5563`)
- Accent: Indigo-500 (`#6366F1`)
- Success: Green-500 (`#10B981`)
- Error: Red-500 (`#EF4444`)

### Typography

- Font Family: Inter (Primary), System UI (Fallback)
- Base Size: 16px (1rem)
- Scale: 1.25 (Major Third)

### Spacing

- Base Unit: 4px (0.25rem)
- Common Spacing: 16px (1rem), 24px (1.5rem), 32px (2rem)

## Component Styling

### Buttons

```jsx
// Primary Button
<button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">

// Secondary Button
<button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50">
```

### Forms

```jsx
// Input Field
<input className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500">

// Form Label
<label className="block text-sm font-medium text-gray-700">
```

### Cards

```jsx
<div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
```

## Dark Mode

- Use `dark:` variant for dark mode styles
- Example:
  ```jsx
  <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
  ```

## Accessibility

1. **Color Contrast**
   - Maintain WCAG 2.1 AA standard
   - Use Tailwind's color palette for accessible combinations

2. **Focus States**
   - Always visible focus indicators
   - Use `focus:ring-2` for keyboard navigation

## Performance

1. **Purge Unused Styles**
   - Production builds automatically remove unused styles
   - Keep class names dynamic using string concatenation

2. **Responsive Images**
   - Use `aspect-ratio` utilities
   - Implement lazy loading with `loading="lazy"`

## Common Patterns

### Layout

```jsx
// Container
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

// Grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
```

### Animation

```jsx
// Hover Effects
<div className="transform hover:scale-105 transition-transform">

// Loading States
<div className="animate-pulse bg-gray-200">
```

## Code Review Checklist

- [ ] Consistent class naming convention
- [ ] Responsive design implementation
- [ ] Accessibility compliance
- [ ] Dark mode support
- [ ] Performance optimization
