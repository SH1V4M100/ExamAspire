import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'
import { anyone } from '@/access/anyone'

export const Admin: CollectionConfig = {
  slug: 'admin',
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
      name: 'department',
      type: 'text'
    },
    {
        name: 'year',
        type: 'number'
    },
    {
        name: 'role',
        type: 'text'
    }
  ],
  timestamps: true,
}
