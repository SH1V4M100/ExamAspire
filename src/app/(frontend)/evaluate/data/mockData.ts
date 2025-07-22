import { ExamAttempt } from '@/lib/types';

export const mockExamAttempts: ExamAttempt[] = [
  {
    id: 1,
    user: {
      id: 15,
      name: "Biswadeep Dhar",
      completedExams: [1, 2],
      contactNumber: "8585069082",
      email: "manasdhar82@gmail.com"
    },
    exam: {
      id: 1,
      title: "JEE Main Mock Test 1",
      duration: 180,
      isNegativeMarkingEnabled: true,
      startDate: "2025-01-10T03:30:00.000Z",
      endDate: "2025-01-12T12:30:00.000Z"
    },
    score: 85,
    totalMarks: 300,
    physicsScore: 28.5,
    physicsTotal: 100,
    chemistryScore: 31.25,
    chemistryTotal: 100,
    mathsScore: 25.25,
    mathsTotal: 100,
    submittedAt: "2025-01-11T14:47:02.322Z",
    updatedAt: "2025-01-11T14:47:02.562Z",
    createdAt: "2025-01-11T14:47:02.433Z"
  },
  {
    id: 2,
    user: {
      id: 15,
      name: "Biswadeep Dhar",
      completedExams: [1, 2],
      contactNumber: "8585069082",
      email: "manasdhar82@gmail.com"
    },
    exam: {
      id: 2,
      title: "JEE Advanced Practice Test",
      duration: 210,
      isNegativeMarkingEnabled: true,
      startDate: "2025-01-15T03:30:00.000Z",
      endDate: "2025-01-17T12:30:00.000Z"
    },
    score: 92,
    totalMarks: 300,
    physicsScore: 32.5,
    physicsTotal: 100,
    chemistryScore: 29.75,
    chemistryTotal: 100,
    mathsScore: 29.75,
    mathsTotal: 100,
    submittedAt: "2025-01-16T16:23:45.123Z",
    updatedAt: "2025-01-16T16:23:45.456Z",
    createdAt: "2025-01-16T16:23:45.234Z"
  },
  {
    id: 3,
    user: {
      id: 22,
      name: "Priya Sharma",
      completedExams: [1, 2, 3],
      contactNumber: "9876543210",
      email: "priya.sharma@email.com"
    },
    exam: {
      id: 1,
      title: "JEE Main Mock Test 1",
      duration: 180,
      isNegativeMarkingEnabled: true,
      startDate: "2025-01-10T03:30:00.000Z",
      endDate: "2025-01-12T12:30:00.000Z"
    },
    score: 78,
    totalMarks: 300,
    physicsScore: 26.25,
    physicsTotal: 100,
    chemistryScore: 28.5,
    chemistryTotal: 100,
    mathsScore: 23.25,
    mathsTotal: 100,
    submittedAt: "2025-01-11T10:15:30.789Z",
    updatedAt: "2025-01-11T10:15:31.012Z",
    createdAt: "2025-01-11T10:15:30.890Z"
  },
  {
    id: 4,
    user: {
      id: 22,
      name: "Priya Sharma",
      completedExams: [1, 2, 3],
      contactNumber: "9876543210",
      email: "priya.sharma@email.com"
    },
    exam: {
      id: 3,
      title: "NEET Practice Test",
      duration: 180,
      isNegativeMarkingEnabled: true,
      startDate: "2025-01-20T03:30:00.000Z",
      endDate: "2025-01-22T12:30:00.000Z"
    },
    score: 145,
    totalMarks: 180,
    physicsScore: 48.75,
    physicsTotal: 60,
    chemistryScore: 52.5,
    chemistryTotal: 60,
    mathsScore: 43.75,
    mathsTotal: 60,
    submittedAt: "2025-01-21T11:45:22.567Z",
    updatedAt: "2025-01-21T11:45:22.890Z",
    createdAt: "2025-01-21T11:45:22.678Z"
  },
  {
    id: 5,
    user: {
      id: 33,
      name: "Raj Kumar",
      completedExams: [1],
      contactNumber: "7654321098",
      email: "raj.kumar@email.com"
    },
    exam: {
      id: 1,
      title: "JEE Main Mock Test 1",
      duration: 180,
      isNegativeMarkingEnabled: true,
      startDate: "2025-01-10T03:30:00.000Z",
      endDate: "2025-01-12T12:30:00.000Z"
    },
    score: 65,
    totalMarks: 300,
    physicsScore: 22.5,
    physicsTotal: 100,
    chemistryScore: 20.25,
    chemistryTotal: 100,
    mathsScore: 22.25,
    mathsTotal: 100,
    submittedAt: "2025-01-12T08:30:15.234Z",
    updatedAt: "2025-01-12T08:30:15.567Z",
    createdAt: "2025-01-12T08:30:15.345Z"
  },
  {
    id: 6,
    user: {
      id: 44,
      name: "Anita Singh",
      completedExams: [2, 3],
      contactNumber: "8765432109",
      email: "anita.singh@email.com"
    },
    exam: {
      id: 2,
      title: "JEE Advanced Practice Test",
      duration: 210,
      isNegativeMarkingEnabled: true,
      startDate: "2025-01-15T03:30:00.000Z",
      endDate: "2025-01-17T12:30:00.000Z"
    },
    score: 110,
    totalMarks: 300,
    physicsScore: 38.25,
    physicsTotal: 100,
    chemistryScore: 35.5,
    chemistryTotal: 100,
    mathsScore: 36.25,
    mathsTotal: 100,
    submittedAt: "2025-01-16T14:20:33.456Z",
    updatedAt: "2025-01-16T14:20:33.789Z",
    createdAt: "2025-01-16T14:20:33.567Z"
  }
];