import { CollectionConfig } from 'payload';
import { authenticated } from '../access/authenticated';
import { authenticatedOrPublished } from '../access/authenticatedOrPublished';
import { slugField } from '@/fields/slug';

export const Exams: CollectionConfig = {
  slug: 'exams',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'duration', 'createdAt'],
  },
  access: {
    read: authenticatedOrPublished,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'instructions',
      type: 'array',
      fields: [
        {
          name: 'instruction',
          type: 'text',
        },
      ],
    },
    {
      name: 'duration',
      type: 'number',
      required: true,
      admin: {
        description: 'Duration in minutes',
      },
    },
    {
      name: 'isNegativeMarkingEnabled',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'startDate',
      type: 'date',
      admin: {
        description: 'When this exam becomes available (optional)',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'endDate',
      type: 'date',
      admin: {
        description: 'When this exam becomes unavailable (optional)',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },

    // --- Grouped Subject Sections with Questions ---
    {
      name: 'sections',
      type: 'array',
      required: true,
      admin: {
        description: 'Add subject sections with their respective questions',
      },
      fields: [
        {
          name: 'subject',
          type: 'select',
          required: true,
          options: [
            { label: 'Physics', value: 'physics' },
            { label: 'Chemistry', value: 'chemistry' },
            { label: 'Maths', value: 'maths' },
          ],
          admin: {
            description: 'Choose the subject for this section',
          },
        },
        {
          name: 'questions',
          type: 'array',
          required: true,
          admin: {
            description: 'Enter questions for this subject',
          },
          fields: [
            {
              name: 'questionText',
              type: 'textarea',
              required: false,
            },
            {
              name: 'questionType',
              type: 'select',
              required: true,
              options: [
                { label: 'Single Correct A', value: 'single 1' },
                { label: 'Single Correct B', value: 'single 2' },
                { label: 'Single Correct C', value: 'single 4' },
                { label: 'Multiple Correct', value: 'multi' },
                { label: 'Integer Type', value: 'integer' },
              ],
              admin: {
                description: 'Specify the type of this question',
              },
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media', // Must match your media collection slug
              required: false,
              admin: {
                description: 'Optional image for the question',
              },
            },
            {
  name: 'options',
  type: 'array',
  required: false,
  minRows: 1,
  maxRows: 10,
  fields: [
    {
      name: 'text',
      type: 'text',
      required: true,
    },
    {
      name: 'isCorrect',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Mark this option as correct',
      },
    },
  ],
  validate: (value, { siblingData }) => {
    // Type assertions
    const typedOptions = value as { isCorrect?: boolean }[]; // assert array of options
    const questionType = (siblingData as { questionType?: string })?.questionType;

    if (!Array.isArray(typedOptions)) return true;

    const correctCount = typedOptions.filter((opt) => opt?.isCorrect).length;

    if ((questionType === 'single 1'||questionType === 'single 2'||questionType === 'single 4' )&& correctCount !== 1) {
      return 'Single correct questions must have exactly one correct option.';
    }

    if (questionType === 'multi' && correctCount < 1) {
      return 'Multiple correct questions must have at least one correct option.';
    }

    if (questionType === 'integer' && typedOptions.length > 0) {
      return 'Integer type questions should not have any options.';
    }

    return true;
  },
},
          ],
        },
      ],
    },
    {
      name: '_status',
      type: 'select',
      options: [
        {
          label: 'Draft',
          value: 'draft',
        },
        {
          label: 'Published',
          value: 'published',
        },
      ],
      defaultValue: 'draft',
      required: true,
      admin: {
        description: 'Only published exams are visible to students',
      },
    },
    ...slugField(),
  ],
  hooks: {
    afterChange: [
      async ({ doc, operation, req }) => {
        if (operation === 'create'||operation==='update' && doc._status === 'published') {
          console.log('afterChange hook called')
          await req.payload.create({
            collection: 'notifications',
            data: {
              message: `New exam "${doc.title}" has been published.`,
            },
          });
        }
      },
    ],
  },
  endpoints: [
    {
      path: '/count-upcoming-exams',
      method: 'get',
      handler: async (req) => {
        try {
          const currentDate = new Date();
          const upcomingExamsCount = await req.payload.find({
            collection: 'exams',
            where: {
              startDate: {
                greater_than: currentDate,
              },
            },
            limit: 0,
          });

          return Response.json({ count: upcomingExamsCount.totalDocs });
        } catch (err) {
          console.error('Error fetching upcoming exam count:', err);
          return Response.json({ error: 'Failed to fetch upcoming exam count' }, { status: 500 });
        }
      },
    },
  ],
}

export default Exams;
