import { Exam } from './types';

// Helper function to create dates relative to current date
const daysFromNow = (days: number): Date => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
};

// Helper function to create hours from now
const hoursFromNow = (hours: number): Date => {
  const date = new Date();
  date.setHours(date.getHours() + hours);
  return date;
};

export const exams: Exam[] = [
  {
    id: '1',
    title: 'Introduction to JavaScript',
    description: 'Fundamentals of JavaScript programming language including variables, functions, and basic DOM manipulation.',
    duration: 60, // 60 minutes
    startDate: daysFromNow(-2), // Started 2 days ago
    endDate: daysFromNow(5), // Ends in 5 days
    attempted: true,
    progress: 85,
  },
  {
    id: '2',
    title: 'Advanced React Concepts',
    description: 'Deep dive into React hooks, context API, performance optimization, and advanced patterns.',
    duration: 90,
    startDate: daysFromNow(-1),
    endDate: daysFromNow(3),
    attempted: false,
  },
  {
    id: '3',
    title: 'Database Design Principles',
    description: 'Learn about relational database design, normalization, indexing strategies, and query optimization.',
    duration: 120,
    startDate: hoursFromNow(2), // Starts in 2 hours
    endDate: daysFromNow(7),
    attempted: false,
  },
  {
    id: '4',
    title: 'UI/UX Design Fundamentals',
    description: 'Explore user-centered design principles, wireframing, prototyping, and usability testing methodologies.',
    duration: 75,
    startDate: daysFromNow(-10),
    endDate: daysFromNow(-2), // Ended 2 days ago
    attempted: true,
    progress: 100,
  },
  {
    id: '5',
    title: 'Cloud Computing Essentials',
    description: 'Introduction to cloud service models, deployment strategies, and popular cloud platforms.',
    duration: 120,
    startDate: daysFromNow(1), // Starts tomorrow
    endDate: daysFromNow(10),
    attempted: false,
  },
  {
    id: '6',
    title: 'Machine Learning Basics',
    description: 'Fundamentals of machine learning algorithms, data preprocessing, and model evaluation techniques.',
    duration: 150,
    startDate: hoursFromNow(-5), // Started 5 hours ago
    endDate: daysFromNow(2),
    attempted: true,
    progress: 30,
  },
  {
    id: '7',
    title: 'Mobile App Development',
    description: 'Learn about cross-platform app development, responsive design, and mobile-specific UI/UX considerations.',
    duration: 90,
    startDate: daysFromNow(3),
    endDate: daysFromNow(15),
    attempted: false,
  },
  {
    id: '8',
    title: 'Cybersecurity Principles',
    description: 'Overview of common security threats, encryption methods, and best practices for securing applications.',
    duration: 120,
    startDate: daysFromNow(0), // Starts today
    endDate: daysFromNow(7),
    attempted: false,
  }
];