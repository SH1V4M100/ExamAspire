# Timer Component

The Timer component is a reusable UI element that provides countdown functionality for timed activities like exams or quizzes.

## Location

`src/components/Timer.tsx`

## Overview

The Timer component displays a countdown timer and can be configured with different durations. It supports features like pausing, resuming, and handling timer completion.

## Props

| Prop | Type | Description | Required |
|------|------|-------------|----------|
| duration | number | Initial duration in seconds | Yes |
| onComplete | () => void | Callback function when timer reaches zero | No |
| className | string | Additional CSS classes | No |

## Usage

```tsx
import Timer from '../components/Timer';

function ExamPage() {
  const handleTimeUp = () => {
    // Handle timer completion
    console.log('Time is up!');
  };

  return (
    <Timer 
      duration={3600} // 1 hour in seconds
      onComplete={handleTimeUp}
      className="text-xl font-bold"
    />
  );
}
```

## Features

- Countdown display in HH:MM:SS format
- Pause/Resume functionality
- Completion callback
- Customizable styling through Tailwind CSS classes

## Implementation Details

- Uses React's useState and useEffect hooks for state management
- Implements interval-based countdown logic
- Handles cleanup on component unmount
- Supports dynamic duration updates

## Best Practices

1. Always provide a duration prop
2. Handle the onComplete callback for proper exam/quiz state management
3. Use appropriate Tailwind CSS classes for consistent styling
4. Clean up intervals when component unmounts

## Related Components

- ExamPage
- QuizTimer
- CountdownDisplay
