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
    {
      path: '/my-exam-ids',
      method: 'get',
      handler: async (req) => {
        if (!req.user) {
          return Response.json({ error: 'Unauthorized' }, { status: 401 });
        }
    
        try {
          const result = await req.payload.find({
            collection: 'exam-attempts',
            where: {
              user: {
                equals: req.user.id,
              },
            },
            select: {
              exam: true, // ✅ Only return the exam field
            },
            depth: 0, // ✅ Prevent exam relationship from being populated
            limit: 1000, // or higher if needed
          });
    
          const uniqueExamIds = [
            ...new Set(result.docs.map((doc) => doc.exam)),
          ];
    
          return Response.json({ examIds: uniqueExamIds });
        } catch (err) {
          console.error('Error fetching exam IDs:', err);
          return Response.json({ error: 'Failed to fetch exam IDs' }, { status: 500 });
        }
      },
    }
    
  ]
};
