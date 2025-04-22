import { CollectionConfig } from 'payload'
import { authenticated } from '../access/authenticated'
import { authenticatedOrPublished } from '../access/authenticatedOrPublished'
import { slugField } from '@/fields/slug'

export const Exams: CollectionConfig = {
  slug: 'exams',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'subject', 'duration', 'createdAt'],
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
        }
      ]
    },
    {
      name: 'subject',
      type: 'relationship',
      relationTo: 'subjects',
      required: true,
    },
    {
      name: 'topics',
      type: 'relationship',
      relationTo: 'topics',
      hasMany: true,
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
      name: 'passingPercentage',
      type: 'number',
      min: 0,
      max: 100,
      defaultValue: 35,
      admin: {
        description: 'Percentage required to pass the exam',
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
    {
      name: 'questions',
      type: 'relationship',
      relationTo: 'questions',
      hasMany: true,
      required: true,
      admin: {
        description: 'Select questions for this exam',
      },
    },
    {
      name: 'randomizeQuestions',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Randomize the order of questions for each attempt',
      },
    },
    {
      name: 'randomizeOptions',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Randomize the order of options for each question',
      },
    },
    {
      name: 'maxAttempts',
      type: 'number',
      min: 0,
      defaultValue: 1,
      admin: {
        description: 'Maximum number of attempts allowed (0 for unlimited)',
      },
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