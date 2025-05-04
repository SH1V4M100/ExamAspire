import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { anyone } from '@/access/anyone'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    admin: authenticated,
    create: anyone,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'email'],
    useAsTitle: 'name',
  },
  auth: true,
  fields: [
    {
      name: 'email',
      type: 'email',
      required: true,
      unique: true,
    },
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'school/university',
      type: 'text'
    },
    {
      name: 'role',
      type: 'select',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Student', value: 'student' },
        { label: 'Teacher', value: 'teacher' },
      ],
      defaultValue: 'student',
      required: true,
    },
    {
      name: 'completedExams',
      type: 'relationship',
      relationTo: 'exams',
      hasMany: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'examResults',
      type: 'relationship',
      relationTo: 'results',
      hasMany: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'overallPerformance',
      type: 'array',
      fields: [
        {
          name: 'subject',
          type: 'relationship',
          relationTo: 'subjects',
          required: true,
        },
        {
          name: 'averageScore',
          type: 'number',
          admin: {
            readOnly: true,
          },
        },
        {
          name: 'totalAttempts',
          type: 'number',
          admin: {
            readOnly: true,
          },
        },
        {
          name: 'successfulAttempts',
          type: 'number',
          admin: {
            readOnly: true,
          },
        },
        {
          name: 'lastExamDate',
          type: 'date',
          admin: {
            readOnly: true,
          },
        },
      ],
      admin: {
        readOnly: true,
      },
    },
  ],
  timestamps: true,
}
