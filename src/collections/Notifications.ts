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
  ],
  hooks: {
    afterChange: [
      async ({ req }) => {
        const allNotifications = await req.payload.find({
          collection: 'notifications',
          sort: '-createdAt', // newest first
        });

        const { docs } = allNotifications;

        if (docs.length > 5) {
          // Remove extra notifications (from index 10 onwards)
          const toDelete = docs.slice(10);

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
  timestamps: true, // Ensures createdAt is available for sorting
};

export default Notifications;