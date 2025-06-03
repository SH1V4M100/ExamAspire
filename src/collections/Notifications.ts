// collections/Notifications.ts

import { CollectionConfig } from 'payload';

const Notifications: CollectionConfig = {
  slug: 'notifications',
  admin: {
    useAsTitle: 'message',
  },
  fields: [
    {
      name: 'message',
      type: 'textarea',
      required: true,
    },
    {
      name: 'seenBy',
      type: 'relationship',
      relationTo: 'users',
      hasMany: true,
      admin: {
        position: 'sidebar',
      },
    },
  ],
  hooks: {
    afterChange: [
      async ({ req }) => {
        const allNotifications = await req.payload.find({
          collection: 'notifications',
          sort: '-createdAt',
        });

        const { docs } = allNotifications;

        if (docs.length > 5) {
          const toDelete = docs.slice(5);
          await Promise.all(
            toDelete.map((doc) =>
              req.payload.delete({
                collection: 'notifications',
                id: doc.id,
              })
            )
          );
        }
      },
    ],
  },
  endpoints: [
    {
      path: '/mark-seen',
      method: 'post',
      handler: async (req) => {
        if (!req.user) {
          return Response.json({ error: 'Unauthorized' });
        }

        const userId = req.user.id;

        try {
          // Find notifications not yet seen by this user
          const { docs: unseen } = await req.payload.find({
            collection: 'notifications',
            where: {
              seenBy: {not_in: [userId]},
            },
            limit: 5,
          });

          // Mark each as seen by adding the user to seenBy
          await Promise.all(
            unseen.map((notif) =>
              req.payload.update({
                collection: 'notifications',
                id: notif.id,
                data: {
                  seenBy: [...(notif.seenBy || []), userId],
                },
              })
            )
          );

          return Response.json({ message: 'Marked as seen' });
        } catch (err) {
          console.error('Error marking notifications as seen:', err);
          return Response.json({ error: 'Failed to mark notifications as seen' });
        }
      },
    },
  ],
  timestamps: true,
};

export default Notifications;
