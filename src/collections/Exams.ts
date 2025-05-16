import { CollectionConfig } from 'payload'
import { authenticated } from '../access/authenticated'
import { authenticatedOrPublished } from '../access/authenticatedOrPublished'
import { slugField } from '@/fields/slug'

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
              required: true,
            },
            {
              name: 'questionType',
              type: 'select',
              required: true,
              options: [
                { label: 'Single Correct', value: 'single' },
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
              required: true,
              minRows: 2,
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
}

export default Exams
