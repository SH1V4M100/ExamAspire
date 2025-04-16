# API Integration

This document outlines how ExamAspire integrates with backend services and handles API calls.

## API Architecture

- RESTful API endpoints
- JSON data format
- Token-based authentication
- Error handling middleware

## Base Configuration

```typescript
// src/config/api.ts
const API_BASE_URL = import.meta.env.VITE_API_URL;

const defaultHeaders = {
  'Content-Type': 'application/json',
};

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};
```

## API Endpoints

### Authentication

```typescript
/auth/login     // POST - User login
/auth/register  // POST - User registration
/auth/logout    // POST - User logout
```

### Exam Management

```typescript
/exams          // GET - List all exams
/exams/:id      // GET - Get exam details
/exams/:id/start // POST - Start an exam
/exams/:id/submit // POST - Submit exam answers
```

### User Profile

```typescript
/profile        // GET - Get user profile
/profile/update // PUT - Update user profile
```

## Error Handling

```typescript
interface APIError {
  status: number;
  message: string;
  details?: any;
}

const handleAPIError = (error: APIError) => {
  switch (error.status) {
    case 401:
      // Handle unauthorized
      break;
    case 404:
      // Handle not found
      break;
    default:
      // Handle other errors
  }
};
```

## Data Models

### User Model

```typescript
interface User {
  id: string;
  username: string;
  email: string;
  profile: {
    firstName: string;
    lastName: string;
    avatar?: string;
  };
}
```

### Exam Model

```typescript
interface Exam {
  id: string;
  title: string;
  description: string;
  duration: number;
  questions: Question[];
  startTime?: Date;
  endTime?: Date;
}
```

## Best Practices

1. **Error Handling**
   - Implement consistent error handling
   - Provide meaningful error messages
   - Log errors appropriately

2. **Authentication**
   - Use secure token storage
   - Implement token refresh mechanism
   - Handle session expiration

3. **Data Caching**
   - Cache frequently accessed data
   - Implement cache invalidation
   - Use appropriate caching strategies

4. **Performance**
   - Minimize API calls
   - Implement request debouncing
   - Use pagination for large datasets

## Testing

- Unit tests for API utilities
- Mock API responses in tests
- Test error scenarios
- Integration tests for API flows
