import { Question } from "../types";
export const questions: Question[] = [
  {
    id: 1,
    type: 'image',
    content: 'https://images.unsplash.com/photo-1461988320302-91bde64fc8e4?w=800&auto=format&fit=crop',
    options: [
      'This is a spiral galaxy',
      'This is a nebula',
      'This is a star cluster',
      'This is a black hole'
    ],
    correctAnswer: 0
  },
  {
    id: 2,
    type: 'image',
    content: 'https://images.unsplash.com/photo-1614642264762-d0a3b8bf3700?w=800&auto=format&fit=crop',
    options: [
      'Cumulus clouds',
      'Stratus clouds',
      'Nimbus clouds',
      'Cirrus clouds'
    ],
    correctAnswer: 3
  },
  {
    id: 3,
    type: 'text',
    content: 'What is the capital of France?',
    options: ['London', 'Berlin', 'Paris', 'Madrid'],
    correctAnswer: 2
  }
];