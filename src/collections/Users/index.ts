import type { CollectionConfig } from 'payload'
import EvaluateButton from '@/components/ui/eval-btn'
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
    components: {
      beforeListTable: ['src/components/ui/eval-btn.tsx'], // injects your button into the list toolbar
    },
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
    // {
    //   name: 'completedExams',
    //   type: 'relationship',
    //   relationTo: 'exams',
    //   hasMany: true,
    //   admin: {
    //     readOnly: true,
    //   },
    // },
    {
      name: 'contactNumber',
      label: 'WhatsApp/Contact Number',
      type: 'text',
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
    // {
    //   name: 'overallPerformance',
    //   type: 'array',
    //   fields: [//add subject wise performance later
    //     {
    //       name: 'averageScore',
    //       type: 'number',
    //       admin: {
    //         readOnly: true,
    //       },
    //     },
    //     {
    //       name: 'totalAttempts',
    //       type: 'number',
    //       admin: {
    //         readOnly: true,
    //       },
    //     },
    //     {
    //       name: 'successfulAttempts',
    //       type: 'number',
    //       admin: {
    //         readOnly: true,
    //       },
    //     },
    //     {
    //       name: 'lastExamDate',
    //       type: 'date',
    //       admin: {
    //         readOnly: true,
    //       },
    //     },
    //   ],
    //   admin: {
    //     readOnly: true,
    //   },
    // },
  ],
  endpoints: [
  {
    path: '/send-signup-email',
    method: 'post',
    handler: async (req) => {
      const { email, firstName, lastName, password, contactNumber } = await req.json?.();

      // Validate required fields
      if (!email || !firstName || !password || !contactNumber) {
        return Response.json({ error: 'Missing required fields' }, { status: 400 });
      }

      const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;
      const confirmSignupUrl = `${baseUrl}/api/users/confirm-signup?` +
        `email=${encodeURIComponent(email)}&` +
        `password=${encodeURIComponent(password)}&` +
        `name=${encodeURIComponent(firstName + ' ' + lastName)}&` +
        `contactNumber=${encodeURIComponent(contactNumber)}`;

      try {
        await req.payload.sendEmail({
          to: 'pursuittest9@gmail.com',
          subject: 'New User Signup',
          html: `
            <h2>New user signup received:</h2>
            <p><strong>First Name:</strong> ${firstName}</p>
            <p><strong>Last Name:</strong> ${lastName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Contact Number:</strong> ${contactNumber}</p>

            <a href="${confirmSignupUrl}" style="display:inline-block;padding:10px 20px;background-color:#007bff;color:white;text-decoration:none;border-radius:5px;">
              Confirm Signup
            </a>
          `,
        });

        return Response.json({ message: 'Email sent successfully' });
      } catch (err) {
        console.error('Error sending signup email:', err);
        return Response.json({ error: 'Failed to send email' }, { status: 500 });
      }
    },
  },
  {
  path: '/confirm-signup',
  method: 'get',
  handler: async (req) => {
    if(!req.url)return Response.json({ error: 'Signup failed coz no url' }, { status: 500 });
    const url = new URL(req.url);
    const email = url.searchParams.get('email');
    const password = url.searchParams.get('password');
    const name = url.searchParams.get('name');
    const contactNumber = url.searchParams.get('contactNumber');
    const data = { email, password, name, contactNumber};
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL ;
    try {
      const response = await fetch(`${baseUrl}/api/users`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      return Response.json({ success: true, result });
    } catch (error) {
      console.error('Error confirming signup:', error);
      return Response.json({ error: 'Signup failed' }, { status: 500 });
    }
  },
}
],
timestamps: true,
}
