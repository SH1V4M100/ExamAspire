// src/collections/Forms.ts

import { CollectionConfig } from 'payload'

export const Forms: CollectionConfig = {
  slug: 'forms',
  admin: {
    hidden: true
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    // Add more fields as needed
  ],
}

export default Forms
