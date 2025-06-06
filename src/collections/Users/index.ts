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
      name: 'institution',
      type: 'text'
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
    // {
    //   name: 'examResults',
    //   type: 'relationship',
    //   relationTo: 'results',
    //   hasMany: true,
    //   admin: {
    //     readOnly: true,
    //   },
    // },
    {
      name: 'overallPerformance',
      type: 'array',
      fields: [//add subject wise performance later
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
  endpoints: [
  {
    path: '/send-signup-email',
    method: 'post',
    handler: async (req) => {
      const { email, firstName, lastName, institution, password } = await req.json?.();

      // Validate required fields
      if (!email || !firstName || !institution || !password) {
        return Response.json({ error: 'Missing required fields' }, { status: 400 });
      }

      try {
        await req.payload.sendEmail({
          to: 'shivamchatterjee471@gmail.com',
          subject: 'New User Signup',
          text: `
            New user signup received:

            First Name: ${firstName}
            Last Name: ${lastName}
            Email: ${email}
            Institution: ${institution}
            Password: ${password}
          `.trim(),
        });

        return Response.json({ message: 'Email sent successfully' });
      } catch (err) {
        console.error('Error sending signup email:', err);
        return Response.json({ error: 'Failed to send email' }, { status: 500 });
      }
    },
  },
],
timestamps: true,
}
