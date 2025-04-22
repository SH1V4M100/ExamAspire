import { CollectionConfig } from 'payload'
import { authenticated } from '../access/authenticated'
import { Access } from 'payload'
import { User } from '@/payload-types'

// Custom access control for attempts
const attemptAccess: Access = ({ req: { user } }) => {
    // Admins can see all attempts
    if (user && user.role === 'admin') return true
    
    // Users can only see their own attempts
    if (user) {
      return {
        user: {
          equals: user.id,
        },
      }
    }
    
    // No access if not logged in
    return false
  }

export const Attempts: CollectionConfig = {
  slug: 'attempts',
  admin: {
    useAsTitle: 'id',
    defaultColumns: ['user', 'exam', 'startedAt', 'completedAt', 'score'],
  },
  access: {
    read: attemptAccess,
    create: authenticated,
    update: attemptAccess,
    delete: authenticated, // Attempts should never be deleted
  },
  fields: [
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      hasMany: false,
    },
    {
      name: 'exam',
      type: 'relationship',
      relationTo: 'exams',
      required: true,
      hasMany: false,
    },
    {
      name: 'startedAt',
      type: 'date',
      required: true,
      defaultValue: () => new Date(),
    },
    {
      name: 'completedAt',
      type: 'date',
    },
    {
      name: 'responses',
      type: 'array',
      fields: [
        {
          name: 'question',
          type: 'relationship',
          relationTo: 'questions',
          required: true,
        },
        {
          name: 'selectedOptions',
          type: 'array',
          fields: [
            {
              name: 'optionIndex',
              type: 'number',
              required: true,
            }
          ]
        },
        {
          name: 'isCorrect',
          type: 'checkbox',
          admin: {
            readOnly: true,
          },
        },
        {
          name: 'marks',
          type: 'number',
          admin: {
            readOnly: true,
          },
        },
      ],
    },
    {
      name: 'score',
      type: 'number',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'maxScore',
      type: 'number',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'percentage',
      type: 'number',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'isPassed',
      type: 'checkbox',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'timeSpent',
      type: 'number',
      admin: {
        description: 'Time spent in seconds',
        readOnly: true,
      },
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data, req, operation }) => {
        if (operation === 'create' && data.user && data.exam) {
          // Fetch all attempts for this user and exam
          const attempts = await req.payload.find({
            collection: 'attempts',
            where: {
              user: {
                equals: data.user,
              },
              exam: {
                equals: data.exam,
              },
            },
          });
  
          // Calculate statistics
          const stats = {
            totalAttempts: attempts.docs.length,
            successfulAttempts: attempts.docs.filter(a => a.isPassed).length,
            scores: attempts.docs.map(a => a.score).filter((score): score is number => score !== null && score !== undefined),
            timeSpent: attempts.docs.map(a => a.timeSpent).filter((time): time is number => time !== null && time !== undefined),
            questionStats: new Map(),
          };
  
          // Calculate question performance
          for (const attempt of attempts.docs) {
            if (!attempt.responses) continue;
            for (const response of attempt.responses) {
              const questionId = typeof response.question === 'object' ? response.question.id : response.question;
              if (!stats.questionStats.has(questionId)) {
                stats.questionStats.set(questionId, {
                  correctAttempts: 0,
                  totalAttempts: 0,
                });
              }
              const questionStat = stats.questionStats.get(questionId);
              questionStat.totalAttempts++;
              if (response.isCorrect) {
                questionStat.correctAttempts++;
              }
            }
          }
  
          // Calculate final statistics
          const averageScore = stats.scores.length > 0 ? 
            stats.scores.reduce((a, b) => a + b, 0) / stats.scores.length : 0;
          const highestScore = stats.scores.length > 0 ? 
            Math.max(...stats.scores) : 0;
          const lowestScore = stats.scores.length > 0 ? 
            Math.min(...stats.scores) : 0;
          const averageTimeSpent = stats.timeSpent.length > 0 ? 
            stats.timeSpent.reduce((a, b) => a + b, 0) / stats.timeSpent.length : 0;
  
          // Prepare performance trend
          const performanceTrend = attempts.docs.map(attempt => ({
            attemptDate: attempt.startedAt,
            score: attempt.score,
          }));
  
          // Prepare question performance
          const questionPerformance = Array.from(stats.questionStats.entries()).map(([questionId, stat]) => ({
            question: questionId,
            correctAttempts: stat.correctAttempts,
            totalAttempts: stat.totalAttempts,
            accuracyRate: stat.totalAttempts > 0 ? (stat.correctAttempts / stat.totalAttempts) * 100 : 0,
          }));
  
          // Update data with calculated statistics
          data = {
            ...data,
            totalAttempts: stats.totalAttempts,
            successfulAttempts: stats.successfulAttempts,
            averageScore,
            highestScore,
            lowestScore,
            averageTimeSpent,
            performanceTrend,
            questionPerformance,
          };
        }
  
        return data;
      },
    ],
  },
};