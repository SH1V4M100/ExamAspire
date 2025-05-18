// collections/ExamAttempts.ts
import { CollectionConfig } from 'payload';

export const ExamAttempts: CollectionConfig = {
  slug: 'exam-attempts',
  fields: [
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'exam',
      type: 'relationship',
      relationTo: 'exams',
      required: true,
    },
    {
      name: 'answers',
      type: 'json',
      required: true,
    },
    {
      name: 'score',
      type: 'number',
      required: true,
    },
    {
      name: 'totalMarks',
      type: 'number',
      required: true,
    },
    {
      name: 'timeSpent',
      type: 'number', // in seconds
      required: true,
    },
    {
      name: 'submittedAt',
      type: 'date',
      required: true,
    }
  ],
  endpoints: [
    {
      path: '/:id/submit', // :id is the exam ID
      method: 'post',
      handler: async (req) => {
        if (!req.user) {
          return Response.json({ error: 'Unauthorized' });
        }

        const examId = req.routeParams?.id as number;
        const { answers, timeSpent, score, totalMarks, metadata } = await req.json?.();

        try {
          const createdAttempt = await req.payload.create({
            collection: 'exam-attempts',
            data: {
              user: req.user.id,
              exam: Number(examId),
              answers,
              timeSpent,
              score,
              totalMarks,
              submittedAt: new Date().toISOString(),
            },
          });

          return Response.json(createdAttempt);
        } catch (err) {
          console.error('Error creating exam attempt:', err);
          return Response.json({ error: 'Failed to submit exam attempt' });
        }
      },
    },
  ]
};
